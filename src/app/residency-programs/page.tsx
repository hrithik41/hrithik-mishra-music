

import React from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";

export const metadata = {
    title: "Hotel Residency Programs & Proposals | Hrithik Virendra Mishra",
    description: "Explore curated musical timelines for luxury hotels. Download proposals, case studies, and reference letters from Taj Hotels.",
};

const PROGRAMS = [
    {
        name: "Morning Flute Residency",
        duration: "2 Hours Daily",
        focus: "Breakfast Ambience & Wellness",
        description: "Gentle classical raga and wellness flute sets designed to accompany guest yoga, spa sessions, or lawnside morning tea.",
        highlights: ["Muted classical flute ragas", "100% acoustic or soft ambient backing", "Best suited for Courtyards, Gardens & Poolside"],
    },
    {
        name: "Sunset Lounge Residency",
        duration: "1.5 Hours Daily",
        focus: "Sunset High Tea & Lounge Sets",
        description: "Sultry, relaxing instrumental flute covers of contemporary and classic melodies, creating a sophisticated tea/lounge atmosphere.",
        highlights: ["Sufi and Fusion arrangements", "Subtle electronic lounge pads", "Ideal for Verandahs, Bars, and Sunset Decks"],
    },
    {
        name: "Brunch Vocal & Flute",
        duration: "2.5 Hours Set",
        focus: "Weekend Daytime Entertainment",
        description: "Upbeat singing and live flute instrumentals covering Bollywood Retro classics and acoustic pop fusion, elevating high-energy brunches.",
        highlights: ["Acoustic guitar backing tracks", "Vocal & Flute alternating sets", "Ideal for High-End Sunday Brunches & Cafes"],
    },
    {
        name: "Fine Dining Dinner Set",
        duration: "2 Hours Set",
        focus: "Dinner Ambience & Fine Dining",
        description: "Warm, intimate singing sets featuring romantic retro, gazals, and soft lounge music, enhancing the premium dining experience.",
        highlights: ["Warm vocal performance", "Classic, rich love ballads", "Acoustic or piano-backed audio"],
    },
    {
        name: "Full Day Residency Package",
        duration: "Complete Package",
        focus: "Full-Property Integration",
        description: "A comprehensive signature package integrating the artist across multiple hotel touchpoints (Morning Flute, Sunset Lounge, Dinner Vocal).",
        highlights: ["Custom tailored daily schedule", "Vocal and Flute variety", "Commercial discount on long-term contracts"],
        featured: true,
    },
];

export default function ResidencyProgramsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground py-20">

            {/* Upper Section: Programs Grid */}
            <div className="w-full px-6 md:px-12 lg:px-16 space-y-16">

                <Reveal>
                    <SectionHeader
                        tagline="Hotel Partnerships"
                        title="Residency Programs"
                        subtitle="Curated daily musical timelines designed to increase guest satisfaction scores and elevate brand premiumness."
                    />
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROGRAMS.map((prog, idx) => {
                        const isFeatured = prog.featured;
                        return (
                            <Reveal key={idx} delay={idx * 0.1} yOffset={30}>
                                <div
                                    className={`h-full flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 ${isFeatured
                                            ? "bg-dark-bg text-background border-gold/45 shadow-xl scale-102"
                                            : "bg-secondary-bg/25 text-foreground border-border hover:border-gold/30 hover:bg-secondary-bg/40 shadow-sm"
                                        }`}
                                >
                                    <div className="space-y-6">
                                        {/* Header */}
                                        <div className="space-y-2">
                                            <span className={`font-sans text-[10px] tracking-widest uppercase font-semibold block ${isFeatured ? "text-gold" : "text-gold-dark"
                                                }`}>
                                                {prog.focus}
                                            </span>
                                            <h3 className="font-serif-display text-2xl font-medium tracking-wide">
                                                {prog.name}
                                            </h3>
                                            <span className={`font-sans text-xs tracking-wider inline-block px-3 py-1 rounded-full ${isFeatured ? "bg-white/10 text-white" : "bg-foreground/5 text-foreground/80"
                                                }`}>
                                                {prog.duration}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className={`font-sans text-sm leading-relaxed ${isFeatured ? "text-background/80" : "text-foreground/75"
                                            }`}>
                                            {prog.description}
                                        </p>

                                        {/* Divider */}
                                        <div className={`h-1px w-full ${isFeatured ? "bg-white/10" : "bg-border"}`} />

                                        {/* Bullet Highlights */}
                                        <ul className="space-y-2.5">
                                            {prog.highlights.map((highlight, hIdx) => (
                                                <li key={hIdx} className="flex items-start gap-2 text-xs font-sans">
                                                    {/* Checked Vector Icon */}
                                                    <svg className={`w-4 h-4 shrink-0 mt-0.5 ${isFeatured ? "text-gold" : "text-gold-dark"
                                                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className={isFeatured ? "text-background/90" : "text-foreground/85"}>
                                                        {highlight}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-8">
                                        <Link href="/contact">
                                            <Button
                                                variant={isFeatured ? "primary" : "outline"}
                                                className="w-full text-xs font-semibold"
                                            >
                                                Inquire for Dates
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>

            {/* Lower Section: Portfolio PDF Downloads */}
            <div className="w-full bg-secondary-bg/25 border-y border-border/40 py-24 mt-32">
                <div className="w-full px-6 md:px-12 lg:px-16 max-w-4xl mx-auto text-center space-y-8">

                    <Reveal>
                        <div className="space-y-3">
                            <span className="font-sans text-xs tracking-widest uppercase text-gold-dark font-semibold">
                                Commercial Information
                            </span>
                            <h2 className="font-serif-display text-3xl md:text-4xl font-medium tracking-wide">
                                Download Artist Proposal
                            </h2>
                            <p className="font-serif-quote italic text-lg text-foreground/70 max-w-xl mx-auto">
                                Secure immediate access to commercial rates, technical specifications, and hospitality case studies.
                            </p>
                        </div>
                    </Reveal>

                    {/* PDF Download Cards grid */}
                    <Reveal delay={0.2}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 text-left">

                            {/* Proposal PDF card */}
                            <div className="bg-background p-8 rounded-xl border border-border flex flex-col justify-between gap-6 shadow-sm hover:border-gold/30 transition-all">
                                <div className="space-y-2">
                                    <h4 className="font-serif-display text-xl font-medium text-foreground">
                                        Artist Residency Proposal
                                    </h4>
                                    <p className="text-xs text-foreground/60 font-sans leading-relaxed">
                                        Includes detailed performance schedules, artist background bio, venue requirements, and basic commercial tiers.
                                    </p>
                                </div>
                                {/* Simulated file download link */}
                                <a href="#" className="w-fit">
                                    <Button variant="secondary" size="sm" className="text-xs">
                                        Download PDF
                                    </Button>
                                </a>
                            </div>

                            {/* Hospitality Experience Card */}
                            <div className="bg-background p-8 rounded-xl border border-border flex flex-col justify-between gap-6 shadow-sm hover:border-gold/30 transition-all">
                                <div className="space-y-2">
                                    <h4 className="font-serif-display text-xl font-medium text-foreground">
                                        Hospitality Reference Sheet
                                    </h4>
                                    <p className="text-xs text-foreground/60 font-sans leading-relaxed">
                                        Overview of previous hospitality engagements including guest feedback metrics, photo catalog, and reference letters from Taj Hotels.
                                    </p>
                                </div>
                                <a href="#" className="w-fit">
                                    <Button variant="secondary" size="sm" className="text-xs">
                                        Download reference
                                    </Button>
                                </a>
                            </div>

                        </div>
                    </Reveal>

                </div>
            </div>

        </main>
    );
}
