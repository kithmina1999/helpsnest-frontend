import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //get refresh token from cookie
  const refreshToken = request.cookies.get("refresh_token")?.value;
  //if refresh token is not present, redirect to login page
  //get the path user trying to access
  const { pathname } = request.nextUrl;

  //Define the routes are for the authenticatio nwhich are public
  const authRoutes = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];

  //anyother public pages
  const publicRoutes = [
    "/auth/verify-email",
    "/about",
    "/contact",
    "/about/privacy-policy",
    "/about/terms-of-use",
    "/pricings",
  ];

  //Chekc if the current route is protected route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  //if the user logged in (have a token)
  if (refreshToken) {
    // And they are trying to access a login/register page, redirect to dashboard
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  //if the user is not logged in (have no token)
  else {
    // And they are trying to access a page that is NOT public and NOT for auth,redirect to login page
    if (!isPublicRoute && !isAuthRoute) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
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
