import "server-only";

import { NextRequest } from "next/server";

import { getAuthPayload } from "@/lib/auth";
import {
  consumeRateLimit,
  getClientIp,
  tooManyRequests,
} from "@/lib/rate-limit";

/**
 * Resolves whether a content GET comes from the admin UI (cookie/Bearer with
 * an admin/editor role) or from the public. Anonymous reads are rate-limited
 * and restricted to published rows by the route handlers (task 4.6).
 */
export async function resolveContentAccess(req: NextRequest): Promise<
  | { isStaff: true; response: null }
  | { isStaff: false; response: ReturnType<typeof tooManyRequests> | null }
> {
  const payload = await getAuthPayload(req);
  const isStaff = payload?.role === "admin" || payload?.role === "editor";

  if (isStaff) return { isStaff: true, response: null };

  const limit = consumeRateLimit({
    key: `content-read:${getClientIp(req)}`,
    limit: 120,
    windowMs: 60_000,
  });

  if (!limit.allowed) {
    return { isStaff: false, response: tooManyRequests(limit) };
  }

  return { isStaff: false, response: null };
}
