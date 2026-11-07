import React from "react";
import Image from "next/image";
import { Lock, Globe } from "lucide-react";

interface DesktopMockupProps {
  src: string;
  alt: string;
  urlDisplay: string;
  className?: string;
  priority?: boolean;
  theme?: "light" | "dark";
}

export function DesktopMockup({
  src,
  alt,
  urlDisplay,
  className = "",
  priority = false,
  theme = "light",
}: DesktopMockupProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 ${
        isDark
          ? "bg-[#1C191A] border border-[#3D3739] shadow-tech"
          : "bg-[#FFFDF6] border border-[rgba(35,31,32,0.14)] shadow-card"
      } ${className}`}
    >
      {/* Browser Bar */}
      <div
        className={`px-4 py-2.5 border-b flex items-center justify-between gap-4 select-none ${
          isDark
            ? "bg-[#252022] border-[#3D3739]"
            : "bg-[#F3EBE0] border-[rgba(35,31,32,0.1)]"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C6532E]" />
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isDark ? "bg-[#4D4547]" : "bg-[#D4C9BC]"
            }`}
          />
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isDark ? "bg-[#3D3739]" : "bg-[#B8ADA0]"
            }`}
          />
        </div>
        <div
          className={`flex-1 max-w-sm mx-auto flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[11px] truncate border ${
            isDark
              ? "bg-[#181516] border-[#3D3739] text-[#A59C92]"
              : "bg-[#FFFDF6] border-[rgba(35,31,32,0.08)] text-text-secondary"
          }`}
        >
          <Lock className="w-2.5 h-2.5 text-accent" />
          <span className="truncate font-mono">{urlDisplay}</span>
        </div>
        <div className="w-12 text-right">
          <Globe
            className={`w-3.5 h-3.5 inline-block ${
              isDark ? "text-[#77716D]" : "text-text-secondary/60"
            }`}
          />
        </div>
      </div>

      {/* Viewport Content with preserved aspect ratio */}
      <div
        className={`relative aspect-[1024/567] w-full overflow-hidden ${
          isDark ? "bg-[#181516]" : "bg-[#F3EBE0]"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 950px"
          className="object-cover object-top transition-transform duration-500 hover:scale-[1.01]"
        />
      </div>
    </div>
  );
}

interface MobileMockupProps {
  src: string;
  alt: string;
  className?: string;
}

export function MobileMockup({
  src,
  alt,
  className = "",
}: MobileMockupProps) {
  return (
    <div
      className={`relative rounded-[2.2rem] p-2 bg-[#1C191A] border-4 border-[#3D3739] shadow-2xl overflow-hidden ${className}`}
    >
      {/* Dynamic island notch */}
      <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#1C191A] rounded-full z-20 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[#352F30] mr-2" />
        <div className="w-6 h-1 rounded-full bg-[#352F30]" />
      </div>

      {/* Screen Frame */}
      <div className="relative aspect-[9/19.5] w-full rounded-[1.8rem] overflow-hidden bg-[#FFFDF6]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 60vw, 300px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
