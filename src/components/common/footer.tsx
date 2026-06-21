import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-dark-bg text-background/85 pt-20 pb-8 border-t border-border/10 font-sans">
      <div className="w-full px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Statement / Positioning */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex flex-col items-start">
            <span className="font-serif-display text-xl tracking-[0.2em] uppercase text-background font-semibold">
              Hrithik Virendra Mishra
            </span>
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold font-medium mt-1">
              Luxury Hospitality Artist
            </span>
          </Link>
          <p className="text-sm max-w-sm leading-relaxed text-background/60 font-light">
            A premium digital presence showcasing resident artist programs, luxury hotel entertainment experiences, destination weddings, and curated live music performances.
          </p>
        </div>

        {/* Navigation columns */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
            Directory
          </h4>
          <ul className="space-y-2 text-sm font-light">
            <li>
              <Link href="/about" className="hover:text-gold transition-colors duration-300">
                Artist Story
              </Link>
            </li>
            <li>
              <Link href="/experiences" className="hover:text-gold transition-colors duration-300">
                Performance Portfolio
              </Link>
            </li>
            <li>
              <Link href="/residency-programs" className="hover:text-gold transition-colors duration-300">
                Residency Programs
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-gold transition-colors duration-300">
                Moments Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info and booking channels */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
            Inquiries
          </h4>
          <ul className="space-y-2 text-sm font-light text-background/70">
            <li>
              Email:{" "}
              <a
                href="mailto:inquiries@hrithikvirendra.com"
                className="text-background hover:text-gold transition-colors duration-300 font-medium"
              >
                inquiries@hrithikvirendra.com
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a
                href="https://wa.me/919999999999" // Replace with your number
                target="_blank"
                rel="noopener noreferrer"
                className="text-background hover:text-gold transition-colors duration-300 font-medium"
              >
                Direct Booking chat
              </a>
            </li>
            <li className="pt-2">
              <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block mb-1">
                Social Presence
              </span>
              <div className="flex gap-4">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors duration-300"
                >
                  YouTube
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors duration-300"
                >
                  Instagram
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full px-6 md:px-12 lg:px-16 mt-16 pt-6 border-t border-border/10 flex flex-col md:flex-row justify-between items-center text-xs text-background/40 gap-2">
        <p>
          &copy; {new Date().getFullYear()} Hrithik Virendra Mishra. All rights reserved.
        </p>
        <p className="tracking-widest uppercase">
          Taj &bull; Oberoi &bull; Aman Resorts Alignment
        </p>
      </div>
    </footer>
  );
};
