import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="editorial-container py-24 sm:py-32 text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] text-xs font-mono text-accent">
        <span>Error 404</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
        Page Not Located
      </h1>

      <p className="text-base sm:text-lg text-text-secondary max-w-md mx-auto leading-relaxed">
        The digital route you are looking for has either been moved or does not
        exist in our studio index.
      </p>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-accent transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(35,31,32,0.15)] text-foreground font-semibold text-sm hover:bg-[rgba(35,31,32,0.05)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Portfolio</span>
        </Link>
      </div>
    </div>
  );
}

