"use client";

import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";

export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const debounced = useDebounceCallback(setUsername, 300);
    const router = useRouter();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (!username) return;

            setIsCheckingUsername(true);
            try {
                const response = await axios.get(
                    `/api/check-username-unique?username=${username}`
                );
                setUsernameMessage(response.data.message);
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                setUsernameMessage(
                    axiosError.response?.data.message ??
                        "Error checking username"
                );
            } finally {
                setIsCheckingUsername(false);
            }
        };

        checkUsernameUnique();
    }, [username]);

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true);
        try {
            const resp = await axios.post<ApiResponse>("/api/sign-up", data);
            toast.success(resp.data.message);
            // router.replace(`/verify/${username}`); 
            // domain name problem
            router.replace(`/sign-in`);  

        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast("Sign Up Failed", {
                description:
                    axiosError.response?.data.message ??
                    "Please try again later",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-black overflow-hidden">
            {/* background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-blue-500/20 blur-3xl" />

            <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/80 p-8 shadow-xl backdrop-blur">
                <div className="text-center mb-8 space-y-2">
                    <h1 className="text-4xl font-bold text-white">
                        Create your NoCap 👀
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Get honest messages. No names. No filters.
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-300">
                                        Username
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        placeholder="yourname"
                                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            debounced(e.target.value);
                                        }}
                                    />

                                    <div className="flex items-center gap-2 mt-1 min-h-[20px]">
                                        {isCheckingUsername && (
                                            <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                                        )}
                                        {!isCheckingUsername &&
                                            usernameMessage && (
                                                <p
                                                    className={`text-xs ${
                                                        usernameMessage ===
                                                        "Username is unique"
                                                            ? "text-green-400"
                                                            : "text-red-400"
                                                    }`}
                                                >
                                                    {usernameMessage}
                                                </p>
                                            )}
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-300">
                                        Email
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="you@example.com"
                                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500"
                                    />
                                    <p className="text-xs text-zinc-500 mt-1">
                                        We’ll send you a verification code
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-300">
                                        Password
                                    </FormLabel>
                                    <Input
                                        type="password"
                                        {...field}
                                        placeholder="••••••••"
                                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account…
                                </>
                            ) : (
                                "Create my NoCap link"
                            )}
                        </Button>
                    </form>
                </Form>

                <p className="mt-6 text-center text-sm text-zinc-400">
                    Already have one?{" "}
                    <Link
                        href="/sign-in"
                        className="text-pink-400 hover:text-pink-300 font-medium"
                    >
                        Sign in →
                    </Link>
                </p>
            </div>
        </div>
    );
}
