import React from "react";
import Link from "next/link";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Instagram: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>,
  YouTube: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>,
  Twitter: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  Facebook: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>,
  LinkedIn: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
};

export const Footer = ({ data }: { data?: any }) => {
  const d = data || {};
  
  const aboutTitle = d.aboutTitle || "Hrithik Virendra Mishra";
  const aboutSubtitle = d.aboutSubtitle || "Luxury Hospitality Artist";
  const aboutDescription = d.aboutDescription || "A premium digital presence showcasing resident artist programs, luxury hotel entertainment experiences, destination weddings, and curated live music performances.";
  
  const directoryLinks = d.directoryLinks || [
    { label: "Artist Story", href: "/about" },
    { label: "Performance Portfolio", href: "/experiences" },
    { label: "Residency Programs", href: "/residency-programs" },
    { label: "Moments Gallery", href: "/gallery" }
  ];
  
  const contactEmail = d.contactEmail || "inquiries@hrithikvirendra.com";
  const whatsappNumber = d.whatsappNumber || "919999999999";
  const socialLinks = d.socialLinks || [];
  return (
    <footer className="bg-dark-bg text-background/85 pt-20 pb-8 border-t border-border/10 font-sans">
      <div className="w-full px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Statement / Positioning */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex flex-col items-start">
            <span className="font-serif-display text-xl tracking-[0.2em] uppercase text-background font-semibold">
              {aboutTitle}
            </span>
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold font-medium mt-1">
              {aboutSubtitle}
            </span>
          </Link>
          <p className="text-sm max-w-sm leading-relaxed text-background/60 font-light">
            {aboutDescription}
          </p>
        </div>

        {/* Navigation columns */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
            Directory
          </h4>
          <ul className="space-y-2 text-sm font-light">
            {directoryLinks.map((link: any, idx: number) => (
              <li key={idx}>
                <Link href={link.href} className="hover:text-gold transition-colors duration-300">
                  {link.label}
                </Link>
              </li>
            ))}
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
                href={`mailto:${contactEmail}`}
                className="text-background hover:text-gold transition-colors duration-300 font-medium"
              >
                {contactEmail}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
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
              <div className="flex gap-4 items-center">
                {socialLinks.map((social: any, idx: number) => {
                  const icon = SOCIAL_ICONS[social.platform];
                  if (!icon) return null; // Fallback if unrecognized
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-white hover:scale-110 transition-all duration-300"
                      aria-label={social.platform}
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full px-6 md:px-12 lg:px-16 mt-16 pt-6 border-t border-border/10 flex flex-col md:flex-row justify-between items-center text-xs text-background/40 gap-2">
        <p>
          &copy; {new Date().getFullYear()} Hrithik Virendra Mishra. All rights reserved.
        </p>
        <p className="tracking-widest uppercase flex items-center gap-1.5">
          Made with <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /></svg>
        </p>
      </div>
    </footer>
  );
};
