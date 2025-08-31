import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //get refresh token from cookie
  const refreshToken = request.cookies.get("refreshToken")?.value;
  //if refresh token is not present, redirect to login page
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }
  //get the path user trying to access
  const { pathname } = request.nextUrl;

  //Define the routes are for the authenticatio nwhich are public
  const authRoutes = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/verify-email",
  ];

  //anyother public pages
  const publicRoutes = [
    "/",
    "/about",
    "/contact",
    "/about/privacy-policy",
    "/about/terms-of-use",
    "/pricings",
  ];

  //Chekc if the current route is protected route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => pathname.includes(route));

  // A protected route is any route that is not public and not for authentication
  const isProtectedRoute = !isPublicRoute && !isAuthRoute;

  //redirect to "/dashboard" if user is already authenticated and try to access auth routes
  if (isAuthRoute && refreshToken) {
    // Exception: allow access to verify-email page even if logged in
    if (pathname === "/auth/verify-email") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  //if refresh token is present, return response
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
