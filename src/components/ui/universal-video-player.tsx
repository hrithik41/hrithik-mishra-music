"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactPlayer to prevent SSR/hydration mismatch errors in Next.js
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as any;

interface UniversalVideoPlayerProps {
  url?: string;
  thumbnail?: string;
}

export function UniversalVideoPlayer({ url, thumbnail }: UniversalVideoPlayerProps) {
  if (!url) return null;

  // 1. Direct Sanity CDN MP4 / WebM video files
  if (url.includes("cdn.sanity.io")) {
    return (
      <video
        src={url}
        controls
        className="w-full h-full object-contain"
        poster={thumbnail}
      />
    );
  }

  // 2. Instagram Reels / Videos
  if (url.includes("instagram.com")) {
    try {
      const parsedUrl = new URL(url);
      parsedUrl.search = ""; // Strip tracking query parameters
      let pathname = parsedUrl.pathname;
      if (!pathname.endsWith("/")) {
        pathname += "/";
      }
      if (!pathname.endsWith("embed/")) {
        pathname += "embed/";
      }
      parsedUrl.pathname = pathname;
      const embedUrl = parsedUrl.toString();

      return (
        <iframe
          src={embedUrl}
          className="w-full h-full border-0 absolute inset-0"
          allowFullScreen
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
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
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
        title="YouTube performance video"
        className="w-full h-full border-0 absolute inset-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  // 4. Vimeo videos (direct iframe)
  const vimeoRegExp = /vimeo\.com\/(?:video\/)?([0-9]+)/;
  const vimeoMatch = url.match(vimeoRegExp);
  const vimeoId = vimeoMatch ? vimeoMatch[1] : null;

  if (vimeoId) {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
        title="Vimeo performance video"
        className="w-full h-full border-0 absolute inset-0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }

  // 5. Fallback for any other provider (loaded dynamically on the client only)
  return (
    <div className="absolute inset-0 w-full h-full">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        playing
      />
    </div>
  );
}
