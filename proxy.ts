import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes that require authentication
const PROTECTED_PATHS = ["/dashboard", "/doctor", "/patients"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken");

  // If user is already authenticated, keep them away from login/register
  if (accessToken && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Check if this path is protected
  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // Unauthenticated users go to the custom 404 page with a login button
  if (!accessToken) {
    const custom404Url = new URL("/404", request.url);
    custom404Url.searchParams.set("from", pathname);
    return NextResponse.redirect(custom404Url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, etc. (metadata files)
     * - api routes (Next.js API)
     * - 404 page itself
     */
    "/((?!_next/static|_next/image|favicon.ico|api/|404).*)",
  ],
};