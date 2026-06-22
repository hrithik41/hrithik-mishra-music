import React from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";

export const metadata = {
  title: "Performance Experiences | Hrithik Virendra Mishra",
  description: "Explore performance packages and residencies tailored for luxury properties—from serene morning flutes to premium dinner vocals.",
};

const FALLBACK_EXPERIENCES = [
  {
    _id: "m1",
    title: "Morning Ambience Session",
    category: "morning",
    description: "Gentle, meditative classical flute raga compositions designed for morning yoga, guest breakfast lawns, or spa arrivals.",
    tags: ["Acoustic Bansuri", "Meditation", "Serene Timelines"],
    imageUrl: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800",
  },
  {
    _id: "s2",
    title: "Sunset Lounge Set",
    category: "sunset",
    description: "A combination of ambient flute instrumentation and live acoustic guitar-backed covers of Sufi, retro, and lounge melodies.",
    tags: ["Fusion Flute", "Sunset Tea", "Chilled Lounge"],
    imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800",
  },
  {
    _id: "b3",
    title: "Brunch Entertainment",
    category: "brunch",
    description: "High-energy alternating sets of live retro Bollywood vocals, acoustic pop songs, and upbeat flute instrumentals for brunch crowds.",
    tags: ["Live Vocals", "Retro Covers", "High Energy"],
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800",
  },
  {
    _id: "d4",
    title: "Fine Dining Dinner Experience",
    category: "dinner",
    description: "Intimate and sophisticated vocal and flute performance focusing on romantic retro hits, ghazals, and acoustic instrumental themes.",
    tags: ["Warm Vocals", "Ghazals", "Intimate Dinner"],
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800",
  },
];

async function getExperiences() {
  try {
    const data = await client.fetch(
      `*[_type == "experience"] | order(orderRank asc) {
        _id,
        title,
        location,
        previewText,
        highlights,
        coverImage,
        "slug": slug.current
      }`,
      {},
      { next: { revalidate: 3600 } }
    );
    return data;
  } catch (error) {
    console.error("Sanity fetch failed, using fallback data:", error);
    return [];
  }
}

export default async function ExperiencesPage() {
  const sanityExperiences = await getExperiences();

  // Map Sanity documents into our layout shape, fallback if empty
  const experiences = sanityExperiences.length > 0 
    ? sanityExperiences.map((exp: any) => ({
        _id: exp._id,
        slug: exp.slug,
        title: exp.title,
        category: exp.location || "Signature Performance",
        description: exp.previewText || "",
        tags: exp.highlights || [],
        imageUrl: exp.coverImage ? urlFor(exp.coverImage).url() : "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800"
      }))
    : FALLBACK_EXPERIENCES;

  return (
    <main className="min-h-screen bg-background text-foreground py-20">
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-16">
        
        {/* Page Header */}
        <Reveal>
          <SectionHeader
            tagline="Curated Atmospheres"
            title="Performance Experiences"
            subtitle="Explore signature musical timelines tailored to raise guest satisfaction scores and add an acoustic signature to luxury spaces."
          />
        </Reveal>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {experiences.map((exp: any, idx: number) => {
            const label = exp.category;
            
            // Build detailed page URL (fallback to _id if slug isn't generated yet)
            const detailUrl = `/experiences/${exp.slug || exp._id}`;

            return (
              <Reveal key={exp._id} delay={idx * 0.1} yOffset={30}>
                <Link href={detailUrl} className="block h-full cursor-pointer">
                  <div className="h-full flex flex-col justify-between rounded-2xl border border-border/40 overflow-hidden bg-secondary-bg/25 group hover:border-gold/30 hover:bg-secondary-bg/40 transition-all duration-500 shadow-sm">
                  
                  {/* Aspect Ratio Image with zoom effect */}
                  <div className="relative aspect-16/10 w-full overflow-hidden border-b border-border/20">
                    <img
                      src={exp.imageUrl}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-80" />
                    
                    {/* Absolute Label Overlay */}
                    <span className="absolute top-4 left-4 font-sans text-[9px] tracking-widest uppercase bg-background text-foreground px-3 py-1.5 rounded-full border border-border/30 font-bold">
                      {label}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag: string, tIdx: number) => (
                          <span 
                            key={tIdx} 
                            className="font-sans text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full border border-border/50 text-foreground/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-serif-display text-2xl font-medium tracking-wide">
                        {exp.title}
                      </h3>

                      <p className="font-sans text-sm text-foreground/75 leading-relaxed font-light">
                        {exp.description}
                      </p>
                    </div>

                    {/* Action button */}
                    <div className="pt-4">
                      <Button variant="outline" className="w-full text-xs font-semibold group-hover:bg-gold group-hover:text-background group-hover:border-gold transition-colors duration-300">
                        View Detailed Experience
                      </Button>
                    </div>
                  </div>

                </div>
              </Link>
              </Reveal>
            );
          })}
        </div>

      </div>
    </main>
  );
}
