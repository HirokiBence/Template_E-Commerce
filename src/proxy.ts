import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { getSessionCookie } from "better-auth/cookies";

const CART_SESSION_COOKIE_NAME = "session_id";
const PROTECTED_PATHS = ["/mypage", "/orders"];

export function proxy(request: NextRequest) {
  // 1. ログイン必須ページの保護
  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 2. カート用の匿名セッションIDを発行(まだ無ければ)
  const response = NextResponse.next();

  if (!request.cookies.get(CART_SESSION_COOKIE_NAME)) {
    response.cookies.set(CART_SESSION_COOKIE_NAME, randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};