import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";

// Zod schema for login form validation
const loginSchema = z.object({
    username: z
        .string()
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});

// Type inference from Zod schema
export type LoginFormData = z.infer<typeof loginSchema>;

interface LoginResponse {
    token: string;
}

export function useLogin() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const callbackUrl: string = (searchParams.get('callbackUrl') as string) || "/";

    // React Hook Form with Zod validation
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    // Login mutation using React Query
    const loginMutation = useMutation({
        mutationFn: async (data: LoginFormData) => {
            const result = await signIn("credentials", {
                username: data.username,
                password: data.password,
                redirect: false,
                callbackUrl
            });

            if (result?.error) {
                throw new Error("Invalid username or password");
            }

            return result;
        },
        onSuccess: () => {
            console.log("Login successful!");
            toast.success("Login successful!");
            router.push(callbackUrl); // Redirect to dashboard or desired page
        },
        onError: (error: Error) => {
            toast.error(`Login failed: ${error.message}` || "Login failed");
            console.error("Login failed:", error.message || "Login failed");
        },
    });

    // Form submission handler
    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    return {
        form,
        onSubmit,
        isLoading: loginMutation.isPending,
        error: loginMutation.error,
        loginSchema,
    };
}
