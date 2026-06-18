import React from "react";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/animations/reveal";
import { VideoCard } from "@/components/ui/video-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Performance Videos | Hrithik Virendra Mishra",
  description: "Watch live flute instrumentals, classical woodwind ragas, and acoustic retro vocal sets performed at five-star hotels and luxury resorts.",
};

const VIDEOS = [
  {
    videoId: "jgpJVI3tDbY", // Standard high-quality music/instrumental video ID
    title: "Morning Raga & Wellness Flute Session",
    category: "Flute / Classical",
    description: "Filmed live at morning sunrise, featuring meditative classical Indian ragas designed for courtyard and spa environments.",
  },
  {
    videoId: "L3wK3vT5dgY",
    title: "Sunset Lounge & Contemporary Covers",
    category: "Instrumental / Ambient",
    description: "A blend of traditional woodwinds with modern ambient backing tracks, performing soft covers of global pop and Sufi ballads.",
  },
  {
    videoId: "hHW1oY26kxQ",
    title: "Live Acoustic Singing - Bollywood Retro Set",
    category: "Vocal & Flute",
    description: "An alternating performance of soulful retro vocals and flute covers, suitable for premium brunch layouts and dinner lounges.",
  },
  {
    videoId: "K3gVd_xN1QY",
    title: "Destination Wedding Royal Entry Procession",
    category: "Event Special",
    description: "A grand, high-energy live performance welcoming guests and leading key processions at heritage palace hotels.",
  },
];

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-20">
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-16">
        
        {/* Header */}
        <Reveal>
          <SectionHeader
            tagline="Live Performances"
            title="Featured Videos"
            subtitle="Explore video excerpts of live flute instrumentals and acoustic vocals filmed at leading Indian hospitality venues."
          />
        </Reveal>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {VIDEOS.map((video, idx) => (
            <Reveal key={video.videoId} delay={idx * 0.15} yOffset={30}>
              <div className="space-y-4">
                <VideoCard
                  videoId={video.videoId}
                  title={video.title}
                  category={video.category}
                  description={video.description}
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Note on Custom Auditions */}
        <Reveal yOffset={20}>
          <div className="bg-secondary-bg/25 border border-border/40 p-8 rounded-2xl text-center space-y-6 mt-12">
            <h3 className="font-serif-display text-xl md:text-2xl font-medium tracking-wide">
              Request a Custom Audition / Private Stream
            </h3>
            <p className="font-sans text-sm text-foreground/75 leading-relaxed font-light">
              Are you looking for a specific musical arrangement or setlist for your property? We can provide unreleased full-length performance recordings, audio rate sheets, or jump on a live video preview.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button variant="primary" size="md">
                  Inquire for Bookings
                </Button>
              </Link>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="md">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </main>
  );
}
