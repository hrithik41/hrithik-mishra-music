"use client";

import React from "react";
import { FadeIn } from "@/components/animations/fade-in";

export interface StatItem {
  value: string;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode; // For hardcoded fallback
  svgPath?: string; // For Sanity data
}

const STATS_ITEMS: StatItem[] = [
  {
    value: "8+",
    label: "Years of",
    subLabel: "Flute Performance",
    icon: (
      <svg className="w-6 h-6 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2Zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2ZM9 10l12-3" />
      </svg>
    ),
  },
  {
    value: "5+",
    label: "Years of",
    subLabel: "Live Singing",
    icon: (
      <svg className="w-6 h-6 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3Z" />
      </svg>
    ),
  },
  {
    value: "100+",
    label: "Luxury Events &",
    subLabel: "Performances",
    icon: (
      <svg className="w-6 h-6 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0Zm6 3a2 2 0 11-4 0 2 2 0 014 0ZM7 10a2 2 0 11-4 0 2 2 0 014 0Z" />
      </svg>
    ),
  },
  {
    value: "3+",
    label: "Taj Hospitality",
    subLabel: "Engagements",
    icon: (
      <svg className="w-6 h-6 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export const Stats = ({ stats }: { stats?: StatItem[] }) => {
  const displayStats = stats && stats.length > 0 ? stats : STATS_ITEMS;

  return (
    <section className="w-full h-auto md:h-[15vh] min-h-[140px] flex items-center relative z-10 bg-background md:bg-secondary-bg/40 pt-10 pb-12 md:py-0 border-y border-border/40">
      <FadeIn duration={0.8}>
        {/* Mobile: 2x2 grid. Desktop: 4 columns. */}
        <div className="w-full h-full px-2 md:px-12 lg:px-16 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-0 md:gap-0 lg:divide-x divide-border/50 items-center">
          {displayStats.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 py-2 border-border/30 h-full w-full ${
                // On mobile (2x2 grid): Add vertical borders between columns and horizontal borders between rows
                idx % 2 === 0 ? "border-r border-border/50 lg:border-r-0" : ""
              }`}
            >
              {/* Mini Icon Container (Raw icon on mobile, circular background on desktop) */}
              <div className="shrink-0 md:p-4 md:bg-background md:rounded-full md:shadow-sm md:border md:border-border/20">
                {item.svgPath ? (
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.svgPath} />
                  </svg>
                ) : (
                  React.isValidElement(item.icon) 
                    ? React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-6 h-6 md:w-8 md:h-8 text-gold-dark" }) 
                    : item.icon
                )}
              </div>

              {/* Numerical stats (Centered on mobile, left-aligned on desktop) */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="font-serif-display text-4xl md:text-5xl font-semibold text-foreground tracking-tight leading-none">
                  {item.value}
                </span>
                <span className="font-sans text-[11px] md:text-sm tracking-widest md:uppercase text-foreground/70 md:text-foreground/50 mt-1 md:mt-1.5 font-medium md:font-bold">
                  {item.label}
                </span>
                <span className="font-sans text-[11px] md:text-base tracking-wider text-foreground/90 md:text-foreground/80 mt-0 md:mt-0.5">
                  {item.subLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
};
