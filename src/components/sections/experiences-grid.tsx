"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";

// Icons matching the mockup
const FluteIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15M6.75 17.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75-.75.336-.75.75.336.75.75.75zm3-3c.414 0 .75-.336.75-.75s-.336-.75-.75-.75-.75.336-.75.75.336.75.75.75zm3-3c.414 0 .75-.336.75-.75s-.336-.75-.75-.75-.75.336-.75.75.336.75.75.75zm3-3c.414 0 .75-.336.75-.75s-.336-.75-.75-.75-.75.336-.75.75.336.75.75.75z" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.59 1.59m12.38 12.38l1.59 1.59M3 12h2.25m13.5 0H21M4.22 19.78l1.59-1.59M17.66 6.34l1.59-1.59M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
  </svg>
);

const MicIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
);

const ClocheIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 19.5h16.5M12 3.75a.75.75 0 01.75.75v1.5a6.75 6.75 0 016.712 6H4.538a6.75 6.75 0 016.712-6V4.5a.75.75 0 01.75-.75z" />
  </svg>
);

const EXPERIENCES = [
  {
    id: "morning",
    title: "Morning Ambience",
    subtitle: "LIVE FLUTE INSTRUMENTALS",
    icon: <FluteIcon />,
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800",
    bullets: ["Breakfast Experiences", "Wellness Sessions", "Poolside | Courtyard"],
  },
  {
    id: "sunset",
    title: "Sunset Sessions",
    subtitle: "INSTRUMENTAL LOUNGE",
    icon: <SunIcon />,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
    bullets: ["Heritage Properties", "Luxury Resorts", "Guest Lounges"],
  },
  {
    id: "brunch",
    title: "Brunch Entertainment",
    subtitle: "LIVE SINGING",
    icon: <MicIcon />,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800",
    bullets: ["Bollywood", "Retro", "Acoustic | Contemporary"],
  },
  {
    id: "dinner",
    title: "Dinner Experiences",
    subtitle: "LIVE VOCAL PERFORMANCES",
    icon: <ClocheIcon />,
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800",
    bullets: ["Romantic | Lounge", "Premium Dining", "Special Occasions"],
  },
];

export const ExperiencesGrid = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-16 py-24 space-y-12">
      
      {/* Editorial Header Section */}
      <div className="text-center space-y-4">
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold font-bold block">
          CURATED MUSICAL EXPERIENCES
        </span>
        <h2 className="font-serif-display text-4xl sm:text-5xl font-light tracking-wide text-foreground">
          Performance Experiences
        </h2>
        {/* Elegant dividing line with centered diamond accent */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="h-1px w-12 bg-gold/50" />
          <div className="w-1.5 h-1.5 rotate-45 border border-gold bg-gold" />
          <div className="h-1px w-12 bg-gold/50" />
        </div>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        {EXPERIENCES.map((exp, idx) => (
          <Reveal key={exp.id} delay={idx * 0.1} yOffset={30}>
            <div className="flex flex-col rounded-2xl border border-border/60 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 h-full">
              
              {/* Top Image Section */}
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />

                {/* Overlapping Gold Icon Badge */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full bg-gold border-[3px] border-white flex items-center justify-center shadow-md z-10">
                  {exp.icon}
                </div>
              </div>

              {/* Bottom Text Content Section */}
              <div className="pt-9 pb-8 px-6 flex flex-col items-center flex-1 justify-between">
                <div className="space-y-1.5 text-center w-full">
                  <h3 className="font-serif-display text-xl font-medium tracking-wide text-foreground">
                    {exp.title}
                  </h3>
                  <span className="font-sans text-[9px] tracking-widest text-gold-dark font-bold uppercase block">
                    {exp.subtitle}
                  </span>

                  {/* Centered bullet list */}
                  <div className="pt-4 flex justify-center w-full">
                    <ul className="text-left font-sans text-xs text-foreground/75 leading-relaxed font-light space-y-1">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-1.5">
                          <span className="text-gold-dark font-bold">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Inquiry Link */}
                <div className="pt-8 w-full">
                  <Link href={`/contact?program=${encodeURIComponent(exp.title)}`}>
                    <Button variant="outline" className="w-full text-xs py-2 hover:bg-gold hover:text-white hover:border-gold transition-colors duration-300">
                      Inquire Details
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
