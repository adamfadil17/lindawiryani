import type { Currency } from "@/types";

/**
 * USD → IDR conversion helper shared by every public price display.
 *
 * One module owns:
 *  - the fallback rate,
 *  - rate validation,
 *  - the browser cache (localStorage, shared across tabs, 12h TTL),
 *  - in-flight de-duplication and a short failure back-off,
 *  - price formatting, so cards/modals/details render identically.
 *
 * The actual upstream request goes through `/api/exchange-rate`, which caches
 * the third-party response on the server. Components must not call
 * api.exchangerate-api.com directly.
 */

export const FALLBACK_USD_TO_IDR = 15_800;

const MIN_PLAUSIBLE_RATE = 1_000;
const MAX_PLAUSIBLE_RATE = 100_000;

const RATE_ENDPOINT = "/api/exchange-rate";
const CACHE_KEY = "lw:usd-to-idr";
const CLIENT_CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const FAILURE_BACKOFF_MS = 60 * 1000;
const LEGACY_RATE_KEY = "exchangeRate";
const LEGACY_TIME_KEY = "exchangeRateTime";
const LEGACY_CACHE_TTL_MS = 60 * 60 * 1000;

type StoredRate = { rate: number; fetchedAt: number };

let inFlight: Promise<number> | null = null;
let retryAfter = 0;

/** Accepts a number or numeric string and rejects implausible IDR rates. */
export function parseUsdToIdr(value: unknown): number | null {
  const rate =
    typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isFinite(rate)) return null;
  if (rate < MIN_PLAUSIBLE_RATE || rate > MAX_PLAUSIBLE_RATE) return null;
  return rate;
}

export function formatPrice(
  price: number | undefined | null,
  currency: Currency,
  rate: number,
): string {
  if (!price || price <= 0) return "To Be Confirmed";

  const value = currency === "USD" ? price / rate : price;
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function storage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    // Storage can throw in privacy mode / sandboxed iframes.
    return null;
  }
}

function readStoredRate(maxAgeMs: number): number | null {
  const store = storage();
  if (!store) return null;

  try {
    const raw = store.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredRate>;
    const rate = parseUsdToIdr(parsed.rate);
    if (rate === null || typeof parsed.fetchedAt !== "number") return null;
    if (Date.now() - parsed.fetchedAt > maxAgeMs) return null;
    return rate;
  } catch {
    return null;
  }
}

function writeStoredRate(rate: number, fetchedAt = Date.now()) {
  const store = storage();
  if (!store) return;

  try {
    store.setItem(CACHE_KEY, JSON.stringify({ rate, fetchedAt } satisfies StoredRate));
  } catch {
    // Ignore quota errors; the in-memory value still works for this mount.
  }
}

/**
 * Reads a legacy sessionStorage entry written by the old hook so deploys don't
 * cause a burst of new requests for users who already have a fresh rate.
 */
function readLegacyRate(): number | null {
  if (typeof window === "undefined") return null;

  try {
    const rate = parseUsdToIdr(window.sessionStorage.getItem(LEGACY_RATE_KEY));
    const fetchedAt = Number(window.sessionStorage.getItem(LEGACY_TIME_KEY));
    if (rate === null || !Number.isFinite(fetchedAt)) return null;
    if (Date.now() - fetchedAt > LEGACY_CACHE_TTL_MS) return null;

    writeStoredRate(rate, fetchedAt);
    window.sessionStorage.removeItem(LEGACY_RATE_KEY);
    window.sessionStorage.removeItem(LEGACY_TIME_KEY);
    return rate;
  } catch {
    return null;
  }
}

/** Cached rate if it is still fresh, otherwise null. Safe during SSR. */
export function getCachedUsdToIdr(): number | null {
  return readStoredRate(CLIENT_CACHE_TTL_MS) ?? readLegacyRate();
}

async function requestUsdToIdr(): Promise<number> {
  try {
    const response = await fetch(RATE_ENDPOINT, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = (await response.json()) as { rate?: unknown };
    const rate = parseUsdToIdr(payload.rate);
    if (rate === null) throw new Error("Invalid USD→IDR rate");

    writeStoredRate(rate);
    retryAfter = 0;
    return rate;
  } catch (error) {
    retryAfter = Date.now() + FAILURE_BACKOFF_MS;

    if (process.env.NODE_ENV !== "production") {
      console.warn("[currency] USD→IDR rate unavailable, using cached/fallback", error);
    }

    // Prefer an expired cached rate over the hard-coded fallback.
    return readStoredRate(Number.POSITIVE_INFINITY) ?? FALLBACK_USD_TO_IDR;
  }
}

/**
 * Returns the USD→IDR rate.
 *
 * - Fresh browser cache → resolves immediately, no request.
 * - Concurrent callers share one in-flight request.
 * - After a failure, requests are skipped for 60s.
 */
export function getUsdToIdr(): Promise<number> {
  if (typeof window === "undefined") {
    return Promise.resolve(FALLBACK_USD_TO_IDR);
  }

  const cached = getCachedUsdToIdr();
  if (cached !== null) return Promise.resolve(cached);
  if (Date.now() < retryAfter) {
    return Promise.resolve(
      readStoredRate(Number.POSITIVE_INFINITY) ?? FALLBACK_USD_TO_IDR,
    );
  }

  if (!inFlight) {
    inFlight = requestUsdToIdr().finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
}
