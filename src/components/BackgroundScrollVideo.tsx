"use client";

import React, { useEffect, useRef } from "react";

interface BackgroundScrollVideoProps {
  className?: string;
}

export default function BackgroundScrollVideo({ className = "" }: BackgroundScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Smooth lerp state for scroll scrubbing
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.pause();
      if (video.currentTime < 0.1) {
        video.currentTime = 0.25;
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Scroll listener + rAF lerp loop for ultra-smooth scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isRunning = true;

    const updateScrollTarget = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      if (video.duration) {
        targetTimeRef.current = Math.min(Math.max(progress * video.duration, 0), video.duration - 0.05);
      }
    };

    const renderLoop = () => {
      if (!isRunning) return;

      if (video && video.duration) {
        // Damped linear interpolation for organic, non-jerky scrubbing
        const diff = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(diff) > 0.005) {
          currentTimeRef.current += diff * 0.18; // smooth easing factor
          const safeTime = Math.max(0, Math.min(currentTimeRef.current, video.duration - 0.02));
          try {
            video.currentTime = safeTime;
          } catch {
            // Ignore fast seek errors if browser decodes asynchronously
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", updateScrollTarget, { passive: true });
    updateScrollTarget();
    renderLoop();

    // Attach to Lenis smooth scroll instance if active
    let lenisHandler: any;
    const lenis = typeof window !== "undefined" ? (window as any).lenis : null;
    if (lenis) {
      lenisHandler = () => updateScrollTarget();
      lenis.on("scroll", lenisHandler);
    }

    return () => {
      isRunning = false;
      window.removeEventListener("scroll", updateScrollTarget);
      if (lenis && lenisHandler) {
        lenis.off("scroll", lenisHandler);
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Apply default dark theme class to document element
  useEffect(() => {
    document.documentElement.classList.add("theme-cyber-dark");
    return () => {
      document.documentElement.classList.remove("theme-cyber-dark");
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src="/videos/datacrafts_scroll_scrub.mp4"
        poster="/videos/video_poster.webp"
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
        style={{
          opacity: 0.85,
          filter: "brightness(0.95) contrast(1.15)",
        }}
      />

      {/* Ambient Dark Scrim & Cyber Vignette for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121011]/65 via-[#181516]/45 to-[#121011]/75 backdrop-blur-[1px]" />

      {/* Subtle radial spotlight vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,16,17,0.45)_100%)] pointer-events-none" />
    </div>
  );
}
