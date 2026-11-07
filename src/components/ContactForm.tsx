"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send, MessageCircle, PhoneCall } from "lucide-react";
import { BRAND } from "@/data/studio";

interface ContactFormProps {
  initialService?: string;
  initialBudget?: string;
}

export default function ContactForm({
  initialService,
  initialBudget,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    service: initialService || "Website Development",
    budget: initialBudget || "₹3,000 – ₹10,000 (Starter / Landing Page)",
    preferredContact: "WhatsApp",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const serviceOptions = [
    "Website Development",
    "E-commerce Development",
    "Custom Software Development",
    "Mobile & PWA Development",
    "Automation & Integrations",
  ];

  const budgetOptions = [
    "₹4,000 – ₹10,000 (Starter / Landing Page)",
    "₹10,000 – ₹30,000 (Business Website)",
    "₹10,000 – ₹45,000 (Shopify E-Commerce Store)",
    "₹75,000 – ₹1,50,000+ (Custom Software)",
    "Flexible / Custom Scope",
  ];

  const contactMethods = ["WhatsApp", "Phone Call", "Email"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setStatus("success");
      setReferenceId(data.referenceId || "DATACRAFT-CONFIRMED");
      setWhatsappUrl(data.whatsappUrl || BRAND.officialWhatsAppUrl);
      setFormData({
        name: "",
        email: "",
        businessName: "",
        service: "Website Development",
        budget: "₹3,000 – ₹10,000 (Starter / Landing Page)",
        preferredContact: "WhatsApp",
        description: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          "Something went wrong. Please connect via our official consultation line."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    const waLink =
      whatsappUrl ||
      `${BRAND.officialWhatsAppUrl}&text=Hi%20DataCraft%2C%20I%20just%20submitted%20consultation%20request%20${referenceId}`;

    return (
      <div className="rounded-3xl bg-[#FFFDF6] border border-emerald-600/30 p-8 md:p-12 shadow-card space-y-6 text-center animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Consultation Request Received
          </span>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Thank you. We have received your project details.
          </h3>
          <p className="text-text-secondary text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Reference ID:{" "}
            <span className="font-mono font-semibold text-foreground">
              {referenceId}
            </span>
            . A team member will review your requirements and reach out within 24
            business hours.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-semibold text-xs sm:text-sm hover:bg-accent-hover transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Call / WhatsApp — +91 88658 04386</span>
          </a>
          <a
            href="tel:+918006205606"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FCFAF8] border border-[rgba(35,31,32,0.15)] text-foreground font-semibold text-xs sm:text-sm hover:border-accent transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-accent" />
            <span>Call DataCraft — +91 80062 05606</span>
          </a>
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-xs text-text-secondary underline hover:text-foreground"
          >
            Submit Another Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.14)] p-6 md:p-10 shadow-card space-y-8"
      noValidate
    >
      {/* Starting price transparency banner */}
      <div className="p-4 rounded-2xl bg-[#FCEAE3] border border-[#C6532E]/30 text-[#231F20] space-y-1">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#C6532E]">
            Pricing Transparency
          </span>
          <span className="text-xs font-bold text-foreground bg-white/80 px-2.5 py-0.5 rounded-full border border-[#C6532E]/20">
            {BRAND.startingPrice}
          </span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          {BRAND.startingPriceNote}
        </p>
      </div>

      {status === "error" && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold"
          >
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="e.g. Vikram Sethi"
            className="w-full px-4 py-3 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.12)] text-foreground placeholder:text-text-secondary/50 text-sm focus:border-accent focus:bg-white focus:outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold"
          >
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="e.g. vikram@company.com"
            className="w-full px-4 py-3 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.12)] text-foreground placeholder:text-text-secondary/50 text-sm focus:border-accent focus:bg-white focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Business Name */}
      <div className="space-y-2">
        <label
          htmlFor="businessName"
          className="block text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold"
        >
          Business Name (Optional)
        </label>
        <input
          id="businessName"
          type="text"
          value={formData.businessName}
          onChange={(e) =>
            setFormData({ ...formData, businessName: e.target.value })
          }
          placeholder="e.g. Sethi Consumer Products or Startup Project"
          className="w-full px-4 py-3 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.12)] text-foreground placeholder:text-text-secondary/50 text-sm focus:border-accent focus:bg-white focus:outline-none transition-all"
        />
      </div>

      {/* Service Selection */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold">
          Service Required *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {serviceOptions.map((srv) => {
            const isSelected = formData.service === srv;
            return (
              <button
                key={srv}
                type="button"
                onClick={() => setFormData({ ...formData, service: srv })}
                className={`px-3.5 py-2.5 rounded-2xl text-xs font-medium text-left transition-all border ${isSelected
                    ? "bg-foreground text-background border-foreground shadow-sm"
                    : "bg-[#FCFAF8] text-foreground/80 border-[rgba(35,31,32,0.1)] hover:bg-[#F6EEE2]"
                  }`}
              >
                {srv}
              </button>
            );
          })}
        </div>
      </div>

      {/* Approximate Budget (Starting at ₹3,000) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold">
            Approximate Budget *
          </label>
          <span className="text-[11px] font-mono text-accent font-semibold">
            Starting from ₹3,000
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((b) => {
            const isSelected = formData.budget === b;
            return (
              <button
                key={b}
                type="button"
                onClick={() => setFormData({ ...formData, budget: b })}
                className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all border ${isSelected
                    ? "bg-accent text-white border-accent shadow-sm"
                    : "bg-[#FCFAF8] text-foreground/80 border-[rgba(35,31,32,0.1)] hover:bg-[#F6EEE2]"
                  }`}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preferred Contact Method */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold">
          Preferred Contact Method *
        </label>
        <div className="flex flex-wrap gap-2.5">
          {contactMethods.map((method) => {
            const isSelected = formData.preferredContact === method;
            return (
              <button
                key={method}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, preferredContact: method })
                }
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${isSelected
                    ? "bg-foreground text-background border-foreground"
                    : "bg-[#FCFAF8] text-foreground/80 border-[rgba(35,31,32,0.1)] hover:bg-[#F6EEE2]"
                  }`}
              >
                {method}
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold"
        >
          Project Description & Scope *
        </label>
        <textarea
          id="description"
          rows={4}
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Tell us about what you want to build, current challenges, technical preferences, and target timeline..."
          className="w-full px-4 py-3 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.12)] text-foreground placeholder:text-text-secondary/50 text-sm focus:border-accent focus:bg-white focus:outline-none transition-all resize-y"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-secondary">
          Reply guaranteed within 24 business hours. No spam, ever.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-accent disabled:opacity-50 transition-colors shadow-sm focus-visible:outline-none"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <span>Book a Consultation</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
