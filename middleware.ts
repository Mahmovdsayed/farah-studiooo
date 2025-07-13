import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./Helpers/verifyToken";

export async function middleware(req: any) {
  const token = (await cookies()).get("userToken")?.value;
  const { pathname } = req.nextUrl;

  const response = NextResponse.next();

  if (!token) {
    return pathname.startsWith("/dashboard")
      ? NextResponse.redirect(new URL("/auth/signin", req.url))
      : response;
  }

  const decodedToken = await verifyToken(token);

  if (!decodedToken) {
    return pathname.startsWith("/dashboard")
      ? NextResponse.redirect(new URL("/auth/signin", req.url))
      : response;
  }

  if (pathname === "/auth/signin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/signin"],
};
