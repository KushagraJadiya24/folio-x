"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or return a skeleton/placeholder
  }

  const isDarkMode = theme === "dark";

  // Sun Icon Component
  const SunIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );

  // Moon Icon Component
  const MoonIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 w-full backdrop-blur-sm border-b shadow-lg z-50 transition-all duration-300 bg-gradient-to-r from-white via-purple-50 to-white border-purple-200 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 dark:border-purple-500/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group-hover:scale-105 bg-purple-100/50 border-purple-300/50 group-hover:border-purple-400/70 dark:bg-white/10 dark:border-purple-400/30 dark:group-hover:border-purple-400/50">
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
            <h1 className="text-xl font-bold tracking-tight transition-colors text-slate-800 dark:text-white">
              FolioX
            </h1>
            <span className="text-xs font-medium transition-colors text-purple-600 dark:text-purple-300">
              Paper Trading
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/portfolio"
            className="font-medium transition-colors duration-200 text-gray-300 hover:text-purple-300 dark:text-gray-300 dark:hover:text-purple-300 light:text-gray-600 light:hover:text-purple-600"
          >
            Portfolio
          </Link>
          <Link
            href="/markets"
            className="font-medium transition-colors duration-200 text-gray-300 hover:text-purple-300 dark:text-gray-300 dark:hover:text-purple-300 light:text-gray-600 light:hover:text-purple-600"
          >
            Markets
          </Link>
          <Link
            href="/learn"
            className="font-medium transition-colors duration-200 text-gray-300 hover:text-purple-300 dark:text-gray-300 dark:hover:text-purple-300 light:text-gray-600 light:hover:text-purple-600"
          >
            Learn
          </Link>
        </nav>

        {/* CTA Section */}
        <div className="flex items-center gap-4">
          {/* Market Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border bg-green-500/20 border-green-500/30 dark:bg-green-500/20 dark:border-green-500/30 light:bg-green-100 light:border-green-300/50">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-300 dark:text-green-300 light:text-green-700">
              Markets Open
            </span>
          </div>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg transition-all duration-300 border bg-purple-800/30 hover:bg-purple-700/40 border-purple-600/30 text-yellow-300 dark:bg-purple-800/30 dark:hover:bg-purple-700/40 dark:border-purple-600/30 dark:text-yellow-300 light:bg-purple-50 light:hover:bg-purple-100 light:border-purple-200 light:text-slate-600"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          {/* Get Started Button */}
          {isSignedIn ? (
            <>
              <Link href="/signup">
                <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 border border-purple-500/30">
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
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 rounded-lg"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-lg shadow-md">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-lg transition-colors text-white hover:bg-purple-800/30 dark:text-white dark:hover:bg-purple-800/30 light:text-slate-600 light:hover:bg-purple-100">
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
