import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value ?? null
  const { pathname } = req.nextUrl

  // ============================
  // SPECIAL CASE: ROOT "/"
  // ============================
  if (pathname === "/") {
    return token
      ? NextResponse.redirect(new URL("/dashboard", req.url))
      : NextResponse.redirect(new URL("/login", req.url))
  }

  // ============================
  // PUBLIC ROUTES
  // ============================
  const isPublicRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/api")

  // Logged-in users shouldn't visit auth pages
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register")
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // ============================
  // PROTECTED ROUTES
  // ============================
  const protectedRoots = ["/dashboard", "/homes", "/devices"]

  const isProtected = protectedRoots.some((p) => pathname.startsWith(p))

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon|assets|public).*)",
  ],
}
