"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, X, CheckCircle2, ArrowUpRight, MessageCircle, Calendar } from "lucide-react";

interface ConfidentialDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

export function ConfidentialDemoModal({
  isOpen,
  onClose,
  projectName = "Finance CRM Platform",
}: ConfidentialDemoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const whatsappDemoUrl = `https://wa.me/918865804386?text=${encodeURIComponent(
    `Hi DataCrafts, I would like to schedule a private live demo walkthrough of the ${projectName}.`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confidential-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#181516] border border-[#3E383A] text-white p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#A59C92] hover:text-white hover:bg-[#252022] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2325] border border-[#4D3B3E] text-xs font-mono text-[#E5A96A] font-semibold">
          <Lock className="w-3.5 h-3.5 text-[#C6532E]" />
          <span>Client Confidentiality & NDA Protected</span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3
            id="confidential-modal-title"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight"
          >
            Private Enterprise System: Demo by Scheduled Request
          </h3>
          <p className="text-sm text-[#D4C9BC] leading-relaxed">
            The <strong>{projectName}</strong> actively manages sensitive financial ledgers, borrower credit records, and field recovery workflows. Due to client Non-Disclosure Agreements (NDA) and financial data privacy safeguards, direct public production access is restricted.
          </p>
        </div>

        {/* Walkthrough Benefits */}
        <div className="p-4 rounded-2xl bg-[#231F20] border border-[#352F31] space-y-2.5 text-xs text-[#E0D5C9]">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#C6532E] mt-0.5 flex-shrink-0" />
            <span>
              <strong>Guided 30-Min Walkthrough:</strong> Directly hosted by founders Aditya & Shreya with anonymized sample data.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#C6532E] mt-0.5 flex-shrink-0" />
            <span>
              <strong>Full Architecture Review:</strong> Inspect ACID-compliant ledger waterfall allocation, PAR aging, and role-based permissions.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#C6532E] mt-0.5 flex-shrink-0" />
            <span>
              <strong>Scope & Feasibility:</strong> Receive concrete technical advice on how to build a similar software system for your business.
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-1">
          <Link
            href="/contact?service=Custom%20Software%20Development&demo=Finance%20CRM#book-appointment"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#C6532E] text-white font-semibold text-sm hover:bg-[#A84121] transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Your Demo Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <a
            href={whatsappDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-[#484042] text-[#E0D5C9] font-semibold text-sm hover:bg-[#252022] hover:text-white transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Request Demo on WhatsApp</span>
          </a>
        </div>

        <p className="text-[11px] font-mono text-[#A59C92] text-center">
          Direct founder consultation · Response within 24 business hours · Zero sales pressure
        </p>
      </div>
    </div>
  );
}

interface ConfidentialDemoButtonProps {
  projectName?: string;
  className?: string;
  label?: string;
  children?: React.ReactNode;
}

export function ConfidentialDemoButton({
  projectName = "Finance CRM Platform",
  className = "",
  label = "Live Demo",
  children,
}: ConfidentialDemoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
        title="Client Confidentiality Protected — Request Demo Access"
      >
        {children || (
          <>
            <Lock className="w-3.5 h-3.5 text-[#C6532E]" />
            <span>{label}</span>
          </>
        )}
      </button>

      <ConfidentialDemoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        projectName={projectName}
      />
    </>
  );
}
