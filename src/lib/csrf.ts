/**
 * CSRF defense for cookie-authenticated mutating requests (task 1.3).
 *
 * The session cookie is `SameSite=Lax`, which already stops cross-site POSTs
 * in modern browsers; this is defense in depth. The check is applied in
 * `middleware.ts` to every `/api/*` POST/PUT/PATCH/DELETE.
 *
 * Non-browser clients (curl, scripts, the smoke test) do not send `Origin` and
 * are allowed — they cannot ride an ambient cookie from a victim's browser.
 * Behind nginx, `Host` must be forwarded unchanged (task 8.4).
 */
export const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function isSameOriginRequest(req: Request): boolean {
  const secFetchSite = req.headers.get("sec-fetch-site");
  if (
    secFetchSite &&
    secFetchSite !== "same-origin" &&
    secFetchSite !== "none"
  ) {
    return false;
  }

  const origin = req.headers.get("origin");
  if (!origin) return true;
  if (origin === "null") return false;

  const host =
    req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
