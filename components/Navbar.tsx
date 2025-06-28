'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 flex items-center bg-white border-b border-border px-6 py-3 backdrop-blur-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer mr-6">
        <Image src="/images/studybuddy.png" alt="logo" width={20} height={20} />
        <span className="font-semibold text-sm">Convotutor</span>
      </Link>

      {/* Primary nav */}
      <div className="flex items-center gap-6 text-sm">
        <Link href="/">Home</Link>
        <Link href="/companions">Companions</Link>
        <Link href="/my-journey">My Journey</Link>
        <Link href="/subscription">Subscription</Link>
      </div>

      {/* Auth actions */}
      <div className="ml-auto flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="border border-border rounded-full px-3 py-1 text-sm">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  )
  
}

export default Navbar
