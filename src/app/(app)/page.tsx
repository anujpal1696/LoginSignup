"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Sparkles, Zap, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

const exampleReplies = [
    "You're cute, smart, legendary 😍",
    "You're funny, chill, attractive",
    "You're kind, ambitious, gorgeous",
    "You're hype, talented, iconic",
    "You're sweet, mysterious, lit 🔥",
];

const exampleConfessions = [
    "i love your vibe in class haha",
    "had a crush on you since fresher party",
    "your smile is everything 🥺",
    "you're way smarter than you think",
    "never told anyone but i like you",
];

const deeperQuestions = [
    "Who’s your campus crush?",
    "What’s your go-to late night Maggi combo?",
    "One thing you’d change about college life?",
    "Best memory from first year?",
    "What’s something no one knows about you?",
];

export default function Home() {
    return (
        <>
            {/* Full-screen scrolling landing page - NGL Style: Vertical scroll with bold sections */}
            <main className="min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 text-white snap-y snap-mandatory overflow-y-scroll">
                {/* Hero Section */}
                <section className="h-screen flex flex-col items-center justify-center px-8 text-center snap-start">
                    <h1 className="text-6xl md:text-8xl font-black mb-8">
                        NoCap
                    </h1>
                    <p className="text-2xl md:text-4xl font-bold mb-4">
                        real friends
                    </p>
                    <p className="text-2xl md:text-4xl font-bold mb-12">
                        real feelings
                    </p>
                    <p className="text-xl md:text-2xl max-w-2xl mb-16">
                        Anonymous messages from your college squad.
                        <br />
                        Confessions, feedback, fun — no cap 🧢
                    </p>
                    <Button
                        size="lg"
                        className="bg-white text-purple-600 hover:bg-yellow-300 font-black text-2xl px-12 py-8 rounded-full shadow-2xl"
                    >
                        <Link href="/sign-up">Get Your Link!</Link>
                    </Button>
                </section>

                {/* Modes Section */}
                <section className="h-screen flex flex-col items-center justify-center px-8 snap-start">
                    <h2 className="text-4xl md:text-6xl font-black mb-12">
                        play modes
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
                        <div className="flex flex-col items-center">
                            <Sparkles className="w-16 h-16 mb-4" />
                            <p className="text-xl font-bold">Ask Me Anything</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Send className="w-16 h-16 mb-4" />
                            <p className="text-xl font-bold">
                                Never Have I Ever
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Heart className="w-16 h-16 mb-4" />
                            <p className="text-xl font-bold">Confessions</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <MessageSquare className="w-16 h-16 mb-4" />
                            <p className="text-xl font-bold">3 Words</p>
                        </div>
                    </div>
                    <p className="mt-20 text-2xl font-medium">
                        Scroll for more 👇
                    </p>
                </section>

                {/* Example Replies Section */}
                <section className="h-screen flex flex-col items-center justify-center px-8 snap-start">
                    <h2 className="text-4xl md:text-6xl font-black mb-12">
                        what you'll get
                    </h2>
                    <div className="space-y-8 max-w-lg">
                        {exampleReplies.map((reply, i) => (
                            <Card
                                key={i}
                                className="bg-white/20 backdrop-blur-lg border-white/30 p-8 rounded-3xl text-center"
                            >
                                <p className="text-2xl md:text-3xl font-bold">
                                    {reply}
                                </p>
                            </Card>
                        ))}
                    </div>
                    <p className="mt-20 text-2xl font-medium">
                        Scroll for more 👇
                    </p>
                </section>

                {/* Confessions & Fun Messages */}
                <section className="h-screen flex flex-col items-center justify-center px-8 snap-start">
                    <h2 className="text-4xl md:text-6xl font-black mb-12">
                        flood your inbox
                    </h2>
                    <Carousel
                        plugins={[Autoplay({ delay: 3000 })]}
                        className="w-full max-w-lg"
                    >
                        <CarouselContent>
                            {exampleConfessions
                                .concat(messages.map((m) => m.content))
                                .map((msg, i) => (
                                    <CarouselItem key={i} className="px-2">
                                        <div className="bg-white rounded-2xl shadow-xl p-6 text-left">
                                            <p className="text-sm font-semibold text-gray-500 mb-2">
                                                Anonymous message
                                            </p>

                                            <p className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed">
                                                {msg}
                                            </p>

                                            <p className="mt-4 text-xs text-gray-400">
                                                10 minutes ago
                                            </p>
                                        </div>
                                    </CarouselItem>
                                ))}
                        </CarouselContent>
                    </Carousel>
                    <p className="mt-20 text-2xl font-medium">
                        Scroll for more 👇
                    </p>
                </section>

                {/* Deeper Questions */}
                <section className="h-screen flex flex-col items-center justify-center px-8 snap-start">
                    <h2 className="text-4xl md:text-6xl font-black mb-12">
                        get to know your friends
                    </h2>
                    <div className="space-y-8 max-w-2xl text-center">
                        {deeperQuestions.map((q, i) => (
                            <p
                                key={i}
                                className="text-2xl md:text-3xl font-medium"
                            >
                                {q}
                            </p>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="h-screen flex flex-col items-center justify-center px-8 text-center snap-start">
                    <p className="text-3xl md:text-5xl font-black mb-12">
                        join the fun
                    </p>
                    <Button
                        size="lg"
                        className="bg-white text-purple-600 hover:bg-yellow-300 font-black text-2xl px-12 py-8 rounded-full shadow-2xl mb-20"
                    >
                        <Link href="/sign-up">Get Your NoCap Link Now</Link>
                    </Button>
                </section>
            </main>

            {/* Footer - Fixed or separate section */}
            <footer className="py-12 bg-black/40 text-center text-white">
                <div className="space-y-4">
                    <div className="flex justify-center gap-8 text-lg">
                        <Link href="/about">About</Link>
                        <Link href="/safety">Safety</Link>
                        <Link href="/contact">Contact us</Link>
                    </div>
                    <p className="text-lg">hello@nocap.app</p>
                    <div className="flex justify-center gap-8 text-lg">
                        <Link href="/terms">Terms of Service</Link>
                        <Link href="/privacy">Privacy Policy</Link>
                    </div>
                    <p className="mt-8 text-lg text-gray-600">
                        Made with ❤️ for college chaos by Anuj ·{" "}
                        <a
                            href="https://www.linkedin.com/in/anujpal-dtu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium underline underline-offset-4 hover:text-blue-600 transition"
                        >
                            Connect on LinkedIn
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
}
