"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { motion, AnimatePresence } from "framer-motion";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Logos
const TajLogo = () => (
  <div className="flex flex-col items-center">
    <span className="text-[10px] text-gold-dark font-serif-display leading-none mb-0.5">❁</span>
    <span className="text-[26px] font-serif-display text-gold-dark tracking-widest leading-none">TAJ</span>
  </div>
);

const GingerLogo = () => (
  <div className="flex flex-col items-center gap-1.5">
    <span className="text-[28px] font-sans font-medium text-gold-dark leading-none">G</span>
    <span className="text-[10px] font-sans text-gold-dark tracking-[0.25em] leading-none">GINGER</span>
  </div>
);

const EXPERIENCES = [
  {
    id: "taj-lands-end",
    logo: "TAJ",
    isTaj: true,
    title: "Taj Lands End",
    subtitle: "MUMBAI",
    description: "Luxury flute residency creating serene ambience and memorable moments for distinguished guests.",
    fullDescription: "Immerse yourself in the soulful melodies of the flute at the iconic Taj Lands End. Our exclusive residency program features ambient morning instrumentals and sophisticated evening performances designed to elevate the luxury guest experience. Set against the stunning backdrop of the Arabian Sea, these curated performances transform the lobby and premium dining areas into a sanctuary of tranquility.",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800",
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800"
    ],
    duration: "02:15",
    bullets: ["Lobby Ambience", "Premium Dining", "Guest Receptions"],
    isFeatured: true
  },
  {
    id: "taj-santacruz",
    logo: "TAJ",
    isTaj: true,
    title: "Taj Santacruz",
    subtitle: "MUMBAI",
    description: "Live music experiences at the lobby and dining venues for elevated guest experiences.",
    fullDescription: "Experience the vibrant energy of live music at Taj Santacruz. Our vocal and acoustic sets are perfectly tailored to complement the bustling, cosmopolitan atmosphere of the hotel. From relaxing evening lounges to upbeat weekend brunches, the performances provide a sophisticated soundtrack that enhances every moment of your stay.",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800",
      "https://images.unsplash.com/photo-1470229722913-7c090b332f79?q=80&w=800"
    ],
    duration: "01:48",
    bullets: ["Evening Lounges", "Live Singing", "Acoustic Sets"],
    isFeatured: false
  },
  {
    id: "ginger-diu",
    logo: "GINGER",
    isTaj: false,
    title: "Ginger Diu",
    subtitle: "DIU",
    description: "Live performances that bring energy and joy to leisure getaways and special evenings.",
    fullDescription: "Bring your leisure getaway to life with vibrant live performances at Ginger Diu. Enjoy upbeat sunset sessions by the pool, lively beachside dinners, and energetic acoustic sets that perfectly match the holiday vibe. It’s the ultimate musical accompaniment for your relaxing beach vacation.",
    image: "https://images.unsplash.com/photo-1470229722913-7c090b332f79?q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1470229722913-7c090b332f79?q=80&w=800",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800",
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800"
    ],
    duration: "01:30",
    bullets: ["Poolside Music", "Upbeat Sessions", "Sunset Views"],
    isFeatured: false
  },
  {
    id: "taj-mahal-palace",
    logo: "TAJ",
    isTaj: true,
    title: "Taj Mahal Palace",
    subtitle: "MUMBAI",
    description: "Iconic heritage performances featuring classical vocalists in the grand lobby.",
    fullDescription: "Step into history with majestic heritage performances at the iconic Taj Mahal Palace. Featuring renowned classical vocalists and traditional instrumentalists, the music resonates through the grand lobby and heritage suites, offering guests a deeply moving and culturally rich musical journey.",
    image: "https://images.unsplash.com/photo-1519671482749-fd098f3bb3a9?q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1519671482749-fd098f3bb3a9?q=80&w=800",
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800"
    ],
    duration: "03:10",
    bullets: ["Heritage Suites", "Classical Music", "Grand Entrances"],
    isFeatured: false
  },
  {
    id: "ginger-goa",
    logo: "GINGER",
    isTaj: false,
    title: "Ginger Goa",
    subtitle: "GOA",
    description: "Upbeat acoustic sessions by the pool, perfectly complementing the Goan sunset.",
    fullDescription: "Feel the rhythm of Goa with energetic live music at Ginger Goa. From vibrant pool parties to intimate acoustic sets at dusk, our performances are designed to make your Goan evenings unforgettable. Sip a cocktail, enjoy the breeze, and let the music take over.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800",
      "https://images.unsplash.com/photo-1470229722913-7c090b332f79?q=80&w=800",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800"
    ],
    duration: "01:55",
    bullets: ["Beach Parties", "Lively Dinners", "Acoustic Guitars"],
    isFeatured: false
  }
];

export const ExperiencesGrid = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeExp, setActiveExp] = useState<typeof EXPERIENCES[0] | null>(null);

  return (
    <>
      <section className="w-full py-20 bg-background space-y-12 overflow-hidden flex flex-col items-center relative z-0">
        
        {/* Editorial Header Section */}
        <div className="text-center space-y-4 max-w-4xl mx-auto px-6">
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold font-bold block">
            CURATED MUSICAL EXPERIENCES
          </span>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-[48px] font-light tracking-wide text-foreground leading-tight">
            Experience Across <br className="hidden sm:block" /> Iconic Hospitality Venues
          </h2>
          
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="h-1px w-12 bg-gold/50" />
            <div className="w-1.5 h-1.5 rotate-45 border border-gold bg-gold" />
            <div className="h-1px w-12 bg-gold/50" />
          </div>
        </div>

        {/* Swiper Carousel */}
        <div className="w-full relative px-6 md:px-12 lg:px-16 pb-12">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={false}
            slidesPerView={1}
            spaceBetween={24}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 1,
              slideShadows: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
              1440: { slidesPerView: 4, spaceBetween: 32 },
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="pb-14!"
          >
            {EXPERIENCES.map((exp, idx) => (
              <SwiperSlide key={exp.id} className="h-auto">
                <Reveal delay={idx * 0.1} yOffset={20}>
                  <div 
                    onClick={() => setActiveExp(exp)}
                    className="block h-full cursor-pointer"
                  >
                    <div className="flex flex-col rounded-[1.5rem overflow-hidden bg-[#0a0a0a] shadow-xl group relative border border-white/5 h-full transition-all duration-500 hover:shadow-2xl hover:border-gold/30">
                      
                      {/* Top Image Section */}
                      <div className="relative aspect-16/10 w-full bg-[#0a0a0a] overflow-hidden">
                        <img 
                          src={exp.image} 
                          alt={exp.title} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] from-0% via-[#0a0a0a]/60 to-transparent pointer-events-none" />
                        
                        {/* Featured Badge */}
                        {exp.isFeatured && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-[#c5a059] rounded-[2px] text-[9px] font-bold tracking-[0.15em] uppercase text-white shadow-sm z-20">
                            FEATURED
                          </div>
                        )}

                        {/* Play Button */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:bg-gold/20 group-hover:border-gold/80 transition-all duration-300 shadow-xl z-20">
                          <svg className="w-5 h-5 text-white ml-1 group-hover:scale-110 group-hover:text-gold transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Bottom Text Content Section */}
                      <div className="px-6 pb-6 pt-3 flex flex-col flex-1 relative z-10 bg-[#0a0a0a] -mt-1 border-t border-transparent">
                        
                        {/* Logo & Title Row */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 shrink-0 flex justify-center pt-1">
                            {exp.isTaj ? <TajLogo /> : <GingerLogo />}
                          </div>
                          <div className="flex flex-col">
                            <h3 className="font-serif-display text-lg sm:text-xl text-white tracking-wide leading-tight">{exp.title}</h3>
                            <span className="font-sans text-[9px] uppercase tracking-widest text-gold-dark font-bold mt-1">
                              {exp.subtitle}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="font-sans text-xs text-white/70 leading-[1.6] mb-5 font-light flex-1">
                          {exp.description}
                        </p>

                        {/* Footer Row */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10 w-full mt-auto">
                          <div className="flex items-center gap-2 group/btn">
                            <span className="font-sans text-[9px] tracking-[0.15em] text-[#c9a76d] uppercase font-bold">
                              Watch Preview
                            </span>
                            <svg className="w-3 h-3 text-[#c9a76d] group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                          </div>
                          <span className="font-sans text-[10px] text-white/40 tracking-wider font-light flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            {exp.duration}
                          </span>
                        </div>

                      </div>

                    </div>
                  </div>
                </Reveal>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full border border-gold/40 text-gold-dark flex items-center justify-center hover:bg-gold hover:text-white transition-colors shadow-sm z-10"
            >
              <svg className="w-5 h-5 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"/></svg>
            </button>
            
            <button 
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full border border-gold/40 text-gold-dark flex items-center justify-center hover:bg-gold hover:text-white transition-colors shadow-sm z-10"
            >
              <svg className="w-5 h-5 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

      </section>

      {/* Expanded Modal Popup */}
      <AnimatePresence>
        {activeExp && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveExp(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[1200px] h-[90vh] max-h-[800px] bg-[#0a0a0a] rounded-2rem border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent click-out when clicking inside modal
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveExp(null)}
                className="absolute top-4 right-4 z-110 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 border border-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>

              {/* Left Side: Media Gallery */}
              <div className="w-full md:w-1/2 lg:w-[55%] h-64 md:h-full relative bg-black flex flex-col border-r border-white/5">
                
                {/* Main Hero Video Placeholder */}
                <div className="relative w-full flex-1 md:flex-none md:h-[70%] group">
                  <img src={activeExp.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center bg-black/40 backdrop-blur-md text-white shadow-xl hover:scale-110 hover:bg-gold/20 hover:text-gold transition-all duration-300 cursor-pointer">
                      <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  {/* Duration Tag */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-md text-[10px] text-white/90 border border-white/10">
                    {activeExp.duration} HD
                  </div>
                </div>

                {/* Thumbnails Gallery */}
                <div className="w-full h-[30%] hidden md:block bg-[#050505] p-4">
                  <Swiper
                    modules={[FreeMode]}
                    freeMode={true}
                    slidesPerView={'auto'}
                    spaceBetween={16}
                    className="w-full h-full"
                  >
                    {activeExp.gallery?.map((img, i) => (
                      <SwiperSlide key={i} className="w-auto! h-full">
                        <div className="h-full aspect-video rounded-xl overflow-hidden border border-white/10 relative group cursor-pointer">
                          <img src={img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-1/2 lg:w-[45%] h-full overflow-y-auto p-8 lg:p-12 flex flex-col custom-scrollbar">
                
                {/* Logo */}
                <div className="mb-8 flex justify-start">
                  {activeExp.isTaj ? <TajLogo /> : <GingerLogo />}
                </div>

                {/* Headers */}
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-dark font-bold mb-3">
                  {activeExp.subtitle}
                </span>
                <h2 className="font-serif-display text-3xl md:text-4xl text-white tracking-wide mb-6">
                  {activeExp.title}
                </h2>

                {/* Body Text */}
                <p className="font-sans text-sm text-white/70 leading-relaxed font-light mb-8">
                  {activeExp.fullDescription}
                </p>

                {/* Bullets */}
                <div className="mb-10 space-y-3">
                  <h4 className="font-sans text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4 border-b border-white/10 pb-2">Experience Highlights</h4>
                  {activeExp.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rotate-45 bg-gold-dark" />
                      <span className="font-sans text-sm text-white/80 font-light">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
                  <Link href={`/videos`}>
                    <Button className="w-full bg-gold text-black hover:bg-white transition-colors duration-300 py-6 text-xs tracking-widest uppercase font-bold">
                      Watch Full Collection
                    </Button>
                  </Link>
                  <Link href={`/contact?program=${encodeURIComponent(activeExp.title)}`}>
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-300 py-6 text-xs tracking-widest uppercase">
                      Inquire Availability
                    </Button>
                  </Link>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
