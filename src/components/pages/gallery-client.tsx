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

export interface GalleryItemType {
    _id: string;
    title: string;
    category: string;
    image: string;
}

interface GalleryClientProps {
    tagline?: string;
    title?: string;
    subtitle?: string;
    items?: GalleryItemType[];
    categories?: { label: string; value: string }[];
}

export function GalleryClient({
    tagline = "Moments in Music",
    title = "The Gallery",
    subtitle = "Visual glimpses of live flute instrumentals, acoustic vocal performances, and guest interactions across India's premium hotels.",
    items,
    categories
}: GalleryClientProps) {
    const [activeFilter, setActiveFilter] = useState("all");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Provide fallback so it doesn't break if no items are passed/found
    const renderItems = items && items.length > 0 ? items : GALLERY_ITEMS.map(i => ({ ...i, _id: i.id.toString() }));

    const filteredItems = activeFilter === "all"
        ? renderItems
        : renderItems.filter((item) => item.category === activeFilter);

    // Filter categories to only include those that have at least one image uploaded
    const availableCategoryValues = new Set(renderItems.map(item => item.category));
    const rawCategories = categories && categories.length > 0 ? categories : CATEGORIES.slice(1); // slice(1) to remove hardcoded "All Moments" so we can add it safely
    const dynamicCategories = [
        { label: "All Moments", value: "all" },
        ...rawCategories.filter(cat => availableCategoryValues.has(cat.value))
    ];

    return (
        <section className="bg-background text-foreground pt-14 pb-12 md:pb-16 w-full overflow-x-hidden">
            <div className="w-full space-y-10 md:space-y-12">

                <div className="px-6 md:px-12 lg:px-16">
                    <Reveal>
                        <SectionHeader
                            tagline={tagline}
                            title={title}
                            subtitle={subtitle}
                        />
                    </Reveal>
                </div>

                <Reveal delay={0.2}>
                    <div className="px-6 md:px-12 lg:px-16">
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4 border-b border-border/40 pb-8">
                        {dynamicCategories.map((cat) => {
                            const isActive = activeFilter === cat.value;
                            return (
                                <button
                                    key={cat.value}
                                    onClick={() => setActiveFilter(cat.value)}
                                    className={`font-sans text-[10px] md:text-xs tracking-widest uppercase px-4 md:px-5 py-2 md:py-2.5 transition-all duration-300 border cursor-pointer ${isActive
                                            ? "bg-gold text-background border-gold"
                                            : "border-border/60 hover:border-gold-dark hover:text-gold-dark"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                        </div>
                    </div>
                </Reveal>

                {/* Full screen Pinterest-like Masonry Grid */}
                <div className="w-full px-2 sm:px-6 md:px-12 lg:px-16">
                    <div className="h-full md:h-[1100px] overflow-y-auto custom-scrollbar pr-2 pb-4">
                        <div className="columns-2 md:columns-3 xl:columns-4 gap-2 md:gap-4 space-y-2 md:space-y-4">
                            <AnimatePresence mode="popLayout">
                            {filteredItems.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                key={item._id}
                                onClick={() => setLightboxIndex(filteredItems.findIndex(i => i._id === item._id))}
                                className="relative break-inside-avoid overflow-hidden rounded-xl bg-dark-bg cursor-zoom-in group border border-border/10 shadow-sm"
                            >
                                <div className="relative w-full h-auto">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
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
            </div>
            </div>

            <AnimatePresence>
                {lightboxIndex !== null && filteredItems[lightboxIndex] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxIndex(null)}
                        className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex flex-col justify-center items-center p-4 md:p-6 cursor-zoom-out"
                    >
                        <button
                            onClick={() => setLightboxIndex(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white p-2 focus:outline-none z-50 bg-black/20 rounded-full"
                            aria-label="Close Lightbox"
                        >
                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Prev Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
                            }}
                            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 md:p-4 focus:outline-none z-50 bg-black/20 hover:bg-black/50 rounded-full transition-all"
                            aria-label="Previous Image"
                        >
                            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxIndex(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
                            }}
                            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 md:p-4 focus:outline-none z-50 bg-black/20 hover:bg-black/50 rounded-full transition-all"
                            aria-label="Next Image"
                        >
                            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <motion.div
                            key={lightboxIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="relative max-w-5xl max-h-[75vh] md:max-h-[85vh] w-full h-full flex items-center justify-center touch-pan-y"
                            onClick={(e) => e.stopPropagation()}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.7}
                            onDragEnd={(e, { offset }) => {
                                const swipe = offset.x;
                                if (swipe < -50) {
                                    setLightboxIndex(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
                                } else if (swipe > 50) {
                                    setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
                                }
                            }}
                        >
                            <img
                                src={filteredItems[lightboxIndex].image}
                                alt={filteredItems[lightboxIndex].title || "Lightbox item"}
                                className="max-w-full max-h-full object-contain rounded-md shadow-2xl pointer-events-none select-none"
                                draggable={false}
                            />
                        </motion.div>

                        {filteredItems[lightboxIndex].title && (
                            <motion.div
                                key={`title-${lightboxIndex}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="absolute bottom-6 md:bottom-10 left-0 right-0 px-12 text-center z-50 pointer-events-none"
                            >
                                <p className="font-serif-display text-base md:text-xl text-white tracking-wide drop-shadow-md">
                                    {filteredItems[lightboxIndex].title}
                                </p>
                                <p className="font-sans text-[10px] md:text-xs tracking-widest text-gold uppercase mt-2 drop-shadow-md">
                                    {lightboxIndex + 1} / {filteredItems.length}
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
