import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import apiClient from "@/lib/axios";
import authServices from "@/services/auth.service";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(
                credentials: Record<"username" | "password", string> | undefined
            ): Promise<UserExtended | null> {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                try {
                    // Call your BE login endpoint
                    const response = await authServices.login({
                        username: credentials.username,
                        password: credentials.password })

                    // If BE returns token, create user session
                    if (response.data?.token) {
                        return {
                            id: credentials.username,
                            name: credentials.username,
                            accessToken: response.data.token,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }: { token: JWTExtended; user: UserExtended }) {
            // Store the token from BE in JWT
            if (user) {
                token.accessToken = user.accessToken;
                token.username = user.name;
            }
            return token;
        },
        async session({
            session,
            token,
        }: {
            session: SessionExtended;
            token: JWTExtended;
        }) {
            // Pass token to client session
            session.user = token.user;
            session.accessToken = token.user?.accessToken;
            return session;
        },
    },
    pages: {
        signIn: "/login", // Custom login page
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
