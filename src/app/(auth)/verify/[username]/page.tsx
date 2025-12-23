"use client";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const VerifyCode = () => {
    const params = useParams<{ username: string }>();
    const router = useRouter();

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post<ApiResponse>("/api/verify-code", {
                username: params.username,
                code: data.code,
            });

            toast.success(response.data.message);
            router.replace("/sign-in");
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error("Verification failed", {
                description:
                    axiosError.response?.data.message ||
                    "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-black overflow-hidden">
            {/* background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-blue-500/20 blur-3xl" />

            <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/80 p-8 shadow-xl backdrop-blur">
                <div className="text-center mb-8 space-y-2">
                    <h1 className="text-4xl font-bold text-white">
                        Verify your email ✉️
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Enter the code we sent to your inbox
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-300">
                                        Verification code
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        placeholder="123456"
                                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500 tracking-widest text-center"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition"
                        >
                            Verify & continue
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default VerifyCode;
