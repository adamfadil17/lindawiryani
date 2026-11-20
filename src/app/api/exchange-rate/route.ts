import { NextResponse } from "next/server";

import {
  FALLBACK_USD_TO_IDR,
  parseUsdToIdr,
} from "@/lib/currency";

/**
 * Server-side cache for the public USD→IDR rate.
 *
 * Client components never call the third-party API directly: they read
 * localStorage first and otherwise call this route. The route keeps a warm
 * in-memory value for 24h and also lets Next's data cache absorb the upstream
 * fetch, so api.exchangerate-api.com is hit at most once per day per instance.
 */

const UPSTREAM_URL = "https://api.exchangerate-api.com/v4/latest/USD";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CACHE_TTL_SECONDS = CACHE_TTL_MS / 1000;
const RESPONSE_HEADERS = {
  "Cache-Control": `public, max-age=3600, s-maxage=${CACHE_TTL_SECONDS}, stale-while-revalidate=604800`,
};

let memory: { rate: number; expiresAt: number } | null = null;

// Keep the route out of the static build so `next build` never depends on the
// upstream API being reachable.
export const dynamic = "force-dynamic";

function respond(rate: number, source: "live" | "cache" | "fallback") {
  return NextResponse.json({ rate, source }, { headers: RESPONSE_HEADERS });
}

export async function GET() {
  const now = Date.now();

  if (memory && memory.expiresAt > now) {
    return respond(memory.rate, "cache");
  }

  try {
    const response = await fetch(UPSTREAM_URL, {
      headers: { Accept: "application/json" },
      next: { revalidate: CACHE_TTL_SECONDS },
    });
    if (!response.ok) throw new Error(`Upstream HTTP ${response.status}`);

    const payload = (await response.json()) as { rates?: { IDR?: unknown } };
    const rate = parseUsdToIdr(payload.rates?.IDR);
    if (rate === null) throw new Error("Invalid IDR rate from upstream");

    memory = { rate, expiresAt: now + CACHE_TTL_MS };
    return respond(rate, "live");
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[exchange-rate] upstream unavailable", error);
    }

    if (memory) {
      return respond(memory.rate, "cache");
    }

    return respond(FALLBACK_USD_TO_IDR, "fallback");
  }
}
