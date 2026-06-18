"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface VideoCardProps {
  videoId: string;
  title: string;
  description?: string;
  category?: string;
}

export function VideoCard({ videoId, title, description, category }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // We can fetch the highest-res thumbnail available from YouTube
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  // Embed URL with autoplay enabled for immediate playback on load
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/10 bg-dark-bg group shadow-md">
      {!isPlaying ? (
        <div 
          onClick={() => setIsPlaying(true)} 
          className="absolute inset-0 w-full h-full cursor-pointer flex flex-col justify-end p-6 select-none"
        >
          {/* Lazy Loaded Thumbnail Image */}
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            onError={(e) => {
              // Fallback to high quality definition thumbnail if maxres is missing
              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />

          {/* Premium dark gradient mask */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/20 group-hover:via-black/40 transition-all duration-300" />

          {/* Golden Ambient Glow (Behind play button on hover) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gold/15 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Centered Play Button Primitive */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 rounded-full bg-background/25 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-colors duration-300 shadow-lg"
            >
              {/* Play Icon SVG */}
              <svg 
                className="w-6 h-6 text-white group-hover:text-background translate-x-[2px] transition-colors duration-300" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>

          {/* Bottom Caption Overlay */}
          <div className="relative z-10 space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            {category && (
              <span className="font-sans text-[9px] tracking-widest uppercase text-gold font-bold">
                {category}
              </span>
            )}
            <h4 className="font-serif-display text-lg sm:text-xl font-medium text-white tracking-wide leading-snug">
              {title}
            </h4>
            {description && (
              <p className="font-sans text-xs text-white/70 leading-relaxed max-w-md line-clamp-1 group-hover:line-clamp-none transition-all duration-500 font-light">
                {description}
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Video Embed iframe */
        <iframe
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full z-20"
        />
      )}
    </div>
  );
}
