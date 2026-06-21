"use client";

import React, { useState } from "react";
import { ExperienceItem, ExperienceMedia } from "@/components/sections/experiences-grid";
import ReactPlayer from 'react-player';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';

const Player = ReactPlayer as any;

export default function ExperienceDetailsClient({ activeExp }: { activeExp: ExperienceItem }) {
  const [activeMedia, setActiveMedia] = useState<ExperienceMedia | null>(
    (activeExp.gallery && activeExp.gallery.length > 0) ? activeExp.gallery[0] : { _type: 'image', url: activeExp.coverImage }
  );

  return (
    <div className="w-full max-w-[1400px] bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden flex flex-col lg:flex-row shadow-2xl min-h-[80vh]">
      
      {/* Left Side: Media Gallery */}
      <div className="w-full lg:w-[60%] flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 relative">
        {/* Main Hero Video */}
        <div className="relative w-full flex-1 min-h-[40vh] md:min-h-[50vh] lg:min-h-0 bg-black flex items-center justify-center overflow-hidden">
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
                <Player
                  url={activeMedia?.url}
                  width="100%"
                  height="100%"
                  controls
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              )}
            </div>
          ) : (
            <img src={activeMedia?.url || activeExp.coverImage} className="w-full h-full object-cover opacity-90" />
          )}
          {/* Duration Tag */}
          {activeExp.duration && (
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-md text-[10px] text-white/90 border border-white/10 z-10 pointer-events-none">
              {activeExp.duration} HD
            </div>
          )}
        </div>

        {/* Thumbnails Gallery */}
        <div className="w-full h-24 md:h-32 bg-[#050505] p-3 md:p-4 shrink-0 border-t border-white/10">
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
      <div className="w-full lg:w-[40%] flex-1 overflow-y-auto p-8 md:p-12 lg:p-16 flex flex-col">
        
        {/* Header Row: Logo & Title */}
        <div className="flex items-center gap-5 mb-8">
          {activeExp.venueLogo && (
            <div className="h-12 md:h-16 shrink-0 flex items-center justify-center">
              <img src={activeExp.venueLogo} alt="Venue Logo" className="h-full w-auto object-contain drop-shadow-md" />
            </div>
          )}
          <div className="flex flex-col justify-center">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-dark font-bold mb-2">
              {activeExp.location}
            </span>
            <h2 className="font-serif-display text-3xl md:text-4xl text-white tracking-wide leading-none">
              {activeExp.title}
            </h2>
          </div>
        </div>

        {/* Body Text */}
        <p className="font-sans text-[15px] text-white/70 leading-relaxed font-light mb-10">
          {activeExp.fullText}
        </p>

        {/* Bullets */}
        <div className="mb-12 space-y-4">
          <h4 className="font-sans text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4 border-b border-white/10 pb-3">Experience Highlights</h4>
          {(activeExp.highlights || []).map((bullet, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-2 h-2 rotate-45 bg-gold-dark" />
              <span className="font-sans text-[15px] text-white/80 font-light">{bullet}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
          <Link href={`/videos`}>
            <Button className="w-full bg-gold text-black hover:bg-white transition-colors duration-300 py-6 text-[11px] tracking-widest uppercase font-bold">
              Watch Full Collection
            </Button>
          </Link>
          <Link href={`/contact?program=${encodeURIComponent(activeExp.title)}`}>
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-300 py-6 text-[11px] tracking-widest uppercase">
              Inquire Availability
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
