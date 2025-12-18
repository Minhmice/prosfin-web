/**
 * Next.js Middleware
 * Route protection and CORS
 * 
 * Note: Full authentication check is done in route handlers.
 * This middleware only checks for session cookie presence.
 */

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Add CORS headers for public API routes
  if (request.nextUrl.pathname.startsWith("/api/public")) {
    const response = NextResponse.next()
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type")
    return response
  }

  // Public API routes don't require auth
  if (request.nextUrl.pathname.startsWith("/api/public")) {
    return NextResponse.next()
  }

  // Check for session cookie for protected routes
  // Full auth validation happens in route handlers using getServerSession
  const hasSessionCookie = 
    request.cookies.has("next-auth.session-token") ||
    request.cookies.has("__Secure-next-auth.session-token")

  // Admin routes require auth
  if (
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/api/crm") ||
    request.nextUrl.pathname.startsWith("/api/content")
  ) {
    if (!hasSessionCookie) {
      const signInUrl = new URL("/signin", request.url)
      signInUrl.searchParams.set("callbackUrl", request.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/(admin)/:path*",
    "/api/crm/:path*",
    "/api/content/:path*",
    "/api/public/:path*",
  ],
}

