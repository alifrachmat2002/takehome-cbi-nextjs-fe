import axios from "axios";
import { getSession } from "next-auth/react";
import { SessionExtended } from "@/types/Auth";

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const session = (await getSession()) as SessionExtended;
            if (session?.accessToken) {
                config.headers.Authorization = `Bearer ${session.accessToken}`;
            }
        } catch (error) {
            console.error("Failed to get session:", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle authentication errors
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid, redirect to login
            if (typeof window !== "undefined") {
                const { signOut } = await import("next-auth/react");
                await signOut({ callbackUrl: "/login" });
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
