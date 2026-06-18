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
    <section className="w-full bg-secondary-bg/40 py-12 border-y border-border/40">
      <FadeIn duration={0.8}>
        {/* Divide borders display on desktop view but stack on mobile */}
        <div className="w-full px-6 md:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-border/50">
          {displayStats.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-start lg:justify-center gap-5 py-6 sm:py-4 lg:py-2 first:pt-0 lg:first:pt-2 last:pb-0 lg:last:pb-2 border-border/30"
            >
              {/* Mini Icon Container */}
              <div className="shrink-0 p-3 bg-background rounded-full shadow-sm border border-border/20">
                {item.svgPath ? (
                  <svg className="w-6 h-6 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.svgPath} />
                  </svg>
                ) : (
                  item.icon
                )}
              </div>

              {/* Numerical stats */}
              <div className="flex flex-col">
                <span className="font-serif-display text-3xl md:text-4xl font-semibold text-foreground tracking-tight leading-none">
                  {item.value}
                </span>
                <span className="font-sans text-[10px] tracking-widest uppercase text-foreground/50 mt-1.5 font-bold">
                  {item.label}
                </span>
                <span className="font-sans text-xs tracking-wider text-foreground/80 mt-0.5">
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
