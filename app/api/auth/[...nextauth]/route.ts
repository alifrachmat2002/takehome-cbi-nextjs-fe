import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                try {
                    // Call your BE login endpoint
                    const response = await axios.post(
                        "http://localhost:8080/login",
                        {
                            username: credentials.username,
                            password: credentials.password,
                        }
                    );

                    // If BE returns token, create user session
                    if (response.data?.token) {
                        return {
                            id: credentials.username,
                            name: credentials.username,
                            token: response.data.token,
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
        async jwt({ token, user }) {
            // Store the token from BE in JWT
            if (user) {
                token.accessToken = (user as any).token;
                token.username = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            // Pass token to client session
            (session as any).accessToken = token.accessToken;
            session.user = {
                ...session.user,
                name: token.username as string,
            };
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
