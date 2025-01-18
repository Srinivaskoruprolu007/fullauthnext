import { NextRequest, NextResponse } from "next/server";

// logic part
export function middleware(req: NextRequest) {
//   get path from Next request
    const path = req.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup";
    const token = req.cookies.get("token")?.value 
    if(isPublicPath && token){
        return NextResponse.redirect(new URL("/profile", req.nextUrl))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL("/login", req.nextUrl))
    }
}

// matching part
export const config = {
  matcher: ["/profile", "/", "/login", "/signup"],
};
