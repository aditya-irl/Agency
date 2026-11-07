"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { BRAND } from "@/data/studio";

export default function ScopeEstimator() {
  const [projectType, setProjectType] = useState<
    "starter" | "website" | "ecommerce" | "software" | "automation"
  >("starter");

  const [features, setFeatures] = useState<string[]>([
    "Mobile-First Responsive Layout",
  ]);

  const projectTypes = [
    {
      id: "starter",
      label: "Starter / Landing Page",
      basePrice: 50,
      baseInr: 3000,
      baseWeeks: 1,
    },
    {
      id: "website",
      label: "Brand Website / Showcase",
      basePrice: 150,
      baseInr: 12000,
      baseWeeks: 2,
    },
    {
      id: "ecommerce",
      label: "Shopify / E-Commerce Store",
      basePrice: 350,
      baseInr: 28000,
      baseWeeks: 3,
    },
    {
      id: "software",
      label: "Custom Software / Web App",
      basePrice: 800,
      baseInr: 65000,
      baseWeeks: 5,
    },
    {
      id: "automation",
      label: "Automation & API Pipeline",
      basePrice: 100,
      baseInr: 8000,
      baseWeeks: 1,
    },
  ];

  const availableFeatures = [
    { id: "Mobile-First Responsive Layout", inr: 0 },
    { id: "Custom Visual Identity & Typography", inr: 2500 },
    { id: "Distributor / Lead Capture Funnel", inr: 2000 },
    { id: "Payment & Local Checkouts (UPI / Razorpay)", inr: 4500 },
    { id: "WhatsApp Business API Automation", inr: 5000 },
    { id: "Role-Based Access & Admin Panel", inr: 15000 },
  ];

  const toggleFeature = (f: string) => {
    if (f === "Mobile-First Responsive Layout") return; // Included by default
    if (features.includes(f)) {
      setFeatures(features.filter((item) => item !== f));
    } else {
      setFeatures([...features, f]);
    }
  };

  const currentType =
    projectTypes.find((p) => p.id === projectType) || projectTypes[0];

  const featureCostInr = features.reduce((acc, f) => {
    const item = availableFeatures.find((af) => af.id === f);
    return acc + (item ? item.inr : 0);
  }, 0);

  const totalInr = currentType.baseInr + featureCostInr;
  const weeks = currentType.baseWeeks + (features.length > 3 ? 1 : 0);

  const inquiryUrl = `/contact?service=${encodeURIComponent(
    currentType.label
  )}&budget=${encodeURIComponent(
    `₹${totalInr.toLocaleString("en-IN")}`
  )}`;

  return (
    <div className="rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.14)] p-6 sm:p-10 md:p-12 shadow-card space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(35,31,32,0.1)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-accent" />
            <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
              {BRAND.startingPriceMessage}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Digital Solutions Starting at ₹3,000
          </h3>
          <p className="text-sm text-text-secondary max-w-xl">
            {BRAND.startingPriceSubtext}
          </p>
        </div>
        <div className="text-xs font-mono text-accent bg-[#FCEAE3] px-3.5 py-1.5 rounded-full font-bold self-start sm:self-auto border border-accent/20">
          Starting ₹3,000 onwards
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Selections */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Project Type */}
          <div className="space-y-2.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold">
              1. Select Project Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {projectTypes.map((pt) => {
                const isSelected = projectType === pt.id;
                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setProjectType(pt.id as any)}
                    className={`p-3 rounded-2xl text-left text-xs font-semibold transition-all border ${isSelected
                        ? "bg-foreground text-background border-foreground shadow-sm"
                        : "bg-[#FCFAF8] text-foreground/85 border-[rgba(35,31,32,0.1)] hover:bg-[#F6EEE2]"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{pt.label}</span>
                      <span
                        className={`text-[10px] font-mono ${isSelected ? "text-accent" : "text-text-secondary"
                          }`}
                      >
                        From ₹{pt.baseInr.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Features & Modules */}
          <div className="space-y-2.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold">
              2. Add Key Capabilities
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableFeatures.map((af) => {
                const isChecked = features.includes(af.id);
                return (
                  <button
                    key={af.id}
                    type="button"
                    onClick={() => toggleFeature(af.id)}
                    className={`p-3 rounded-2xl text-left text-xs font-medium flex items-center justify-between gap-2 border transition-all ${isChecked
                        ? "bg-[#FCEAE3] text-[#C6532E] border-[#C6532E]/40"
                        : "bg-[#FCFAF8] text-text-secondary border-[rgba(35,31,32,0.08)] hover:bg-[#F6EEE2]"
                      }`}
                  >
                    <span>{af.id}</span>
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${isChecked
                          ? "bg-accent text-white"
                          : "border border-[rgba(35,31,32,0.2)]"
                        }`}
                    >
                      {isChecked && <Check className="w-2.5 h-2.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Card: Real-Time Projection Output */}
        <div className="lg:col-span-5 rounded-2xl bg-[#181516] text-[#FFFDF6] border border-[#383234] p-6 sm:p-8 space-y-6 shadow-tech">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">
              Project Estimate
            </span>
            <h4 className="text-lg font-bold text-white">
              Estimated Investment
            </h4>
          </div>

          <div className="space-y-1 pb-4 border-b border-[#332C2E]">
            <div className="text-3xl font-extrabold text-white">
              ₹{totalInr.toLocaleString("en-IN")} onwards
            </div>
            <div className="text-xs font-mono text-[#D4C9BC]">
              Starting at ₹3,000 · Transparent Milestone Billing
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono pb-4 border-b border-[#332C2E]">
            <div>
              <span className="text-[#A59C92] block">Delivery Window:</span>
              <span className="text-white font-bold">{weeks} — {weeks + 1} Weeks</span>
            </div>
            <div>
              <span className="text-[#A59C92] block">Selected Modules:</span>
              <span className="text-accent font-bold">{features.length} Components</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href={inquiryUrl}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-accent text-white font-semibold text-xs sm:text-sm hover:bg-accent-hover transition-colors shadow-sm"
            >
              <span>Book a Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <p className="text-[11px] text-[#A59C92] text-center leading-relaxed">
              {BRAND.startingPriceNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
