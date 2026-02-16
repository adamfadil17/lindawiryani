import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET ?? "change-me-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/** Sign a new JWT */
export function signToken(payload: Omit<JwtPayload, "iat" | "exp">): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
}

/** Verify and decode a JWT — throws on invalid / expired */
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

/** Extract the bearer token from the Authorization header */
export function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  return authHeader.slice(7);
}

/** Full guard: extract + verify — returns payload or null */
export function getAuthPayload(req: NextRequest): JwtPayload | null {
  try {
    const token = extractToken(req);
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

/** Throws ApiError(401) if not authenticated */
export function requireAuth(req: NextRequest): JwtPayload {
  const payload = getAuthPayload(req);
  if (!payload) {
    throw new ApiError(401, "Unauthorized — invalid or missing token");
  }
  return payload;
}

/** Throws ApiError(403) if the user doesn't have the required role */
export function requireRole(payload: JwtPayload, ...roles: string[]): void {
  if (!roles.includes(payload.role)) {
    throw new ApiError(403, `Forbidden — required role: ${roles.join(" | ")}`);
  }
}

// ─────────────────────────────────────────────
// Custom API Error
// ─────────────────────────────────────────────
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}
