"use client";

import React, { useEffect, useRef, useState } from "react";
import { Film, Play, Pause, Sun, Moon, Eye, EyeOff, Sliders, RefreshCw } from "lucide-react";

interface BackgroundScrollVideoProps {
  className?: string;
}

export default function BackgroundScrollVideo({ className = "" }: BackgroundScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mode, setMode] = useState<"scroll" | "loop">("scroll");
  const [themeOverlay, setThemeOverlay] = useState<"dark" | "hybrid">("dark");
  const [videoOpacity, setVideoOpacity] = useState<number>(0.85);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isToolbarOpen, setIsToolbarOpen] = useState<boolean>(false);

  // Smooth lerp state for scroll scrubbing
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
      // Ensure video is paused if in scroll scrub mode
      if (mode === "scroll") {
        video.pause();
        if (video.currentTime < 0.1) {
          video.currentTime = 0.25;
        }
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [mode]);

  // Handle Play/Pause when switching between 'scroll' and 'loop'
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (mode === "loop") {
      video.loop = true;
      video.play().catch(() => {});
    } else {
      video.loop = false;
      video.pause();
    }
  }, [mode]);

  // Scroll listener + rAF lerp loop for ultra-smooth scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isRunning = true;

    const updateScrollTarget = () => {
      if (mode !== "scroll") return;

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      setScrollProgress(progress);

      if (video.duration) {
        targetTimeRef.current = progress * video.duration;
      }
    };

    const renderLoop = () => {
      if (!isRunning) return;

      if (mode === "scroll" && video && video.duration) {
        // Damped linear interpolation for organic, non-jerky scrubbing
        const diff = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(diff) > 0.005) {
          currentTimeRef.current += diff * 0.18; // smooth easing factor
          // Clamp within video bounds
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
  }, [mode]);

  // Apply dark theme class to document element when 'dark' overlay is selected
  useEffect(() => {
    if (themeOverlay === "dark") {
      document.documentElement.classList.add("theme-cyber-dark");
    } else {
      document.documentElement.classList.remove("theme-cyber-dark");
    }
    return () => {
      document.documentElement.classList.remove("theme-cyber-dark");
    };
  }, [themeOverlay]);

  return (
    <>
      {/* Background Fixed Video Canvas */}
      <div
        className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${className}`}
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
            opacity: videoOpacity,
            filter: "brightness(0.95) contrast(1.15)",
          }}
        />

        {/* Ambient Dark Scrim & Cyber Vignette for Text Legibility */}
        {themeOverlay === "dark" ? (
          <div className="absolute inset-0 bg-gradient-to-b from-[#121011]/65 via-[#181516]/45 to-[#121011]/75 backdrop-blur-[1px]" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#F6EEE2]/55 via-[#FFFDF6]/45 to-[#F6EEE2]/60 backdrop-blur-[1px]" />
        )}

        {/* Subtle radial spotlight vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,16,17,0.45)_100%)] pointer-events-none" />
      </div>

      {/* Floating Interactive Video Preview Controller (for user review) */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <div className="flex flex-col items-end gap-2">
          {isToolbarOpen && (
            <div className="w-80 rounded-2xl bg-[#181516]/95 border border-[#3E383A] p-4 text-white shadow-2xl backdrop-blur-xl space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between border-b border-[#332C2E] pb-2.5">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#C6532E]" />
                  <span className="text-xs font-bold tracking-tight">Background Video Control</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsToolbarOpen(false)}
                  className="text-xs text-[#A59C92] hover:text-white px-1.5 py-0.5 rounded"
                >
                  ✕
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-[#D4C9BC]">
                  <span>Scroll Depth</span>
                  <span className="text-[#C6532E] font-bold">
                    {Math.round(scrollProgress * 100)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#2B2527] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C6532E] to-purple-500 transition-all duration-100"
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </div>
              </div>

              {/* Playback Mode */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#A59C92] block">
                  Animation Behavior
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setMode("scroll")}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg border font-medium transition-all ${
                      mode === "scroll"
                        ? "bg-[#C6532E] text-white border-[#C6532E]"
                        : "bg-[#252022] text-[#D4C9BC] border-[#383134] hover:bg-[#2F292B]"
                    }`}
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Scroll Scrub</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("loop")}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg border font-medium transition-all ${
                      mode === "loop"
                        ? "bg-[#C6532E] text-white border-[#C6532E]"
                        : "bg-[#252022] text-[#D4C9BC] border-[#383134] hover:bg-[#2F292B]"
                    }`}
                  >
                    <Play className="w-3 h-3" />
                    <span>Auto Loop</span>
                  </button>
                </div>
              </div>

              {/* Theme Overlay Variant */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#A59C92] block">
                  Visual Treatment
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setThemeOverlay("dark")}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border font-medium transition-all ${
                      themeOverlay === "dark"
                        ? "bg-purple-900/60 text-purple-200 border-purple-500"
                        : "bg-[#252022] text-[#D4C9BC] border-[#383134] hover:bg-[#2F292B]"
                    }`}
                  >
                    <Moon className="w-3 h-3 text-purple-400" />
                    <span>Cyber Dark</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setThemeOverlay("hybrid")}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border font-medium transition-all ${
                      themeOverlay === "hybrid"
                        ? "bg-[#FCEAE3] text-[#231F20] border-[#C6532E]"
                        : "bg-[#252022] text-[#D4C9BC] border-[#383134] hover:bg-[#2F292B]"
                    }`}
                  >
                    <Sun className="w-3 h-3 text-[#C6532E]" />
                    <span>Warm Glass</span>
                  </button>
                </div>
              </div>

              {/* Opacity Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-[#D4C9BC]">
                  <span>Video Intensity</span>
                  <span>{Math.round(videoOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1"
                  step="0.05"
                  value={videoOpacity}
                  onChange={(e) => setVideoOpacity(parseFloat(e.target.value))}
                  className="w-full accent-[#C6532E] cursor-pointer"
                />
              </div>

              {/* Visibility Toggle */}
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="w-full py-2 px-3 rounded-lg border border-[#3E383A] bg-[#221D1F] hover:bg-[#2B2527] text-xs font-semibold flex items-center justify-center gap-2 text-[#E0D5C9] transition-colors"
              >
                {isVisible ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-red-400" />
                    <span>Hide Video (Compare Original)</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Show Video</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Quick Floating Pill Button */}
          <button
            type="button"
            onClick={() => setIsToolbarOpen(!isToolbarOpen)}
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#181516]/90 hover:bg-[#231F20] border border-[#3E383A] shadow-xl text-white text-xs font-semibold backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            title="Configure Background Scroll Video"
          >
            <span className="w-2 h-2 rounded-full bg-[#C6532E] animate-pulse" />
            <Film className="w-3.5 h-3.5 text-[#C6532E]" />
            <span>Background Video Preview</span>
            <Sliders className="w-3 h-3 text-[#A59C92] group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </>
  );
}
