import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { origin } = request.nextUrl;
  const verify = request.cookies.get("user");
  if (!verify) {
    return NextResponse.redirect(`${origin}/login`);
  }
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico|login).*)"],
};
