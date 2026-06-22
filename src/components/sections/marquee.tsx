"use client";

import React from "react";
import { Reveal } from "@/components/animations/reveal";

interface MarqueeProps {
  tagline?: string;
  title?: string;
  logos?: { name: string; logoUrl: string }[];
}

export function MarqueeSection({
  tagline = "TRUSTED BY PREMIUM VENUES",
  title = "Performing at India's Most Luxurious Properties",
  logos = []
}: MarqueeProps) {
  
  // Fallback text logos if no images are provided
  const displayLogos = logos && logos.length > 0 ? logos : [
    { name: "Taj Hotels", logoUrl: "" },
    { name: "The Oberoi Group", logoUrl: "" },
    { name: "Aman Resorts", logoUrl: "" },
    { name: "JW Marriott", logoUrl: "" },
    { name: "ITC Hotels", logoUrl: "" },
    { name: "The Leela", logoUrl: "" }
  ];

  // We duplicate the array to create a seamless infinite loop
  const marqueeItems = [...displayLogos, ...displayLogos, ...displayLogos, ...displayLogos];

  return (
    <section className="w-full pt-12 md:pt-16 pb-4 md:pb-8 overflow-hidden bg-transparent">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-25%); }
        }
        .animate-infinite-marquee {
          display: flex;
          width: 400%;
          animation: marquee 35s linear infinite;
        }
      `}} />
      
      <div className="w-full px-6 md:px-12 lg:px-16 mb-12">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <h4 className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-4">
              {tagline}
            </h4>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground leading-tight">
              {title}
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="w-full relative overflow-hidden flex items-center h-24 mt-8 md:mt-12">
        {/* Fading Edges */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="animate-infinite-marquee">
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="flex-1 flex items-center justify-center px-4 md:px-8">
              {item.logoUrl ? (
                <img 
                  src={item.logoUrl} 
                  alt={item.name} 
                  className="max-h-12 md:max-h-16 max-w-[120px] md:max-w-[180px] object-contain opacity-90 hover:opacity-100 transition-all duration-300" 
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 md:gap-3 text-foreground/40 hover:text-gold transition-colors duration-300 cursor-default group">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gold opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="font-serif-display text-xl md:text-3xl tracking-0.1em uppercase whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
