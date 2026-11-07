"use client";

import React from "react";
import { Sliders } from "lucide-react";
import { openCookieSettings } from "@/lib/consent";

interface CookieSettingsButtonProps {
  className?: string;
  showIcon?: boolean;
}

export default function CookieSettingsButton({
  className = "text-[#D4C9BC] hover:text-white transition-colors text-left text-sm",
  showIcon = false,
}: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={() => openCookieSettings()}
      className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer ${className}`}
      title="Open cookie preference settings"
    >
      {showIcon && <Sliders className="w-3.5 h-3.5 text-accent" />}
      <span>Cookie Settings</span>
    </button>
  );
}

