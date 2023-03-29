import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { origin } = request.nextUrl;
  const user = request.cookies.get("user");
  if (!user) {
    return NextResponse.redirect(`${origin}/login`);
  } else {
    const userData = JSON.parse(user.value);
    if(userData.roles[0] === 'buyer'){
    
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico|login).*)"],
};
