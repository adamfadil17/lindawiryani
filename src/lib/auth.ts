import { NextRequest } from "next/server";

import { prisma } from "./prisma";
import {
  AUTH_COOKIE,
  getJwtExpiresIn,
  getJwtMaxAgeSeconds,
  getJwtSecret,
  MIN_JWT_SECRET_LENGTH,
  signToken,
  verifyToken,
} from "./jwt";
import type { JwtPayload } from "./jwt";

// Re-export the edge-safe helpers so existing `@/lib` imports keep working.
export {
  AUTH_COOKIE,
  getJwtExpiresIn,
  getJwtMaxAgeSeconds,
  getJwtSecret,
  MIN_JWT_SECRET_LENGTH,
  signToken,
  verifyToken,
};
export type { JwtPayload };

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

/**
 * Reads the session token from the HttpOnly cookie first (browser / admin UI),
 * then falls back to `Authorization: Bearer` for scripts and the smoke test.
 */
export function extractToken(req: NextRequest): string | null {
  const cookieToken = req.cookies.get(AUTH_COOKIE)?.value;
  if (cookieToken) return cookieToken;

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice(7);
}

export async function getAuthPayload(
  req: NextRequest,
): Promise<JwtPayload | null> {
  try {
    const token = extractToken(req);
    if (!token) return null;
    return await verifyToken(token);
  } catch {
    return null;
  }
}

/**
 * Authenticated request guard.
 *
 * For mutating methods it also checks `User.token_version` against the token's
 * `ver` claim, so rotating the admin password / bumping the version revokes
 * existing sessions (task 1.5). Read-only requests stay DB-free to keep public
 * and dashboard GETs cheap.
 */
export async function requireAuth(
  req: NextRequest,
  options?: { checkVersion?: boolean },
): Promise<JwtPayload> {
  const payload = await getAuthPayload(req);
  if (!payload) throw new ApiError(401, "Unauthorized — invalid or missing token");

  const shouldCheckVersion =
    options?.checkVersion === true || MUTATING_METHODS.has(req.method);

  if (shouldCheckVersion) {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { token_version: true },
    });

    if (!user) {
      throw new ApiError(401, "Unauthorized — user no longer exists");
    }

    if ((payload.ver ?? 0) !== user.token_version) {
      throw new ApiError(401, "Unauthorized — session has been revoked");
    }
  }

  return payload;
}

export function requireRole(payload: JwtPayload, ...roles: string[]): void {
  if (!roles.includes(payload.role)) {
    throw new ApiError(403, `Forbidden — required role: ${roles.join(" | ")}`);
  }
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}
