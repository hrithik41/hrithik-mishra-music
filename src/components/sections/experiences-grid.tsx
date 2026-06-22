"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from 'react-player';

const Player = ReactPlayer as any;

export interface ExperienceMedia {
  _type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface ExperienceItem {
  _id: string;
  title: string;
  venueLogo: string;
  location: string;
  isFeatured: boolean;
  duration?: string;
  previewText?: string;
  fullText?: string;
  highlights?: string[];
  coverImage: string;
  gallery?: ExperienceMedia[];
}


// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const EXPERIENCES: ExperienceItem[] = [
  {
    _id: "taj-lands-end",
    venueLogo: "",
    title: "Taj Lands End",
    location: "MUMBAI",
    previewText: "Luxury flute residency creating serene ambience and memorable moments for distinguished guests.",
    fullText: "Immerse yourself in the soulful melodies of the flute at the iconic Taj Lands End. Our exclusive residency program features ambient morning instrumentals and sophisticated evening performances designed to elevate the luxury guest experience. Set against the stunning backdrop of the Arabian Sea, these curated performances transform the lobby and premium dining areas into a sanctuary of tranquility.",
    coverImage: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800",
    gallery: [
      { _type: 'image', url: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800" },
      { _type: 'video', url: "https://www.youtube.com/watch?v=LXb3EKWsInQ", thumbnail: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800" },
      { _type: 'image', url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800" }
    ],
    highlights: ["Lobby Ambience", "Premium Dining", "Guest Receptions"],
    isFeatured: true
  },
  {
    _id: "taj-santacruz",
    venueLogo: "",
    title: "Taj Santacruz",
    location: "MUMBAI",
    previewText: "Live music experiences at the lobby and dining venues for elevated guest experiences.",
    fullText: "Experience the vibrant energy of live music at Taj Santacruz. Our vocal and acoustic sets are perfectly tailored to complement the bustling, cosmopolitan atmosphere of the hotel.",
    coverImage: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800",
    gallery: [
      { _type: 'image', url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800" },
      { _type: 'image', url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800" }
    ],
    highlights: ["Evening Lounges", "Live Singing", "Acoustic Sets"],
    isFeatured: false
  }
];

export interface ExperiencesGridProps {
  goldenTitle?: string;
  title?: string;
  subtitle?: string;
  experiences?: ExperienceItem[];
}

export const ExperiencesGrid = ({ goldenTitle, title, subtitle, experiences = EXPERIENCES }: ExperiencesGridProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeExp, setActiveExp] = useState<ExperienceItem | null>(null);
  const [activeMedia, setActiveMedia] = useState<ExperienceMedia | null>(null);

  React.useEffect(() => {
    if (activeExp) {
      if (activeExp.gallery && activeExp.gallery.length > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveMedia(activeExp.gallery[0]);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveMedia({ _type: 'image', url: activeExp.coverImage });
      }
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveMedia(null);
    }
  }, [activeExp]);

  return (
    <>
      <section className="w-full pt-12 md:pt-16 pb-0 bg-background space-y-8 md:space-y-10 overflow-hidden flex flex-col items-center relative z-0">
        
        {/* Editorial Header Section */}
        <div className="text-center space-y-4 max-w-4xl mx-auto px-6">
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold font-bold block">
            {goldenTitle || "CURATED MUSICAL EXPERIENCES"}
          </span>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-[48px] font-light tracking-wide text-foreground leading-tight whitespace-pre-wrap">
            {title || "Experience Across \n Iconic Hospitality Venues"}
          </h2>
          
          <div className="flex items-center justify-center gap-4 pt-3 pb-2">
            <div className="h-[1.5px] w-16 sm:w-28 bg-gold" />
            <span className="text-gold text-xl sm:text-2xl leading-none mt-[2px]">✦</span>
            <div className="h-[1.5px] w-16 sm:w-28 bg-gold" />
          </div>
          
          <p className="font-serif-display text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed font-light">
            {subtitle || "Creating memorable guest experiences through live music."}
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="w-full max-w-[1920px] mx-auto relative px-4 md:px-8 lg:px-12 pb-0">
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
              768: { slidesPerView: 2, spaceBetween: 24 },
              1280: { slidesPerView: 3, spaceBetween: 40 },
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="pb-14!"
          >
            {experiences.map((exp, idx) => (
              <SwiperSlide key={exp._id} className="h-auto">
                <Reveal delay={idx * 0.1} yOffset={20}>
                  <div 
                    onClick={() => setActiveExp(exp)}
                    className="block h-full cursor-pointer"
                  >
                    <div className="flex flex-col rounded-3xl overflow-hidden bg-[#0a0a0a] shadow-xl group relative border border-white/5 h-full transition-all duration-500 hover:shadow-2xl hover:border-gold/30">
                      
                      {/* Top Image Section */}
                      <div className="relative aspect-4/3 w-full bg-[#0a0a0a] overflow-hidden">
                        <img 
                          src={exp.coverImage} 
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
                          <div className="w-14 h-14 shrink-0 flex items-start justify-center pt-1">
                            {exp.venueLogo ? <img src={exp.venueLogo} alt="Venue Logo" className="w-full h-auto object-contain max-h-12 drop-shadow-md" /> : null}
                          </div>
                          <div className="flex flex-col">
                            <h3 className="font-serif-display text-lg sm:text-xl text-white tracking-wide leading-tight">{exp.title}</h3>
                            <span className="font-sans text-[9px] uppercase tracking-widest text-gold-dark font-bold mt-1">
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="font-sans text-xs text-white/70 leading-[1.6] mb-5 font-light flex-1">
                          {exp.previewText}
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
                        </div>

                      </div>

                    </div>
                  </div>
                </Reveal>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Controls - Absolute Floating */}
          <button 
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-2 md:left-6 lg:left-8 top-[calc(50%-52px)] -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/10 hover:border-white/40 shadow-lg transition-all duration-300 z-30 group"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8 pr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          
          <button 
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-2 md:right-6 lg:right-8 top-[calc(50%-52px)] -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/10 hover:border-white/40 shadow-lg transition-all duration-300 z-30 group"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8 pl-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </button>
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
              <div className="w-full md:w-1/2 lg:w-[55%] h-72 md:h-full shrink-0 relative bg-black flex flex-col border-r border-white/5">
                
                {/* Main Hero Video Placeholder */}
                <div className="relative w-full flex-1 md:flex-none md:h-[70%] group bg-black flex items-center justify-center overflow-hidden">
                  {activeMedia?._type === 'video' ? (
                    <div className="w-full h-full relative flex items-center justify-center">
                      {activeMedia?.url?.includes('cdn.sanity.io') ? (
                        <video 
                          src={activeMedia.url} 
                          controls 
                          className="w-full h-full object-contain"
                          poster={activeMedia.thumbnail}
                        />
                      ) : (
                        <>
                          <Player
                            url={activeMedia?.url}
                            width="100%"
                            height="100%"
                            controls
                            style={{ position: 'absolute', top: 0, left: 0 }}
                          />
                        </>
                      )}
                    </div>
                  ) : (
                    <img src={activeMedia?.url || activeExp.coverImage} className="w-full h-full object-cover opacity-90" />
                  )}
                </div>

                {/* Thumbnails Gallery */}
                <div className="w-full h-20 md:h-[30%] bg-[#050505] p-2 md:p-4 shrink-0 border-t border-white/10 md:border-t-0">
                  <Swiper
                    modules={[FreeMode]}
                    freeMode={true}
                    slidesPerView={'auto'}
                    spaceBetween={16}
                    className="w-full h-full"
                  >
                    {activeExp.gallery?.map((media, i) => (
                      <SwiperSlide key={i} className="w-auto! h-full">
                        <div 
                          onClick={() => setActiveMedia(media)}
                          className={`h-full aspect-video rounded-xl overflow-hidden border transition-all cursor-pointer relative ${activeMedia === media ? 'border-gold shadow-[0_0_15px_rgba(201,167,109,0.3)]' : 'border-white/10 opacity-60 hover:opacity-100'}`}
                        >
                          <img src={media._type === 'video' ? (media.thumbnail || activeExp.coverImage) : media.url} className="w-full h-full object-cover" />
                          {media._type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                          )}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-1/2 lg:w-[45%] flex-1 min-h-0 overflow-y-auto p-6 md:p-8 lg:p-12 flex flex-col custom-scrollbar">
                
                {/* Header (Logo + Title) */}
                <div className="flex items-start md:items-center gap-5 mb-8">
                  {activeExp.venueLogo && (
                    <div className="h-12 md:h-14 shrink-0 flex items-center">
                      <img src={activeExp.venueLogo} alt="Venue Logo" className="h-full w-auto object-contain object-left drop-shadow-md" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-dark font-bold mb-1.5">
                      {activeExp.location}
                    </span>
                    <h2 className="font-serif-display text-3xl md:text-4xl text-white tracking-wide leading-tight mt-0.5">
                      {activeExp.title}
                    </h2>
                  </div>
                </div>

                {/* Body Text */}
                <p className="font-sans text-sm text-white/70 leading-relaxed font-light mb-8">
                  {activeExp.fullText}
                </p>

                {/* Bullets */}
                <div className="mb-10 space-y-3">
                  <h4 className="font-sans text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4 border-b border-white/10 pb-2">Experience Highlights</h4>
                  {(activeExp.highlights || []).map((bullet, idx) => (
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
