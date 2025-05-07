import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  const { pathname } = request.nextUrl;
 

  // Check login path first
  if (pathname == "/login") {
  
    if (token) {
      console.log("User is authenticated, redirecting to home");
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Redirect unauthenticated users from protected routes
  if (!token && pathname.startsWith("/protected")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
};
