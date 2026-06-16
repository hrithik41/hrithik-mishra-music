"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/animations/reveal";

const CATEGORIES = [
  { label: "All Moments", value: "all" },
  { label: "Flute Performances", value: "flute" },
  { label: "Live Singing", value: "singing" },
  { label: "Hospitality venues", value: "hospitality" },
  { label: "Destination Weddings", value: "weddings" },
  { label: "Corporate Events", value: "corporate" },
];

const GALLERY_ITEMS = [
  { id: 1, title: "Morning flute session, Taj Lands End", category: "flute", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800" },
  { id: 2, title: "Lobby performance at Taj Santacruz", category: "hospitality", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800" },
  { id: 3, title: "Live Retro Singing, Marriott Brunch", category: "singing", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800" },
  { id: 4, title: "Wedding entry procession flutes", category: "weddings", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800" },
  { id: 5, title: "Luxury corporate gala guest entertainment", category: "corporate", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800" },
  { id: 6, title: "Evening flute lounge set at Oberoi Resorts", category: "hospitality", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800" },
  { id: 7, title: "Sufi and Acoustic singing night", category: "singing", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800" },
  { id: 8, title: "Classical flute wellness session, Aman Resorts", category: "flute", image: "https://images.unsplash.com/photo-1571330735066-03add07b4178?q=80&w=800" },
];

export function GalleryClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string | null>(null);

  const filteredItems = activeFilter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <main className="min-h-screen bg-background text-foreground py-20">
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-16">
        
        <Reveal>
          <SectionHeader
            tagline="Moments in Music"
            title="The Gallery"
            subtitle="Visual glimpses of live flute instrumentals, acoustic vocal performances, and guest interactions across India's premium hotels."
          />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 border-b border-border/40 pb-8">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveFilter(cat.value)}
                  className={`font-sans text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? "bg-gold text-background border-gold"
                      : "border-border/60 hover:border-gold-dark hover:text-gold-dark"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                key={item.id}
                onClick={() => {
                  setLightboxImage(item.image);
                  setLightboxTitle(item.title);
                }}
                className="relative break-inside-avoid overflow-hidden rounded-xl bg-dark-bg cursor-zoom-in group border border-border/10 shadow-sm"
              >
                <div className="relative w-full h-auto min-h-[200px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                    <p className="font-serif-display text-white text-base tracking-wide leading-snug">
                      {item.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col justify-center items-center p-6 cursor-zoom-out"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 focus:outline-none"
              aria-label="Close Lightbox"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt={lightboxTitle || "Lightbox item"}
                className="max-w-full max-h-full object-contain rounded border border-white/5"
              />
            </motion.div>

            {lightboxTitle && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-6 text-center max-w-2xl"
              >
                <p className="font-serif-display text-lg text-white tracking-wide">
                  {lightboxTitle}
                </p>
                <p className="font-sans text-xs tracking-widest text-gold uppercase mt-1">
                  {activeFilter !== "all" ? activeFilter : "Featured Presentation"}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
