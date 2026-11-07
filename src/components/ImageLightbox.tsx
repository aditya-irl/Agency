"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn, ExternalLink } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  children: React.ReactNode;
}

export default function ImageLightbox({
  src,
  alt,
  caption,
  children,
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-zoom-in relative group"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(true);
        }}
        aria-label={`Enlarge image: ${alt}`}
      >
        {children}
        <div className="absolute bottom-4 right-4 bg-[#231F20]/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center gap-1.5 shadow-lg border border-white/10">
          <ZoomIn className="w-3.5 h-3.5 text-accent" />
          <span>Click to Inspect Full Res</span>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#181516]/95 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center animate-fadeIn"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          {/* Header Controls */}
          <div
            className="w-full max-w-6xl flex items-center justify-between pb-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs font-mono text-[#D4C9BC] truncate max-w-lg">
              {caption || alt}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-[#282325] border border-[#3E383A] text-white hover:bg-accent hover:border-accent transition-colors"
              aria-label="Close enlarged view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Full Screen Image Frame */}
          <div
            className="relative w-full max-w-6xl max-h-[85vh] aspect-[1024/567] rounded-2xl overflow-hidden bg-[#231F20] border border-[#3D3739] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="pt-3 text-center text-xs text-[#A59C92] font-mono">
            Press ESC or click outside to dismiss
          </div>
        </div>
      )}
    </>
  );
}

