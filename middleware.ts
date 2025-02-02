import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { isProtectedRoute, isAuthRoute, DASHBOARD_ROOT } from '@/lib/routes'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Get the token and ensure we pass the correct configuration
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production'
  })

  const isAuthenticated = !!token

  // Handle redirects in middleware instead of layout
  if (isAuthenticated) {
    // Redirect authenticated users away from auth pages and root path
    if (isAuthRoute(pathname) || pathname === '/') {
      return NextResponse.redirect(new URL(DASHBOARD_ROOT, request.url))
    }
  } else {
    // Redirect unauthenticated users away from protected pages
    if (isProtectedRoute(pathname)) {
      const callbackUrl = encodeURIComponent(pathname)
      return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url))
    }
  }

  // Add headers for informational purposes only
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)
  requestHeaders.set('x-is-authenticated', isAuthenticated.toString())

  // Debug logging
  console.log('Middleware - Path:', pathname)
  console.log('Middleware - Is Authenticated:', isAuthenticated)
  console.log('Middleware - Is Protected Route:', isProtectedRoute(pathname))
  console.log('Middleware - Is Auth Route:', isAuthRoute(pathname))

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Configure middleware to run on all pages except api and static
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}