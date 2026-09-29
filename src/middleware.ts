import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { routing } from "@/i18n/routing";

const PROTECTED_PREFIXES = ["/dashboard"];
const AUTH_ONLY_ROUTES = ["/auth/login"];
const LOGIN_PAGE = "/auth/login";
const DASHBOARD_PAGE = "/dashboard";

const intlMiddleware = createIntlMiddleware(routing);

/**
 * Admin (/dashboard, /auth/login) is NOT localized on purpose — those
 * routes are matched first and go straight through the existing JWT
 * check untouched. Everything else falls through to next-intl, which
 * resolves the locale prefix for the public site.
 */
export async function middleware(req: NextRequest) {
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

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/login",
    // next-intl: everything except api, admin internals, and static files
    "/((?!api|_next|_vercel|dashboard|auth|.*\\..*).*)",
  ],
};
