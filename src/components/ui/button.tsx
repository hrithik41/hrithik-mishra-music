import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text-link";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles (premium, tracking, and smooth transitions)
          "inline-flex items-center justify-center font-sans font-medium uppercase tracking-widest transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          
          // Style Variants
          {
            // Solid Gold Accent
            "bg-gold text-background hover:bg-gold-dark": variant === "primary",
            
            // Gold Border Accent
            "border border-gold text-gold-dark hover:bg-secondary-bg/50": variant === "secondary",
            
            // Neutral Muted Border (for general controls)
            "border border-border text-foreground hover:bg-secondary-bg/30": variant === "outline",
            
            // Text link with animated gold underline on hover
            "border-none bg-transparent p-0 text-foreground hover:text-gold-dark relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gold-dark after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100": variant === "text-link",
          },
          
          // Dynamic padding based on size (links have no padding)
          {
            "px-5 py-2.5 text-xs": size === "sm" && variant !== "text-link",
            "px-7 py-3.5 text-sm": size === "md" && variant !== "text-link",
            "px-9 py-4 text-base": size === "lg" && variant !== "text-link",
            "p-0 text-sm": variant === "text-link",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
