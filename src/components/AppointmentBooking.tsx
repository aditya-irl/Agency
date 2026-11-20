"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  Building,
  User,
  Layers,
  FileText,
  CalendarCheck,
} from "lucide-react";

const SERVICES_OPTIONS = [
  "Custom Web Application",
  "Shopify E-Commerce Store",
  "Custom CRM / ERP Software",
  "Business Website & Local SEO",
  "Other Software Solution",
];

const TIME_SLOTS = [
  "10:00 AM – 12:00 PM",
  "12:00 PM – 3:00 PM",
  "3:00 PM – 6:00 PM",
  "6:00 PM – 8:00 PM",
];

interface AppointmentBookingProps {
  id?: string;
  defaultService?: string;
  className?: string;
}

export default function AppointmentBooking({
  id = "book-consultation",
  defaultService,
  className = "",
}: AppointmentBookingProps) {
  // Format today's date YYYY-MM-DD for min attribute
  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessName: "",
    service: defaultService || SERVICES_OPTIONS[0],
    date: "",
    timeSlot: TIME_SLOTS[0],
    notes: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<{
    referenceId: string;
    name: string;
    phone: string;
    businessName: string;
    service: string;
    date: string;
    timeSlot: string;
    notes?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side validations
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage("Please enter your full name (minimum 2 characters).");
      return;
    }

    // Indian mobile phone validation (10 digits starting with 6-9)
    const rawDigits = formData.phone.replace(/\D/g, "");
    let cleanDigits = rawDigits;
    if (cleanDigits.length === 12 && cleanDigits.startsWith("91")) {
      cleanDigits = cleanDigits.slice(2);
    } else if (cleanDigits.length === 11 && cleanDigits.startsWith("0")) {
      cleanDigits = cleanDigits.slice(1);
    }

    if (!/^[6-9]\d{9}$/.test(cleanDigits)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).");
      return;
    }

    if (!formData.date) {
      setErrorMessage("Please choose your preferred appointment date.");
      return;
    }

    if (formData.date < todayStr) {
      setErrorMessage("Appointment date cannot be in the past.");
      return;
    }

    setStatus("loading");

    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
        "7fd46483-7c3b-44b2-ba8e-8c266ff8a49e";

      const referenceId = `DC-APT-${Date.now().toString().slice(-6)}-${Math.random()
        .toString(36)
        .substring(2, 5)
        .toUpperCase()}`;

      // 1. Direct Web3Forms submission to inbox
      const web3FormsPayload = {
        access_key: accessKey,
        subject: `🚀 New DataCrafts Appointment: ${formData.name.trim()} (${formData.service})`,
        from_name: "DataCrafts Appointment Scheduler",
        name: formData.name.trim(),
        phone: `+91 ${cleanDigits}`,
        business: formData.businessName.trim() || "N/A",
        service: formData.service,
        preferred_date: formData.date,
        preferred_time_slot: formData.timeSlot,
        project_notes: formData.notes.trim() || "None",
        reference_id: referenceId,
        botcheck: "",
      };

      // Execute Web3Forms direct submission AND internal API concurrently
      const [w3fRes, apiRes] = await Promise.allSettled([
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(web3FormsPayload),
        }),
        fetch("/api/book-appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            phone: cleanDigits,
            businessName: formData.businessName.trim(),
            service: formData.service,
            date: formData.date,
            timeSlot: formData.timeSlot,
            notes: formData.notes.trim(),
          }),
        }),
      ]);

      const apiData =
        apiRes.status === "fulfilled" && apiRes.value.ok
          ? await apiRes.value.json().catch(() => null)
          : null;

      const w3fData =
        w3fRes.status === "fulfilled" && w3fRes.value.ok
          ? await w3fRes.value.json().catch(() => null)
          : null;

      const w3fSuccess = Boolean(w3fData && w3fData.success);
      const apiSuccess = Boolean(apiData && apiData.success);

      // As long as at least one pipeline succeeded, we consider it confirmed
      if (!w3fSuccess && !apiSuccess) {
        throw new Error(
          apiData?.error ||
            w3fData?.message ||
            "Unable to confirm appointment right now. Please try again or reach us at +91 8865804386."
        );
      }

      const activeRef =
        apiData?.booking?.referenceId || referenceId;

      // 3. Display on-site confirmation screen without page reload
      setConfirmedBooking({
        referenceId: activeRef,
        name: formData.name.trim(),
        phone: `+91 ${cleanDigits}`,
        businessName: formData.businessName.trim(),
        service: formData.service,
        date: formData.date,
        timeSlot: formData.timeSlot,
        notes: formData.notes.trim(),
      });
      setStatus("success");
    } catch (err: any) {
      console.error("[APPOINTMENT_SUBMIT_ERROR]", err);
      setErrorMessage(err.message || "Network error. Please try again or reach us directly via call.");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      businessName: "",
      service: SERVICES_OPTIONS[0],
      date: "",
      timeSlot: TIME_SLOTS[0],
      notes: "",
    });
    setConfirmedBooking(null);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section id={id} className={`scroll-mt-28 ${className}`}>
      <div className="rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] p-6 sm:p-10 md:p-14 shadow-card relative overflow-hidden">
        {/* Subtle Ambient Warm Terracotta Glow */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FCEAE3] border border-accent/25 text-xs font-semibold text-accent shadow-subtle">
              <span>Free 30-Minute Technical Consultation</span>
            </div>
            <h2 id="appointment-booking-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Book a Free Consultation
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Schedule a dedicated discovery call with our founders. Choose your preferred day and time slot—no obligation, pure architectural clarity.
            </p>

            {/* Live Social Proof / Availability Micro-Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold shadow-subtle">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Next Slot: Tomorrow · 100% Free</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCFAF8] text-text-secondary border border-[rgba(35,31,32,0.12)] font-medium shadow-subtle">
                <span>WhatsApp Response: &lt; 15 mins</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCFAF8] text-text-secondary border border-[rgba(35,31,32,0.12)] font-medium shadow-subtle">
                <span>Zero Vendor Lock-in</span>
              </span>
            </div>
          </div>

          {/* =========================================================
              ON-SITE CONFIRMATION STATE (NO REDIRECT TO WHATSAPP)
              ========================================================= */}
          {status === "success" && confirmedBooking && (
            <div className="rounded-2xl bg-white border border-emerald-500/30 p-8 sm:p-10 shadow-lg text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold inline-block">
                  Slot Reserved & Notified
                </span>
                <h3 id="appointment-confirmed-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  Appointment Confirmed!
                </h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Our team at <strong className="text-foreground">DataCrafts</strong> will reach out on WhatsApp/call at your scheduled slot.
                </p>
              </div>

              {/* Booking Summary Card */}
              <div className="max-w-md mx-auto rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] p-5 text-left space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(35,31,32,0.08)]">
                  <span className="font-mono text-text-secondary text-xs uppercase">Booking Reference</span>
                  <span className="font-mono font-bold text-foreground text-xs">{confirmedBooking.referenceId}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="block text-text-secondary text-xs">Client Name</span>
                    <span className="font-semibold text-foreground">{confirmedBooking.name}</span>
                  </div>
                  <div>
                    <span className="block text-text-secondary text-xs">Phone</span>
                    <span className="font-mono font-semibold text-foreground">{confirmedBooking.phone}</span>
                  </div>
                </div>

                {confirmedBooking.businessName && confirmedBooking.businessName !== "N/A" && (
                  <div>
                    <span className="block text-text-secondary text-xs">Business / Company</span>
                    <span className="font-semibold text-foreground">{confirmedBooking.businessName}</span>
                  </div>
                )}

                <div>
                  <span className="block text-text-secondary text-xs">Service</span>
                  <span className="font-semibold text-accent">{confirmedBooking.service}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[rgba(35,31,32,0.06)]">
                  <div>
                    <span className="block text-text-secondary text-xs">Scheduled Date</span>
                    <span className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      <span>{confirmedBooking.date}</span>
                    </span>
                  </div>
                  <div>
                    <span className="block text-text-secondary text-xs">Time Window</span>
                    <span className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span>{confirmedBooking.timeSlot}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full border border-[rgba(35,31,32,0.15)] bg-white text-xs font-semibold text-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  Book Another Session
                </button>
              </div>
            </div>
          )}

          {/* =========================================================
              ACTIVE APPOINTMENT FORM
              ========================================================= */}
          {status !== "success" && (
            <form
              id="appointment-form"
              onSubmit={handleSubmit}
              className="space-y-6"
              {...({
                toolname: "bookConsultation",
                tooldescription: "Schedule a free 30-minute consultation with DataCrafts founders",
              } as any)}
            >
              {/* Web3Forms Honeypot Anti-Spam */}
              <input
                type="checkbox"
                name="botcheck"
                aria-label="Spam verification honeypot"
                className="hidden"
                style={{ display: "none" }}
              />

              {/* Error Notice */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. Full Name (Required) */}
                <div className="space-y-1.5">
                  <label htmlFor="apt-name" className="text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-accent" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    id="apt-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Aditya Kumar"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(35,31,32,0.14)] text-foreground placeholder:text-text-secondary/50 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                  />
                </div>

                {/* 2. Phone / WhatsApp Number (Required, 10-digit Indian mobile) */}
                <div className="space-y-1.5">
                  <label htmlFor="apt-phone" className="text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    <span>Phone / WhatsApp Number *</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-xs font-mono font-bold text-text-secondary select-none">
                      +91
                    </span>
                    <input
                      id="apt-phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="88658 04386"
                      maxLength={14}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-[rgba(35,31,32,0.14)] text-foreground placeholder:text-text-secondary/50 text-sm font-mono focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                    />
                  </div>
                  <span className="text-[11px] text-text-secondary block">
                    10-digit Indian mobile number for instant WhatsApp slot confirmation.
                  </span>
                </div>

                {/* 3. Business / Company Name (Optional) */}
                <div className="space-y-1.5">
                  <label htmlFor="apt-business" className="text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-accent" />
                    <span>Business / Company Name <span className="text-text-secondary/60 lowercase font-normal">(optional)</span></span>
                  </label>
                  <input
                    id="apt-business"
                    name="business"
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Acme Technologies / Retail Brand"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(35,31,32,0.14)] text-foreground placeholder:text-text-secondary/50 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                  />
                </div>

                {/* 4. Service Needed (Required Dropdown) */}
                <div className="space-y-1.5">
                  <label htmlFor="apt-service" className="text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-accent" />
                    <span>Service Needed *</span>
                  </label>
                  <select
                    id="apt-service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(35,31,32,0.14)] text-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all cursor-pointer"
                  >
                    {SERVICES_OPTIONS.map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Preferred Date (Date Picker, disable past dates) */}
                <div className="space-y-1.5">
                  <label htmlFor="apt-date" className="text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>Preferred Date *</span>
                  </label>
                  <input
                    id="apt-date"
                    name="date"
                    type="date"
                    required
                    min={todayStr}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(35,31,32,0.14)] text-foreground text-sm font-mono focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all cursor-pointer"
                  />
                </div>

                {/* 6. Preferred Time Slot (Dropdown) */}
                <div className="space-y-1.5">
                  <label htmlFor="apt-slot" className="text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span>Preferred Time Slot *</span>
                  </label>
                  <select
                    id="apt-slot"
                    name="timeSlot"
                    required
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(35,31,32,0.14)] text-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all cursor-pointer"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 7. Project Brief / Notes (Optional Textarea) */}
              <div className="space-y-1.5">
                <label htmlFor="apt-notes" className="text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  <span>Project Brief / Notes <span className="text-text-secondary/60 lowercase font-normal">(optional)</span></span>
                </label>
                <textarea
                  id="apt-notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share a short summary of your project idea, current bottlenecks, or desired launch date..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(35,31,32,0.14)] text-foreground placeholder:text-text-secondary/50 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-hover active:scale-[0.99] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming your slot...</span>
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="w-4 h-4" />
                      <span>Confirm Consultation Slot</span>
                    </>
                  )}
                </button>
                <p className="text-xs text-text-secondary mt-3">
                  🔒 No redirect to third-party apps. Instant WhatsApp notification is dispatched directly from our server to the founder team.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
