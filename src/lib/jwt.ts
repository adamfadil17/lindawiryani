import * as jose from "jose";

/**
 * Edge-safe JWT helpers.
 *
 * This module must NOT import Prisma or Node-only APIs: `middleware.ts` loads
 * it in the Edge runtime. `lib/auth.ts` builds the DB-aware `requireAuth` on
 * top of it.
 */

export const AUTH_COOKIE = "token";
export const JWT_ALG = "HS256";
export const MIN_JWT_SECRET_LENGTH = 32;

let cachedSecret: Uint8Array | null = null;
let cachedSecretSource: string | null = null;

export function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.trim().length === 0) {
    throw new Error(
      "JWT_SECRET is not set. Add it to your environment (see .env.example).",
    );
  }

  if (
    process.env.NODE_ENV === "production" &&
    secret.length < MIN_JWT_SECRET_LENGTH
  ) {
    throw new Error(
      `JWT_SECRET must be at least ${MIN_JWT_SECRET_LENGTH} characters in production.`,
    );
  }

  if (!cachedSecret || cachedSecretSource !== secret) {
    cachedSecret = new TextEncoder().encode(secret);
    cachedSecretSource = secret;
  }

  return cachedSecret;
}

/** Token lifetime. Shorter by default than the old 7d (task 1.5). */
export function getJwtExpiresIn(): string {
  return process.env.JWT_EXPIRES_IN ?? "12h";
}

/** Token lifetime in seconds, used for the cookie `maxAge`. */
export function getJwtMaxAgeSeconds(): number {
  const value = getJwtExpiresIn().trim();
  const match = /^(\d+)\s*([smhd])$/i.exec(value);

  if (!match) {
    const asNumber = Number(value);
    return Number.isFinite(asNumber) && asNumber > 0 ? asNumber : 12 * 60 * 60;
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  const multiplier =
    unit === "s" ? 1 : unit === "m" ? 60 : unit === "h" ? 3_600 : 86_400;

  return amount * multiplier;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  /** `User.token_version` at issue time — used for revocation (task 1.5). */
  ver?: number;
  iat?: number;
  exp?: number;
}

export async function signToken(
  payload: Omit<JwtPayload, "iat" | "exp">,
): Promise<string> {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(getJwtExpiresIn())
    .sign(getJwtSecret());
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  // Pinning `algorithms` blocks algorithm-confusion attacks (e.g. `alg: none`
  // or swapping HS256 for RS256).
  const { payload } = await jose.jwtVerify(token, getJwtSecret(), {
    algorithms: [JWT_ALG],
  });
  return payload as unknown as JwtPayload;
}

/** Cookie attributes for the session token (task 1.1). */
export function authCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: getJwtMaxAgeSeconds(),
  };
}
