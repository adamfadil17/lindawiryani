import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE, verifyToken } from "@/lib/jwt";
import { isSameOriginRequest, MUTATING_METHODS } from "@/lib/csrf";
import { routing } from "@/i18n/routing";

const PROTECTED_PREFIXES = ["/dashboard"];
const AUTH_ONLY_ROUTES = ["/auth/login"];
const LOGIN_PAGE = "/auth/login";
const DASHBOARD_PAGE = "/dashboard";

/** Roles allowed into the admin dashboard (task 1.4). */
const DASHBOARD_ROLES = new Set(["admin", "editor"]);

const intlMiddleware = createIntlMiddleware(routing);

/**
 * Admin (/dashboard, /auth/login) is NOT localized on purpose — those routes
 * are matched first and go straight through the JWT check untouched.
 * API routes only get the CSRF check; per-route auth stays in the handlers.
 * Everything else falls through to next-intl.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api")) {
    if (MUTATING_METHODS.has(req.method) && !isSameOriginRequest(req)) {
      return NextResponse.json(
        { success: false, error: "Cross-site request blocked" },
        { status: 403 },
      );
    }
    return NextResponse.next();
  }

  const isAdminRoute =
    PROTECTED_PREFIXES.some((p) => pathname.startsWith(p)) ||
    AUTH_ONLY_ROUTES.some((p) => pathname.startsWith(p));

  if (isAdminRoute) {
    const token = req.cookies.get(AUTH_COOKIE)?.value ?? null;
    let payload = null;

    if (token) {
      try {
        payload = await verifyToken(token);
      } catch {
        payload = null;
      }
    }

    if (PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) {
      if (!payload) {
        const url = req.nextUrl.clone();
        url.pathname = LOGIN_PAGE;
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
      }

      if (!DASHBOARD_ROLES.has(payload.role)) {
        const url = req.nextUrl.clone();
        url.pathname = LOGIN_PAGE;
        url.search = "";
        url.searchParams.set("error", "forbidden");
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    }

    if (AUTH_ONLY_ROUTES.some((p) => pathname.startsWith(p))) {
      if (payload) {
        const url = req.nextUrl.clone();
        url.pathname = DASHBOARD_PAGE;
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard/:path*",
    "/auth/login",
    // next-intl: everything except api, admin internals, and static files
    "/((?!api|_next|_vercel|dashboard|auth|.*\\..*).*)",
  ],
};
