"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global Smooth Scrolling with 50% Reduced Velocity (0.5x speed multiplier)
 * - wheelMultiplier: 0.5 (moves at 50% normal scroll velocity for mouse-wheel and trackpad)
 * - touchMultiplier: 0.5 (50% velocity for touch gestures)
 * - syncTouch: false (ensures native mobile touch gestures remain responsive without jank)
 * - Smooth exponential deceleration curve
 * - Safe for sticky headers, modals, inner scrollable containers, and anchor links
 * - Honors prefers-reduced-motion
 */
export default function SmoothScroll() {
  useEffect(() => {
    // 1. Accessibility: Strictly respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // 2. Initialize Lenis with 0.5x velocity multiplier
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.5,
      touchMultiplier: 0.5,
      syncTouch: false, // Ensures native mobile touch scrolling remains responsive without jank
      prevent: (node) => {
        // Prevent scroll hijacking inside interactive elements and scrollable containers
        if (!node) return false;
        if (
          node.tagName === "INPUT" ||
          node.tagName === "TEXTAREA" ||
          node.tagName === "SELECT" ||
          node.isContentEditable ||
          node.hasAttribute("data-lenis-prevent")
        ) {
          return true;
        }

        // Inner scrollable containers (e.g. modals, drawers, code blocks)
        let el: HTMLElement | null = node;
        while (el && el !== document.body && el !== document.documentElement) {
          const style = window.getComputedStyle(el);
          const overflowY = style.overflowY;
          if (
            (overflowY === "auto" || overflowY === "scroll") &&
            el.scrollHeight > el.clientHeight
          ) {
            return true;
          }
          el = el.parentElement;
        }

        return false;
      },
    });

    // 3. Smooth requestAnimationFrame loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 4. Smooth Anchor Link Navigation (accounts for fixed / sticky navbar)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, {
            offset: -90, // Sticky navbar height clearance
            duration: 1.2,
          });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // 5. Expose instance globally for programmatic control if needed
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}
