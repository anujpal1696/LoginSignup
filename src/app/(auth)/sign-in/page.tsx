"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

export default function SignInForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        const result = await signIn("credentials", {
            redirect: false,
            identifier: data.identifier,
            password: data.password,
        });

        if (result?.error) {
            toast.warning("Login Failed", {
                description:
                    result.error === "CredentialsSignin"
                        ? "Incorrect username or password"
                        : result.error,
            });
        }

        if (result?.ok) {
            router.replace("/dashboard");
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
            {/* background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-blue-500/20 blur-3xl" />

            <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/80 p-8 shadow-xl backdrop-blur">
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-white">
                        Welcome back 👀
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Log in to see what people said about you on{" "}
                        <span className="text-white font-medium">NoCap</span>
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FormField
                            name="identifier"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-300">
                                        Email or username
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500"
                                        placeholder="you@example.com"
                                    />
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
                                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500"
                                        placeholder="••••••••"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition"
                        >
                            Sign in
                        </Button>
                    </form>
                </Form>

                <p className="mt-6 text-center text-sm text-zinc-400">
                    New here?{" "}
                    <Link
                        href="/sign-up"
                        className="text-pink-400 hover:text-pink-300 font-medium"
                    >
                        Create your NoCap link →
                    </Link>
                </p>
            </div>
        </div>
    );
}
