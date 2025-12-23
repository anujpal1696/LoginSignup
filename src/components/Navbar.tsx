'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { LogOut } from 'lucide-react';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white"
        >
          NoCap<span className="text-pink-400">.</span>
        </Link>

        {/* Right side */}
        {session ? (
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-zinc-400">
              @{user.username || user.email}
            </span>

            <Button
              onClick={() => signOut()}
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
