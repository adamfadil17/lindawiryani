import { NextRequest, NextResponse } from "next/server";

import {
  prisma,
  signToken,
  ok,
  handleError,
} from "@/lib";
import {
  AUTH_COOKIE,
  authCookieOptions,
  getJwtExpiresIn,
} from "@/lib/jwt";
import {
  consumeRateLimit,
  getClientIp,
  getRateLimitCount,
  incrementRateLimit,
  resetRateLimit,
  RATE_LIMITS,
  tooManyRequests,
} from "@/lib/rate-limit";
import { getRecaptchaToken, verifyRecaptcha } from "@/lib/recaptcha";

import { loginSchema, comparePassword } from "@/utils";

/** After this many failures, a reCAPTCHA token is required (task 1.7). */
const CAPTCHA_AFTER_FAILURES = 3;
const FAILURE_WINDOW_MS = 15 * 60_000;

function loginFailure(message: string, captchaRequired: boolean) {
  return NextResponse.json(
    { success: false, error: message, captchaRequired },
    { status: 401 },
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);
    const ip = getClientIp(req);
    const normalizedEmail = email.toLowerCase();

    // D7: limit per IP *and* per IP+email. A global per-email lockout would let
    // anyone lock the real admin out, so the email key always includes the IP.
    const ipLimit = consumeRateLimit({
      key: `login:ip:${ip}`,
      ...RATE_LIMITS.loginPerIp,
    });
    if (!ipLimit.allowed) {
      return tooManyRequests(
        ipLimit,
        "Too many sign-in attempts. Please try again later.",
      );
    }

    const emailKey = `login:ip-email:${ip}:${normalizedEmail}`;
    const emailLimit = consumeRateLimit({
      key: emailKey,
      ...RATE_LIMITS.loginPerIpEmail,
    });
    if (!emailLimit.allowed) {
      return tooManyRequests(
        emailLimit,
        "Too many sign-in attempts for this account. Please try again later.",
      );
    }

    // Distributed brute force: after repeated failures, require reCAPTCHA.
    const failureKey = `login:failures:${ip}:${normalizedEmail}`;
    const priorFailures = getRateLimitCount(failureKey);
    const captchaRequired = priorFailures >= CAPTCHA_AFTER_FAILURES;

    if (captchaRequired) {
      const recaptchaToken = getRecaptchaToken(body);
      if (!recaptchaToken) {
        return loginFailure("Please complete the reCAPTCHA to continue.", true);
      }
      if (!(await verifyRecaptcha(recaptchaToken))) {
        incrementRateLimit(failureKey, FAILURE_WINDOW_MS);
        console.warn("[auth] login reCAPTCHA failed", { ip, email: normalizedEmail });
        return loginFailure(
          "reCAPTCHA verification failed. Please try again.",
          true,
        );
      }
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const failures = incrementRateLimit(failureKey, FAILURE_WINDOW_MS);
      console.warn("[auth] login failed", {
        ip,
        email: normalizedEmail,
        reason: "unknown_user",
        failures,
      });
      return loginFailure(
        "Invalid credentials",
        failures >= CAPTCHA_AFTER_FAILURES,
      );
    }

    const valid = await comparePassword(password, user.password);

    if (!valid) {
      const failures = incrementRateLimit(failureKey, FAILURE_WINDOW_MS);
      console.warn("[auth] login failed", {
        ip,
        email: normalizedEmail,
        reason: "bad_password",
        failures,
      });
      return loginFailure(
        "Invalid credentials",
        failures >= CAPTCHA_AFTER_FAILURES,
      );
    }

    // Successful sign-in clears the throttling/failure buckets.
    resetRateLimit(emailKey);
    resetRateLimit(failureKey);

    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      ver: user.token_version,
    });

    const { password: _, token_version: __, ...publicUser } = user;

    // S4: the token is delivered ONLY as an HttpOnly cookie — never in the
    // response body, never to localStorage.
    const response = ok({
      user: publicUser,
      expiresIn: getJwtExpiresIn(),
    });
    response.cookies.set({
      name: AUTH_COOKIE,
      value: token,
      ...authCookieOptions(),
    });

    return response;
  } catch (error) {
    return handleError(error);
  }
}
