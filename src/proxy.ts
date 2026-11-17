import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { routing } from "@/i18n/routing";
// Direct file import: the proxy runs on every request and must not pull Prisma in with it.
import {
  TEAM_CHALLENGE_COOKIE,
  TEAM_SESSION_COOKIE,
  checkLogin,
  createChallengeToken,
  createSessionToken,
  currentRealm,
  isConfigured,
  isGateEnabled,
  parseBasicAuth,
  sessionSeconds,
  verifyChallengeToken,
  verifySessionToken,
} from "@/lib/team-access";

const PROTECTED_PREFIXES = ["/dashboard"];
const AUTH_ONLY_ROUTES = ["/auth/login"];
const LOGIN_PAGE = "/auth/login";
const DASHBOARD_PAGE = "/dashboard";

const intlMiddleware = createIntlMiddleware(routing);

// ── Beta password gate (TEAM_ACCESS_GATE=true, set only on the beta container) ─────────────────
const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/" };

// Wrong passwords are counted per client IP so the shared password cannot be guessed at speed.
// In memory, so it resets on restart; nginx also rate limits the API.
const MAX_FAILURES = 10;
const FAILURE_WINDOW_MS = 10 * 60 * 1000;
const failures = new Map<string, { count: number; resetAt: number }>();

// nginx appends the real client address last in X-Forwarded-For; anything before it is client-supplied.
const clientIp = (req: NextRequest) => req.headers.get("x-forwarded-for")?.split(",").pop()?.trim() || "unknown";

const isBlocked = (ip: string) => {
  const entry = failures.get(ip);
  if (!entry) return false;
  if (entry.resetAt < Date.now()) {
    failures.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILURES;
};

const recordFailure = (ip: string) => {
  const entry = failures.get(ip);
  failures.set(ip, entry && entry.resetAt >= Date.now() ? { ...entry, count: entry.count + 1 } : { count: 1, resetAt: Date.now() + FAILURE_WINDOW_MS });
};

const deny = (status: number, message: string, headers: Record<string, string> = {}) =>
  new NextResponse(message, { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", ...headers } });

/** Returns a response that stops the request, `true` to let it through and set a session cookie, or `false` to let it through. */
const gate = (req: NextRequest): NextResponse | boolean => {
  if (!isGateEnabled()) return false;

  // The health check (Docker's and deploy.sh's) cannot answer a password prompt; without this a
  // gated release could never pass its own deploy. It only reports that the app is up.
  if (req.method === "GET" && req.nextUrl.pathname === "/api/health") return false;

  // next/image fetches local files through an internal request that carries none of the visitor's
  // cookies, so the gate would answer it with 401 and every /images and /uploads photo on the
  // site would break. These folders only hold the site's own pictures (uploads have random UUID
  // names), so they are served without the password. Pages and the API stay behind the gate.
  if ((req.method === "GET" || req.method === "HEAD") && /^\/(images|uploads)\//.test(req.nextUrl.pathname)) return false;

  // Shut, not open, when the credentials are missing.
  if (!isConfigured()) return deny(503, "Team access is not configured.");

  if (verifySessionToken(req.cookies.get(TEAM_SESSION_COOKIE)?.value)) return false;

  const ip = clientIp(req);
  if (isBlocked(ip)) return deny(429, "Too many failed attempts. Try again in a few minutes.", { "Retry-After": "600" });

  const basic = parseBasicAuth(req.headers.get("authorization"));
  if (basic) {
    // Credentials only count together with this period's challenge cookie, so a browser that
    // re-sent expired credentials by itself is asked again instead of renewed silently.
    if (verifyChallengeToken(req.cookies.get(TEAM_CHALLENGE_COOKIE)?.value)) {
      if (checkLogin(basic.username, basic.password)) return true;
      recordFailure(ip);
    }
  }

  const response = deny(401, "Team sign-in required.", { "WWW-Authenticate": `Basic realm="${currentRealm()}", charset="UTF-8"` });
  response.cookies.set(TEAM_CHALLENGE_COOKIE, createChallengeToken(), { ...cookieOptions, maxAge: sessionSeconds() });
  return response;
};

// Paths the app's own routing never touched before the gate widened the matcher.
const passesThrough = (pathname: string) =>
  /^\/(api|_next|_vercel|dashboard|auth)(\/|$)/.test(pathname) || pathname.includes(".");

/**
 * Admin (/dashboard, /auth/login) is NOT localized on purpose — those
 * routes are matched first and go straight through the existing JWT
 * check untouched. Everything else falls through to next-intl, which
 * resolves the locale prefix for the public site.
 */
export async function proxy(req: NextRequest) {
  const decision = gate(req);
  if (decision instanceof NextResponse) return decision;

  const response = await route(req);
  if (decision === true) response.cookies.set(TEAM_SESSION_COOKIE, createSessionToken(), { ...cookieOptions, maxAge: sessionSeconds() });
  return response;
}

async function route(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute =
    PROTECTED_PREFIXES.some((p) => pathname.startsWith(p)) ||
    AUTH_ONLY_ROUTES.some((p) => pathname.startsWith(p));

  if (isAdminRoute) {
    const token = req.cookies.get("token")?.value ?? null;
    let isAuthenticated = false;

    if (token) {
      try {
        await verifyToken(token);
        isAuthenticated = true;
      } catch {
        isAuthenticated = false;
      }
    }

    if (PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) {
      if (!isAuthenticated) {
        const url = req.nextUrl.clone();
        url.pathname = LOGIN_PAGE;
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    if (AUTH_ONLY_ROUTES.some((p) => pathname.startsWith(p))) {
      if (isAuthenticated) {
        const url = req.nextUrl.clone();
        url.pathname = DASHBOARD_PAGE;
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }
  }

  if (passesThrough(pathname)) return NextResponse.next();
  return intlMiddleware(req);
}

export const config = {
  // The gate has to see every request, files and API included; the routing above skips those itself.
  matcher: ["/:path*"],
};
