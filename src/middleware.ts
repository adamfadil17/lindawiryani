import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const PROTECTED_PREFIXES = ["/dashboard"];
const AUTH_ONLY_ROUTES = ["/auth/login"];
const LOGIN_PAGE = "/auth/login";
const DASHBOARD_PAGE = "/dashboard";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};
