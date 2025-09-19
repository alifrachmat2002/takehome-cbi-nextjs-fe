import { NextRequest, NextResponse } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token: JWTExtended | null = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = request.nextUrl;

    if (pathname === "/login") {
        if (token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
}

export const config = {
    matcher: ["/login"],
};
