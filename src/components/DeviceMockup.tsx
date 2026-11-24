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

