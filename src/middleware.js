// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token) {
  try {
    return await jwtVerify(token, secret);
  } catch {
    return null; // fails if expired or invalid
  }
}

export async function middleware(req) {
  const token = req.cookies.get("admin_token")?.value;

  // Case 1: No token
  if (!token) {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // Case 2: Token exists but invalid
  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Case 3: Token valid → allow request
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user", JSON.stringify(payload.payload));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"], // protect only /admin routes
};
