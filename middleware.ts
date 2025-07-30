import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./Helpers/verifyToken";
import { baseURL } from "./constant/statics";

export async function middleware(req: any) {
  const token = (await cookies()).get("userToken")?.value;
  const { pathname } = req.nextUrl;

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  const origin = req.headers.get("origin");
  const allowedOrigins = [baseURL];

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse("CORS policy violation", { status: 403 });
  }

  if (!token) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    return response;
  }

  const decodedToken = await verifyToken(token);

  if (!decodedToken) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    return response;
  }

  if (pathname === "/auth/signin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/signin"],
};
