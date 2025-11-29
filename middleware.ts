import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register")

  // If logged in and on login/register → redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // If not logged in → block protected routes
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}
export const config = {
  matcher: [
    /*
     * Public routes:
     * - /login
     * - /register
     *
     * Everything else is protected
     */
    "/((?!_next|api|login|register|favicon.ico).*)",
  ],
}
