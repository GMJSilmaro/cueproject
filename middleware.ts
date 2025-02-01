import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // If the user is authenticated and trying to access login/register pages
    if (req.nextauth.token && (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register'))) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow public access to login and register pages when NOT authenticated
        if (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')) {
          return token === null
        }
        // Require authentication for protected routes
        return !!token
      }
    },
    pages: {
      signIn: '/login',
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/login",
    "/register"
  ]
} 