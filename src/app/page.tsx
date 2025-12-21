"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            {/* TOP NAV */}
            <header className="flex justify-end px-6 py-4">
                <div className="flex gap-3">
                    <Link href="/sign-in">
                        <Button
                            variant="outline"
                            className="text-black border-white hover:bg-white hover:text-black"
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link href="sign-up">
                        <Button>Sign Up</Button>
                    </Link>
                </div>
            </header>
            {/* HERO */}
            <section className="flex flex-col items-center justify-center text-center px-4 py-24">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                    KyaSceneHai
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                    Naam nahi, sirf scene. <br />
                    College life ke sawaal — bina judge, bina pehchaan.
                </p>

                <div className="mt-8 flex gap-4 flex-wrap justify-center">
                    <Link href="/ask">
                        <Button size="lg" className="text-lg">
                            Scene Poochho
                        </Button>
                    </Link>
                    <Link href="/explore">
                        <Button size="lg" variant="outline" className="text-lg">
                            Replies Dekho
                        </Button>
                    </Link>
                </div>
            </section>

            {/* WHY SECTION */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Ye platform alag kyun hai?
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2 text-white">
                                😈 Full Anonymous
                            </h3>
                            <p className="text-gray-400">
                                Koi username ka pressure nahi. Jo dil mein hai,
                                seedha likho.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2 text-white">
                                🎓 College Vibes
                            </h3>
                            <p className="text-gray-400">
                                Crush, exams, placements, projects — yahan sabka
                                scene chalta hai.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2 text-white">
                                💬 Honest Replies
                            </h3>
                            <p className="text-gray-400">
                                No LinkedIn gyaan. Real students. Real opinions.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* SAMPLE QUESTIONS */}
            <section className="bg-gray-950 py-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Aise scenes aate rehte hain 👀
                </h2>

                <div className="max-w-4xl mx-auto grid gap-4">
                    {[
                        "Crush ne seen karke reply nahi diya… kya scene hai?",
                        "3 din mein exam hai, kuch ho sakta hai?",
                        "React seekhun ya DSA? Placement ka kya scene?",
                        "Attendance 65% hai… tension leni chahiye?",
                    ].map((q, i) => (
                        <Card key={i} className="bg-gray-900 border-gray-800">
                            <CardContent className="p-4 text-gray-300">
                                {q}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link href="/ask">
                        <Button size="lg">Apna Scene Poochho</Button>
                    </Link>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="max-w-5xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Scene ka process simple hai
                </h2>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                        <p className="text-4xl mb-2">✍️</p>
                        <h3 className="font-semibold text-xl mb-1">
                            Scene likho
                        </h3>
                        <p className="text-gray-400">
                            Sawaal poochho. Naam mat likho.
                        </p>
                    </div>

                    <div>
                        <p className="text-4xl mb-2">👥</p>
                        <h3 className="font-semibold text-xl mb-1">
                            Replies aayenge
                        </h3>
                        <p className="text-gray-400">
                            Log apna experience share karenge.
                        </p>
                    </div>

                    <div>
                        <p className="text-4xl mb-2">🧠</p>
                        <h3 className="font-semibold text-xl mb-1">
                            Apna scene samjho
                        </h3>
                        <p className="text-gray-400">
                            Tum decide karo — kya sahi hai.
                        </p>
                    </div>
                </div>
            </section>

            {/* FOOTER CTA */}
            <footer className="bg-black py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Scene dimaag mein hai?
                </h2>
                <p className="text-gray-400 mb-6">
                    Anonymous hai. Honest hoga.
                </p>
                <Link href="/ask">
                    <Button size="lg">Abhi Scene Poochho</Button>
                </Link>

                <p className="mt-3 text-gray-400">
                    Made by{" "}
                    <span className="font-semibold text-white">it's Anuj</span>
                </p>
                <p className="text-gray-500 text-sm mt-1">I write code.</p>

                <p className="text-gray-500 text-sm mt-8">
                    © {new Date().getFullYear()} KyaSceneHai — Naam nahi, sirf
                    scene.
                </p>
            </footer>
        </main>
    );
}
