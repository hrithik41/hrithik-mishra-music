"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { Reveal } from "@/components/animations/reveal";

export interface HeroProps {
  heroTitle?: string;
  heroSubtitle?: string;
  heroBackgroundImages?: string[];
  heroBackgroundImagesMobile?: string[];
}

export const Hero = ({ heroTitle, heroSubtitle, heroBackgroundImages, heroBackgroundImagesMobile }: HeroProps) => {
    // We split the title by newline if provided, otherwise fallback to the highly styled Hrithik Virendra Mishra
    const titleLines = heroTitle ? heroTitle.split('\n') : null;
    const desktopImages = (heroBackgroundImages && heroBackgroundImages.length > 0) 
        ? heroBackgroundImages 
        : ['/assets/hero-artist.jpg'];

    const mobileImages = (heroBackgroundImagesMobile && heroBackgroundImagesMobile.length > 0)
        ? heroBackgroundImagesMobile
        : desktopImages; // fallback to desktop if mobile is empty

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prev) => prev + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative -mt-20 h-screen min-h-[600px] w-full overflow-hidden bg-dark-bg text-background">
            {/* Background Cinematic Images Carousel (Desktop) */}
            <div className="hidden md:block absolute inset-0">
                {desktopImages.map((img, index) => (
                    <div
                        key={img}
                        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
                            index === (counter % desktopImages.length) ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                        }`}
                        style={{
                            backgroundImage: `url('${img}')`,
                        }}
                    />
                ))}
            </div>

            {/* Background Cinematic Images Carousel (Mobile) */}
            <div className="block md:hidden absolute inset-0">
                {mobileImages.map((img, index) => (
                    <div
                        key={img}
                        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
                            index === (counter % mobileImages.length) ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                        }`}
                        style={{
                            backgroundImage: `url('${img}')`,
                        }}
                    />
                ))}
            </div>

            {/* Dark gradient overlay to ensure luxury gold/white text is highly legible */}
            <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-transparent" />

            {/* Grid margin aligning content with navbar */}
            <div className="relative h-full w-full px-6 md:px-12 lg:px-16 flex items-center">
                <div className="max-w-2xl space-y-8">

                    <FadeIn duration={1.0}>
                        <div className="space-y-4">
                            <span className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase text-gold font-bold block">
                                PROFESSIONAL FLAUTIST & VOCALIST
                            </span>

                            {titleLines ? (
                                <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-[1.15] text-white">
                                    {titleLines[0]} <br />
                                    {titleLines[1] && <span className="font-serif-display italic font-normal text-gold-hover">{titleLines.slice(1).join('\n')}</span>}
                                </h1>
                            ) : (
                                <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-[1.15] text-white">
                                    Hrithik <br />
                                    <span className="font-serif-display italic font-normal text-gold-hover">Virendra Mishra</span>
                                </h1>
                            )}
                        </div>
                    </FadeIn>

                    <Reveal delay={0.4} yOffset={20}>
                        <p className="font-serif-quote italic text-xl sm:text-2xl text-background/80 max-w-lg leading-relaxed whitespace-pre-wrap">
                            {heroSubtitle || "Creating memorable guest experiences through live music."}
                        </p>
                    </Reveal>

                    <Reveal delay={0.6} yOffset={20}>
                        <div className="flex flex-wrap gap-4 pt-2">
                            {/* WATCH PERFORMANCE Button with Play Icon */}
                            <Button variant="primary" size="md" className="flex items-center gap-2 font-sans tracking-wider text-xs font-semibold">
                                <svg className="w-3.5 h-3.5 shrink-0 translate-y-[-0.5px]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                WATCH PERFORMANCE
                            </Button>

                            {/* DOWNLOAD PORTFOLIO Button with Download Icon */}
                            <Button variant="secondary" size="md" className="flex items-center gap-2 border-white text-white hover:bg-white/10 font-sans tracking-wider text-xs font-semibold">
                                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                DOWNLOAD PORTFOLIO
                            </Button>
                        </div>
                    </Reveal>

                </div>
            </div>

            {/* Scroll Indicator in Bottom Left */}
            <div className="absolute bottom-8 left-6 md:left-12 lg:left-16 flex flex-col items-start gap-2 opacity-75">
                <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/85 font-semibold">
                    SCROLL TO EXPLORE
                </span>
                <svg className="w-4 h-4 text-gold animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

        </section>
    );
};
