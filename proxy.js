import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "./lib/session";

// Gate every /admin page behind a valid session cookie.
// API routes guard themselves (see lib/serverAuth.js); this is page-level UX.
// (Next.js 16 renamed the "middleware" convention to "proxy".)
export async function proxy(req) {
 const { pathname } = req.nextUrl;

 const isLogin = pathname === "/admin/login";
 const token = req.cookies.get(SESSION_COOKIE)?.value;
 const session = await verifySessionToken(token);

 // Authenticated user hitting the login page → send to dashboard.
 if (isLogin && session) {
 return NextResponse.redirect(new URL("/admin/dashboard", req.url));
 }

 // Unauthenticated user hitting any protected admin page → send to login.
 if (!isLogin && !session) {
 const url = new URL("/admin/login", req.url);
 return NextResponse.redirect(url);
 }

 return NextResponse.next();
}

export const config = {
 // Run on all /admin routes (the login page is handled inside the proxy).
 matcher: ["/admin/:path*"],
};
