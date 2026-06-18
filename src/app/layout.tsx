import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Global SEO Meta Tags (For homepage and general sharing)
export const metadata: Metadata = {
  title: "Hrithik Virendra Mishra | Luxury Hospitality Artist & Flautist",
  description: "Professional Flautist & Vocalist creating memorable guest experiences through live music and residency programs at Taj, Oberoi, and Marriott Resorts.",
  keywords: ["Luxury Hotel Flautist", "Professional Flautist India", "Resident Artist India", "Wedding Flautist Mumbai"],
  openGraph: {
    title: "Hrithik Virendra Mishra | Luxury Hospitality Artist",
    description: "Elevating hospitality and landmark events with curated live music performances.",
    url: "https://hrithikvirendra.com",
    siteName: "Hrithik Virendra Mishra Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data telling Google search crawlers exactly who you are and what you do
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hrithik Virendra Mishra",
    "jobTitle": "Luxury Hospitality Music Artist",
    "description": "Professional Flautist & Vocalist specialized in luxury hotel residency programs and live wedding performances.",
    "knowsAbout": [
      "Live Flute Performance",
      "Vocal Music",
      "Hotel Residency Programs",
      "Classical Music Fusion"
    ],
    "sameAs": [
      "https://youtube.com", // Replace with your real links later
      "https://instagram.com"
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Inject JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <div className="flex-1 pt-20">
          {children}
        </div>
        <Footer />
        <SanityLive />
      </body>
    </html>
  );
}
