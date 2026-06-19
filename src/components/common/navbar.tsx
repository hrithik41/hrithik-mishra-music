"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  data: {
    logoText: string;
    logoSubtitle: string;
    navLinks: { _key?: string; label: string; href: string }[];
  }
}

export const Navbar = ({ data }: NavbarProps) => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === "/";
  const isTransparent = isHomePage && !isScrolled;

  // Auto hide/reveal header based on scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true); // Scrolling Down
    } else {
      setHidden(false); // Scrolling Up
    }
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
          isTransparent && !isMobileMenuOpen
            ? "bg-transparent text-white"
            : "border-b border-border/30 bg-background/80 backdrop-blur-md text-foreground"
        )}
      >
        <div className="w-full px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">

          {/* Editorial Brand Name Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="font-serif-display text-[15px] sm:text-base tracking-[0.2em] uppercase font-semibold group-hover:text-gold transition-colors duration-300">
              {data.logoText}
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-gold-dark font-medium mt-0.5">
              {data.logoSubtitle}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {data.navLinks.map((link, idx) => {
              const safeHref = link.href || "/";
              const isActive = pathname === safeHref;
              return (
                <Link
                  key={link._key || safeHref || idx}
                  href={safeHref}
                  className={cn(
                    "font-sans text-[11px] tracking-widest uppercase hover:text-gold transition-colors duration-300 relative py-2 font-medium",
                    isActive ? "text-gold" : isTransparent ? "text-white/80" : "text-foreground/80"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Call to Action Booking Button */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Book Here
              </Button>
            </Link>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col justify-between w-6 h-4 lg:hidden focus:outline-none z-50 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <span
              className={cn(
                "h-[1.5px] w-full transition-all duration-300 origin-left",
                isMobileMenuOpen || !isTransparent ? "bg-foreground" : "bg-white",
                isMobileMenuOpen ? "rotate-45 translate-y-[2px]" : ""
              )}
            />
            <span
              className={cn(
                "h-[1.5px] w-full transition-all duration-300",
                isMobileMenuOpen || !isTransparent ? "bg-foreground" : "bg-white",
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "h-[1.5px] w-full transition-all duration-300 origin-left",
                isMobileMenuOpen || !isTransparent ? "bg-foreground" : "bg-white",
                isMobileMenuOpen ? "-rotate-45 -translate-y-2px" : ""
              )}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 flex flex-col justify-center px-8 lg:hidden"
          >
            <nav className="flex flex-col space-y-6 text-left max-w-sm mx-auto w-full">
              {data.navLinks.map((link, idx) => {
                const safeHref = link.href || "/";
                const isActive = pathname === safeHref;
                return (
                  <motion.div
                    key={link._key || safeHref || idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05, ease: "easeOut" }}
                  >
                    <Link
                      href={safeHref}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "font-serif-display text-3xl tracking-wider hover:text-gold transition-colors duration-300",
                        isActive ? "text-gold font-medium" : "text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: data.navLinks.length * 0.05, ease: "easeOut" }}
                className="pt-6"
              >
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Book Here
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
