import { NextResponse } from "next/server";

/**
 * In-memory fixed-window rate limiter.
 *
 * The production deployment runs a SINGLE Node process (PM2 fork mode — see
 * docs/task.md §2), so a module-level Map is shared by every request. If the
 * app is ever scaled to multiple instances this must move to a shared store
 * (Redis) or the counters become per-process (decision D8).
 */

interface Bucket {
  count: number;
  resetAt: number;
}

export interface RateLimitOptions {
  /** Unique bucket identity, e.g. `login:ip-email:1.2.3.4:user@example.com`. */
  key: string;
  /** Maximum number of hits allowed inside the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  /** Epoch milliseconds when the current window resets. */
  resetAt: number;
  retryAfterSeconds: number;
}

/** Hard cap so a flood of unique keys cannot grow memory without bound. */
const MAX_BUCKETS = 10_000;

const buckets = new Map<string, Bucket>();

function sweepExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }

  // Still too big (many unexpired keys): drop the oldest entries (Map keeps
  // insertion order) until we are back under the cap.
  if (buckets.size >= MAX_BUCKETS) {
    const target = Math.floor(MAX_BUCKETS * 0.9);
    for (const key of buckets.keys()) {
      buckets.delete(key);
      if (buckets.size <= target) break;
    }
  }
}

/**
 * Count one hit against a bucket and report whether it is allowed.
 * Call this on every request that should be limited.
 */
export function consumeRateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();

  if (buckets.size >= MAX_BUCKETS) sweepExpired(now);

  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }

  bucket.count += 1;

  return {
    allowed: bucket.count <= limit,
    limit,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
    retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
  };
}

/** Clear a bucket (e.g. after a successful login). */
export function resetRateLimit(key: string): void {
  buckets.delete(key);
}

/** Read the current hit count without counting this call. */
export function getRateLimitCount(key: string): number {
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= Date.now()) return 0;
  return bucket.count;
}

/**
 * Count one hit and return the new total. Used for failure counters where the
 * count itself drives behaviour (e.g. reCAPTCHA after N failed logins).
 */
export function incrementRateLimit(key: string, windowMs: number): number {
  const now = Date.now();
  if (buckets.size >= MAX_BUCKETS) sweepExpired(now);

  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }

  bucket.count += 1;
  return bucket.count;
}

/**
 * Resolve the client IP for rate-limit keys.
 *
 * Security: in production the app sits behind nginx, which MUST overwrite
 * `X-Forwarded-For` / `X-Real-IP` with `$remote_addr` and bind the Node port
 * to 127.0.0.1 (task 8.4). Otherwise a client can spoof these headers and
 * bypass the limiter.
 */
export function getClientIp(req: Request): string {
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return normalizeIp(realIp);

  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return normalizeIp(first);
  }

  return "unknown";
}

function normalizeIp(ip: string): string {
  // IPv4-mapped IPv6 (::ffff:1.2.3.4) and absurdly long header values.
  return ip.replace(/^::ffff:/i, "").slice(0, 64);
}

/** 429 response with standard rate-limit headers. */
export function tooManyRequests(
  result: RateLimitResult,
  message = "Too many requests. Please try again later.",
): NextResponse {
  return NextResponse.json(
    { success: false, error: message },
    {
      status: 429,
      headers: {
        "Retry-After": String(result.retryAfterSeconds),
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
      },
    },
  );
}

/**
 * Shared limits. Tune here rather than sprinkling magic numbers in routes.
 * `loginPerIp` is intentionally looser than `loginPerIpEmail`: the per-email
 * lockout (not the per-IP one) is what stops targeted brute force, while the
 * IP bucket only slows down spraying.
 */
export const RATE_LIMITS = {
  loginPerIp: { limit: 50, windowMs: 15 * 60_000 },
  loginPerIpEmail: { limit: 5, windowMs: 15 * 60_000 },
  publicForm: { limit: 5, windowMs: 60 * 60_000 },
  emailRoute: { limit: 5, windowMs: 60 * 60_000 },
} as const;
