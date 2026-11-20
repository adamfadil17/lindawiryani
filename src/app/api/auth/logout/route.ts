import { NextResponse } from "next/server";

import { AUTH_COOKIE, authCookieOptions } from "@/lib/jwt";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Expire the HttpOnly session cookie with the same attributes it was set with.
  response.cookies.set({
    name: AUTH_COOKIE,
    value: "",
    ...authCookieOptions(),
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
