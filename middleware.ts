import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;
  const adminToken = process.env.ADMIN_TOKEN ?? "changeme";
  const isAuth = token === adminToken;

  // Redirect authenticated users away from login
  if (pathname === "/admin" && isAuth) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Protect all sub-routes
  if (pathname.startsWith("/admin/") && !isAuth) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Protect admin API routes
  if (pathname.startsWith("/api/admin/") && pathname !== "/api/admin/auth") {
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
