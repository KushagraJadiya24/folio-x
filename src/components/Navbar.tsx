import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ModeToggle } from "./ThemeTrigger";
const Navbar = () => {
  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-sm border-b border-purple-500/20 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-purple-400/30 group-hover:border-purple-400/50 transition-all duration-300 group-hover:scale-105">
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
            <h1 className="text-xl font-bold text-white tracking-tight">
              FolioX
            </h1>
            <span className="text-xs text-purple-300 font-medium">
              Paper Trading
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/portfolio"
            className="text-gray-300 hover:text-purple-300 transition-colors duration-200 font-medium"
          >
            Portfolio
          </Link>
          <Link
            href="/markets"
            className="text-gray-300 hover:text-purple-300 transition-colors duration-200 font-medium"
          >
            Markets
          </Link>
          <Link
            href="/learn"
            className="text-gray-300 hover:text-purple-300 transition-colors duration-200 font-medium"
          >
            Learn
          </Link>
        </nav>

        {/* CTA Section */}
        <div className="flex items-center gap-4">
          {/* Market Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-sm font-medium">
              Markets Open
            </span>
          </div>
          <ModeToggle />

          {/* Get Started Button */}
          <Link href="/sign-up">
            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 border border-purple-500/30">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2 hover:bg-purple-800/30 rounded-lg transition-colors">
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
