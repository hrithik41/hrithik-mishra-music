"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { Reveal } from "@/components/animations/reveal";

export const Hero = () => {
    return (
        <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-dark-bg text-background">

            {/* Background Cinematic Image - Swap out with your path, e.g., '/assets/hero-artist.jpg' */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 hover:scale-105"
                style={{
                    backgroundImage: `url('/assets/hero-artist.jpg')`,
                }}
            />

            {/* Dark gradient overlay to ensure luxury gold/white text is highly legible */}
            <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-transparent" />

            {/* Grid margin aligning content with navbar */}
            <div className="relative h-full w-full px-6 md:px-12 lg:px-16 flex items-center">
                <div className="max-w-2xl space-y-8">

                    <FadeIn duration={1.0}>
                        <div className="space-y-4">
                            <span className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase text-gold font-bold block">
                                Professional Flautist & Vocalist
                            </span>

                            <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-[1.15] text-white">
                                Hrithik <br />
                                <span className="font-serif-display italic font-normal text-gold-hover">Virendra Mishra</span>
                            </h1>
                        </div>
                    </FadeIn>

                    <Reveal delay={0.4} yOffset={20}>
                        <p className="font-serif-quote italic text-xl sm:text-2xl text-background/80 max-w-lg leading-relaxed">
                            Creating memorable guest experiences through live music at heritage hotels and resorts.
                        </p>
                    </Reveal>

                    <Reveal delay={0.6} yOffset={20}>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Button variant="primary" size="md">
                                Watch Performance
                            </Button>
                            <Button variant="secondary" size="md" className="border-white text-white hover:bg-white/10">
                                Download Portfolio
                            </Button>
                        </div>
                    </Reveal>

                </div>
            </div>
        </section>
    );
};
