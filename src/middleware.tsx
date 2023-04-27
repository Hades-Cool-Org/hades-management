import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { origin } = request.nextUrl;
  const user = request.cookies.get("user");
  if (!user) {
    return NextResponse.redirect(`${origin}/login`);
  } else {
    const userData = JSON.parse(user.value);
    const expiracy = new Date(userData.exp * 1000);
    const now = new Date();
    if (expiracy < now) {
      request.cookies.clear();
      return NextResponse.redirect(`${origin}/login`);
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico|login).*)"],
};
