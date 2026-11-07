"use client";

import { useEffect } from "react";

/**
 * Controlled Desktop Mouse-Wheel Scrolling
 * - Reduces distance traveled by approximately 50% (0.5x scaling) per mouse-wheel notch.
 * - Interpolates with smooth exponential ease-out to eliminate abrupt stops.
 * - Never interferes with trackpad momentum, touch gestures, keyboard navigation, or inner scroll containers.
 * - Respects prefers-reduced-motion and fine-pointer media queries.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // 1. Accessibility: Strictly respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // 2. Only apply on fine-pointer (mouse) desktop environments
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let isRunning = false;
    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let rafId: number | null = null;

    // Synchronize coordinates whenever the user navigates via keyboard, scrollbar, or hash links
    const handleNativeScrollSync = () => {
      if (!isRunning) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };
    window.addEventListener("scroll", handleNativeScrollSync, { passive: true });

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const step = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.5) {
        // Organic ease-out factor (~0.14) provides natural physics deceleration
        currentY += diff * 0.14;
        window.scrollTo(0, currentY);
        rafId = requestAnimationFrame(step);
      } else {
        // Settled exactly at destination
        currentY = targetY;
        window.scrollTo(0, targetY);
        isRunning = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Ignore if user has active modifier keys (e.g. Ctrl/Cmd + Wheel for browser zoom)
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
        return;
      }

      // Ignore inputs, textareas, selects, or editable regions
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Avoid trapping inner scrollable containers (e.g. modal dialogs, code blocks)
      let el = target;
      while (el && el !== document.body && el !== document.documentElement) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight
        ) {
          return;
        }
        el = el.parentElement;
      }

      // Trackpad vs. Physical Mouse Wheel Differentiation:
      // - Trackpads produce continuous, high-frequency, fractional deltas or tiny deltas (< 36px),
      //   and frequently have slight horizontal drift (deltaX != 0).
      // - Physical mouse wheels produce discrete, integer jumps (e.g., deltaMode === 1 for Firefox,
      //   or integer deltaY >= 36 with deltaX === 0).
      const isLineMode = e.deltaMode === 1; // Firefox lines mode
      const isIntegerDelta = Number.isInteger(e.deltaY);
      const isLargeStep = Math.abs(e.deltaY) >= 36;
      const isZeroDeltaX = Math.abs(e.deltaX) < 1;

      const isPhysicalMouseWheel =
        isLineMode || (isIntegerDelta && isLargeStep && isZeroDeltaX);

      // If it is a trackpad gesture, let native browser kinetic scrolling handle it completely
      if (!isPhysicalMouseWheel) {
        return;
      }

      // Physical mouse wheel detected: prevent the harsh, abrupt default jump
      e.preventDefault();

      // Normalize delta (1 line in Firefox ~ 36px)
      const rawDelta = isLineMode ? e.deltaY * 36 : e.deltaY;

      // Apply ~0.5x scaling (50% less distance per notch)
      const scaledDelta = rawDelta * 0.5;

      // Clamp target within valid document bounds
      const maxScroll = getMaxScroll();
      targetY = Math.min(Math.max(0, targetY + scaledDelta), maxScroll);

      // Kick off smooth RAF interpolation loop if not already running
      if (!isRunning) {
        isRunning = true;
        currentY = window.scrollY;
        rafId = requestAnimationFrame(step);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleNativeScrollSync);
      window.removeEventListener("wheel", handleWheel);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}

