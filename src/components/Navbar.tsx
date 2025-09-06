"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or return a skeleton/placeholder
  }

  return (
    <header className="fixed top-0 w-full backdrop-blur-sm border-b shadow-lg z-50 transition-all duration-300 bg-background/80 border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group-hover:scale-105 bg-muted/50 border-border group-hover:border-primary/70">
            <Image
              src="/logo.png"
              alt="FolioX Logo"
              width={32}
              height={32}
              priority
              className="w-8 h-8"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight transition-colors text-foreground">
              FolioX
            </h1>
            <span className="text-xs font-medium transition-colors text-primary">
              Paper Trading
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 ml-44">
          <Link
            href="/portfolio"
            className="font-medium transition-colors duration-200 text-muted-foreground hover:text-primary"
          >
            Portfolio
          </Link>
          <Link
            href="/markets"
            className="font-medium transition-colors duration-200 text-muted-foreground hover:text-primary"
          >
            Markets
          </Link>
          <Link
            href="/news"
            className="font-medium transition-colors duration-200 text-muted-foreground hover:text-primary"
          >
            News
          </Link>
        </nav>

        {/* CTA Section */}
        <div className="flex items-center gap-4">
          {/* Market Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              Markets Open
            </span>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Auth Buttons */}
          {isSignedIn ? (
            <>
              <Link href="/signup">
                <button className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 border border-primary/30">
                  Get Started
                </button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton>
                <Button
                  variant="outline"
                  className="border-border text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-md transition-colors">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-lg transition-colors text-muted-foreground hover:bg-muted hover:text-foreground">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
