"use client";

import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessage";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import {
    Loader2,
    RefreshCcw,
    Copy,
    Sparkles,
    Heart,
    MessageSquare,
} from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const DashboardPage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isloading, setIsLoading] = useState(false);
    const [isSwitchLoading, setIsSwitchingLoading] = useState(false);

    const handleDeleteMessage = (messageId: string) => {
        setMessages(
            messages.filter((message) => message._id.toString() !== messageId)
        );
    };

    const { data: session } = useSession();

    const form = useForm({
        resolver: zodResolver(acceptMessageSchema),
    });

    const { register, watch, setValue } = form;
    const acceptMessages = watch("acceptMessages");

    const fetchAcceptMessage = useCallback(async () => {
        setIsSwitchingLoading(true);
        try {
            const response = await axios.get<ApiResponse>(
                "/api/accept-messages"
            );
            setValue("acceptMessages", response.data.isAcceptingMessages);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.warning(
                axiosError.response?.data.message ||
                    "Failed to fetch message settings"
            );
        } finally {
            setIsSwitchingLoading(false);
        }
    }, [setValue]);

    const fetchMessages = useCallback(async (refresh: boolean = false) => {
        setIsLoading(true);
        try {
            const response = await axios.get<ApiResponse>("/api/get-messages");
            setMessages(response.data.messages || []);
            if (refresh) toast.info("Showing latest messages");
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.warning(
                axiosError.response?.data.message || "Failed to fetch messages"
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!session?.user) return;
        fetchMessages();
        fetchAcceptMessage();
    }, [session, fetchAcceptMessage, fetchMessages]);

    const handleSwitchChange = async () => {
        setIsSwitchingLoading(true);
        try {
            const response = await axios.post<ApiResponse>(
                "/api/accept-messages",
                { acceptMessages: !acceptMessages }
            );
            setValue("acceptMessages", !acceptMessages);
            toast.info(response.data.message);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.warning(
                axiosError.response?.data.message || "Failed to update settings"
            );
        } finally {
            setIsSwitchingLoading(false);
        }
    };

    if (!session?.user) return null;

    const { username } = session.user as User;
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const profileUrl = `${baseUrl}/u/${username}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(profileUrl);
        toast.success("Link copied ✨");
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 overflow-hidden">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/20 via-purple-500/20 to-orange-400/20 blur-3xl animate-pulse" />

            <div className="relative mx-auto w-full max-w-5xl px-6 py-12">
                {/* Header - Bold & Playful */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl mb-4">
                        Your NoCap Inbox
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-medium">
                        Real feelings. Secret senders. College chaos 😏
                    </p>
                </div>

                {/* Share Link Card - Glassmorphism */}
                <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 mb-10 shadow-2xl">
                    <div className="flex items-center gap-3 mb-5">
                        <MessageSquare className="w-8 h-8 text-yellow-300" />
                        <h2 className="text-2xl font-bold text-white">
                            Your Anonymous Link
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 bg-white/20 rounded-2xl px-6 py-4 text-white text-lg font-medium border border-white/30">
                            {profileUrl}
                        </div>
                        <Button
                            onClick={copyToClipboard}
                            className="bg-white text-purple-600 hover:bg-yellow-300 font-black text-xl px-8 py-6 rounded-full shadow-xl transition transform hover:scale-105"
                        >
                            <Copy className="h-6 w-6 mr-3" />
                            Copy Link
                        </Button>
                    </div>
                </div>

                {/* Accept Messages Toggle */}
                <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 mb-12 shadow-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Heart
                            className={`w-10 h-10 ${acceptMessages ? "text-pink-400" : "text-zinc-500"}`}
                        />
                        <div>
                            <h3 className="text-2xl font-bold text-white">
                                Accepting Messages
                            </h3>
                            <p className="text-white/80">
                                {acceptMessages
                                    ? "People can send you anon vibes ✨"
                                    : "Paused — taking a break"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {isSwitchLoading && (
                            <Loader2 className="h-8 w-8 animate-spin text-white/70" />
                        )}
                        <Switch
                            {...register("acceptMessages")}
                            checked={acceptMessages}
                            onCheckedChange={handleSwitchChange}
                            disabled={isSwitchLoading}
                            className="data-[state=checked]:bg-yellow-400 scale-150"
                        />
                    </div>
                </div>

                {/* Refresh Button */}
                <div className="flex justify-center mb-10">
                    <Button
                        size="lg"
                        onClick={(e) => {
                            e.preventDefault();
                            fetchMessages(true);
                        }}
                        className="bg-white/20 text-white hover:bg-white/30 text-xl px-10 py-6 rounded-full backdrop-blur border border-white/30 shadow-lg"
                    >
                        {isloading ? (
                            <Loader2 className="h-8 w-8 animate-spin mr-3" />
                        ) : (
                            <RefreshCcw className="h-8 w-8 mr-3" />
                        )}
                        Refresh Messages
                    </Button>
                </div>

                <Separator className="bg-white/20 mb-12" />

                {/* Messages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <div
                                key={message._id.toString()}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                            >
                                <MessageCard
                                    message={message}
                                    onMessageDelete={handleDeleteMessage}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <Sparkles className="w-20 h-20 text-white/30 mx-auto mb-6" />
                            <p className="text-2xl text-white/70 font-medium">
                                No messages yet 👀
                            </p>
                            <p className="text-xl text-white/60 mt-4">
                                Share your link on Insta stories or WhatsApp
                                status
                                <br />
                                and watch the anon confessions roll in 🔥
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
