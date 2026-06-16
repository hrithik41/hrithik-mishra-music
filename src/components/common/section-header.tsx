import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  tagline?: string;
  className?: string;
  align?: "center" | "left";
}

export const SectionHeader = ({
  title,
  subtitle,
  tagline,
  className,
  align = "center",
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-3",
        {
          "items-center text-center": align === "center",
          "items-start text-left": align === "left",
        },
        className
      )}
    >
      {tagline && (
        <span className="font-sans text-xs tracking-[0.25em] uppercase text-gold-dark font-semibold">
          {tagline}
        </span>
      )}
      <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="font-serif-quote italic text-lg md:text-xl text-foreground/70 max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="h-1px w-12 bg-gold-dark/40 pt-1" />
    </div>
  );
};
