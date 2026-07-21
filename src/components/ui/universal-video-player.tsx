"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactPlayer to prevent SSR/hydration mismatch errors in Next.js
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as any;

interface UniversalVideoPlayerProps {
  url?: string;
  thumbnail?: string;
}

export function UniversalVideoPlayer({ url, thumbnail }: UniversalVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!url) return null;

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const renderFullscreenButton = () => (
    <button
      onClick={toggleFullScreen}
      className="absolute top-4 right-4 z-[100] bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full border border-white/20 backdrop-blur-md transition-all shadow-lg"
      title="Toggle Fullscreen"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    </button>
  );

  // 1. Direct Sanity CDN MP4 / WebM video files
  if (url.includes("cdn.sanity.io")) {
    return (
      <div ref={containerRef} className="w-full h-full relative group">
        <video
          src={url}
          controls
          className="w-full h-full object-contain bg-black"
          poster={thumbnail}
        />
        {renderFullscreenButton()}
      </div>
    );
  }

  // 2. Instagram Reels / Videos
  if (url.includes("instagram.com")) {
    try {
      const parsedUrl = new URL(url);
      parsedUrl.search = ""; // Strip tracking query parameters
      let pathname = parsedUrl.pathname;
      if (!pathname.endsWith("/")) pathname += "/";
      if (!pathname.endsWith("embed/")) pathname += "embed/";
      parsedUrl.pathname = pathname;
      const embedUrl = parsedUrl.toString();

      return (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center absolute inset-0 bg-black group relative">
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            style={{ maxWidth: '100%', maxHeight: '100%', aspectRatio: '9/16' }}
            allowFullScreen
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
          {renderFullscreenButton()}
        </div>
      );
    } catch (e) {
      console.error("Error formatting Instagram embed URL:", e);
    }
  }

  // 3. YouTube videos (direct iframe to avoid ReactPlayer hydration latency and ensure instant load)
  const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const youtubeMatch = url.match(youtubeRegExp);
  const youtubeId = (youtubeMatch && youtubeMatch[2].length === 11) ? youtubeMatch[2] : null;

  if (youtubeId) {
    return (
      <div ref={containerRef} className="w-full h-full flex items-center justify-center absolute inset-0 bg-black group relative">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title="YouTube performance video"
          className="w-full h-full border-0"
          style={{ maxWidth: '100%', maxHeight: '100%', aspectRatio: '16/9' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        {renderFullscreenButton()}
      </div>
    );
  }

  // 4. Vimeo videos (direct iframe)
  const vimeoRegExp = /vimeo\.com\/(?:video\/)?([0-9]+)/;
  const vimeoMatch = url.match(vimeoRegExp);
  const vimeoId = vimeoMatch ? vimeoMatch[1] : null;

  if (vimeoId) {
    return (
      <div ref={containerRef} className="w-full h-full flex items-center justify-center absolute inset-0 bg-black group relative">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
          title="Vimeo performance video"
          className="w-full h-full border-0"
          style={{ maxWidth: '100%', maxHeight: '100%', aspectRatio: '16/9' }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
        {renderFullscreenButton()}
      </div>
    );
  }

  // 5. Fallback for any other provider (loaded dynamically on the client only)
  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full group bg-black relative">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        playing
      />
      {renderFullscreenButton()}
    </div>
  );
}
