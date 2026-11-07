import React from "react";
import Image from "next/image";

interface LogoProps {
  variant?: "badge" | "lockup" | "lockup-light" | "mark" | "mark-dark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
}

export default function Logo({
  variant = "badge",
  size = "md",
  className = "",
  priority = false,
}: LogoProps) {
  // 1. Sleek rounded squircle badge (as in the official reference image)
  if (variant === "badge") {
    const sizeMap = {
      sm: "w-7 h-7 rounded-lg",
      md: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl",
      lg: "w-12 h-12 rounded-2xl",
      xl: "w-16 h-16 rounded-3xl",
    };

    return (
      <div
        className={`relative ${sizeMap[size]} overflow-hidden shadow-sm border border-[rgba(35,31,32,0.1)] flex-shrink-0 bg-[#0C0B0D] ${className}`}
      >
        <Image
          src="/images/logo_badge.webp"
          alt="DataCrafts Logo"
          fill
          priority={priority}
          sizes="(max-width: 768px) 40px, 48px"
          className="object-cover"
        />
      </div>
    );
  }

  // 2. Full horizontal lockup (mark + DataCrafts + SOFTWARE SOLUTIONS)
  if (variant === "lockup" || variant === "lockup-light") {
    const isLight = variant === "lockup-light";
    const src = isLight
      ? "/images/logo_lockup_dark.webp"
      : "/images/logo_lockup.webp";

    const heightMap = {
      sm: "h-6 w-auto",
      md: "h-8 sm:h-9 w-auto",
      lg: "h-11 sm:h-12 w-auto",
      xl: "h-16 w-auto",
    };

    return (
      <div className={`relative inline-block ${heightMap[size]} ${className}`}>
        <Image
          src={src}
          alt="DataCrafts Software Solutions"
          width={480}
          height={110}
          priority={priority}
          className={`${heightMap[size]} object-contain`}
        />
      </div>
    );
  }

  // 3. Isolated transparent mark
  const isDarkMark = variant === "mark-dark";
  const markSrc = isDarkMark
    ? "/images/logo_mark_dark.webp"
    : "/images/logo_mark.webp";

  const markSizeMap = {
    sm: "w-6 h-5",
    md: "w-8 h-7",
    lg: "w-12 h-10",
    xl: "w-16 h-13",
  };

  return (
    <div className={`relative ${markSizeMap[size]} flex-shrink-0 ${className}`}>
      <Image
        src={markSrc}
        alt="DataCrafts Emblem"
        fill
        priority={priority}
        sizes="48px"
        className="object-contain"
      />
    </div>
  );
}
