"use client";

import React, { useActionState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { sendContactInquiry } from "@/app/actions/contact";

const EVENT_TYPES = [
  { label: "Morning Flute Residency", value: "Morning Flute Residency" },
  { label: "Sunset Lounge Residency", value: "Sunset Lounge Residency" },
  { label: "Brunch Vocal & Flute", value: "Brunch Vocal & Flute" },
  { label: "Dinner Vocal / Ghazals", value: "Dinner Vocal / Ghazals" },
  { label: "Full Day Residency Package", value: "Full Day Residency Package" },
  { label: "Destination Wedding Performance", value: "Destination Wedding Performance" },
  { label: "Corporate Event Performance", value: "Corporate Event Performance" },
];

// Map incoming program names to our dropdown values
const getMatchedProgram = (param: string | null) => {
  if (!param) return "";
  const normalized = param.toLowerCase();
  if (normalized.includes("morning") || normalized.includes("ambience")) {
    return "Morning Flute Residency";
  }
  if (normalized.includes("sunset") || normalized.includes("lounge")) {
    return "Sunset Lounge Residency";
  }
  if (normalized.includes("brunch")) {
    return "Brunch Vocal & Flute";
  }
  if (normalized.includes("dinner") || normalized.includes("ghazal") || normalized.includes("dining")) {
    return "Dinner Vocal / Ghazals";
  }
  if (normalized.includes("residency") || normalized.includes("full day")) {
    return "Full Day Residency Package";
  }
  if (normalized.includes("wedding")) {
    return "Destination Wedding Performance";
  }
  if (normalized.includes("corporate")) {
    return "Corporate Event Performance";
  }
  return "";
};

function ContactFormContent() {
  const searchParams = useSearchParams();
  const programParam = searchParams.get("program");
  const defaultProgram = getMatchedProgram(programParam);

  const [state, formAction, isPending] = useActionState(sendContactInquiry, null);

  return (
    <main className="min-h-screen bg-background text-foreground py-20">
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-16">
        
        <Reveal>
          <SectionHeader
            tagline="Inquire for bookings"
            title="Contact Hrithik"
            subtitle="Let's curate a premium musical experience tailored for your property or landmark celebration."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Booking information & direct links */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal delay={0.1}>
              <div className="space-y-6 bg-secondary-bg/25 border border-border p-8 rounded-2xl">
                <h3 className="font-serif-display text-2xl font-medium tracking-wide">
                  Direct Inquiries
                </h3>
                <p className="text-sm font-sans text-foreground/75 leading-relaxed font-light">
                  For urgent residency discussions, rate sheets, or customized booking configurations, connect directly via email or WhatsApp.
                </p>
                <div className="space-y-4 pt-4 text-sm font-sans">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-gold-dark font-bold mb-1">
                      Email address
                    </span>
                    <a href="mailto:inquiries@hrithikvirendra.com" className="hover:text-gold transition-colors duration-300 font-medium">
                      inquiries@hrithikvirendra.com
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-gold-dark font-bold mb-1">
                      WhatsApp Booking
                    </span>
                    <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors duration-300 font-medium">
                      +91 99999 99999
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Lead Generation Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <form action={formAction} className="space-y-6">
                
                {/* Global Success / Failure Banners */}
                {state?.success && (
                  <div className="p-4 bg-gold/10 border border-gold text-gold-dark text-sm rounded-lg font-sans">
                    {state.message}
                  </div>
                )}
                {state?.success === false && state.message && !state.errors && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg font-sans">
                    {state.message}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest text-foreground/75 font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Hrithik Mishra"
                      className="bg-secondary-bg/20 border border-border/60 px-4 py-3 rounded-lg text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                    {state?.errors?.name && (
                      <p className="text-red-500 text-xs font-sans mt-1">{state.errors.name[0]}</p>
                    )}
                  </div>

                  {/* Hotel / Venue field */}
                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="hotelVenue" className="text-xs uppercase tracking-widest text-foreground/75 font-semibold">
                      Hotel / Venue Name
                    </label>
                    <input
                      type="text"
                      id="hotelVenue"
                      name="hotelVenue"
                      required
                      placeholder="e.g. Taj Lands End"
                      className="bg-secondary-bg/20 border border-border/60 px-4 py-3 rounded-lg text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                    {state?.errors?.hotelVenue && (
                      <p className="text-red-500 text-xs font-sans mt-1">{state.errors.hotelVenue[0]}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email field */}
                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-foreground/75 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g. contact@hotel.com"
                      className="bg-secondary-bg/20 border border-border/60 px-4 py-3 rounded-lg text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                    {state?.errors?.email && (
                      <p className="text-red-500 text-xs font-sans mt-1">{state.errors.email[0]}</p>
                    )}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="phone" className="text-xs uppercase tracking-widest text-foreground/75 font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="e.g. +91 99999 99999"
                      className="bg-secondary-bg/20 border border-border/60 px-4 py-3 rounded-lg text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                    {state?.errors?.phone && (
                      <p className="text-red-500 text-xs font-sans mt-1">{state.errors.phone[0]}</p>
                    )}
                  </div>
                </div>

                {/* Event Type selector */}
                <div className="space-y-2 flex flex-col">
                  <label htmlFor="eventType" className="text-xs uppercase tracking-widest text-foreground/75 font-semibold">
                    Inquiry Type / Program
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    defaultValue={defaultProgram}
                    className="bg-secondary-bg/20 border border-border/60 px-4 py-3 rounded-lg text-sm focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer text-foreground"
                  >
                    <option value="" disabled>Select performance type...</option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type.value} value={type.value} className="text-foreground bg-background">
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {state?.errors?.eventType && (
                    <p className="text-red-500 text-xs font-sans mt-1">{state.errors.eventType[0]}</p>
                  )}
                </div>

                {/* Message text area */}
                <div className="space-y-2 flex flex-col">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-foreground/75 font-semibold">
                    Inquiry Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe dates, expected guest count, venue type, and specific performance schedules..."
                    className="bg-secondary-bg/20 border border-border/60 px-4 py-3 rounded-lg text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                  {state?.errors?.message && (
                    <p className="text-red-500 text-xs font-sans mt-1">{state.errors.message[0]}</p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isPending}
                    className="w-full sm:w-auto min-w-[200px]"
                  >
                    {isPending ? "Sending Inquiry..." : "Send Inquiry"}
                  </Button>
                </div>

              </form>
            </Reveal>
          </div>

        </div>

      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-foreground/50 font-sans text-sm">Loading booking form...</div>}>
      <ContactFormContent />
    </Suspense>
  );
}

