import React from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { FadeIn } from "@/components/animations/fade-in";

export const metadata = {
  title: "About Hrithik Virendra Mishra | Luxury Hospitality Artist",
  description: "Discover the training, classical background, and premium hotel residency experience of flautist and vocalist Hrithik Virendra Mishra.",
};

const TIMELINE = [
  {
    year: "2024 - Present",
    role: "Resident Artist (Morning Flute)",
    venue: "Taj Lands End & Taj Mahal Palace, Mumbai",
    description: "Curated morning wellness flute ragas for high-net-worth guests, lawnside yoga, and signature breakfast lounge environments.",
  },
  {
    year: "2023",
    role: "Featured Sunset Soloist",
    venue: "Oberoi Resorts & Spa, Udaipur",
    description: "Designed a sunset fusion lounge program, blending traditional woodwinds with ambient digital pads during high-tea services.",
  },
  {
    year: "2022",
    role: "Sunday Brunch Resident Singer",
    venue: "JW Marriott Sahar, Mumbai",
    description: "Provided acoustic pop vocals, classic Bollywood retro singing, and flute instrumentals for premium weekend brunches.",
  },
  {
    year: "2020 - 2021",
    role: "Bespoke Event Performer",
    venue: "Destination Weddings & Corporate Galas",
    description: "Led high-end wedding entry processions, cocktail dinners, and corporate product launches across major Indian metros.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-20">
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-24 max-w-7xl mx-auto">
        
        {/* Editorial Section Header */}
        <Reveal>
          <SectionHeader
            tagline="The Journey"
            title="About Hrithik"
            subtitle="Bridging classical Indian woodwinds with contemporary acoustic vocals to elevate spaces."
          />
        </Reveal>

        {/* Biography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Biography Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0.1}>
              <h3 className="font-serif-display text-2xl md:text-3xl font-medium tracking-wide text-gold-dark">
                Classical Roots & Modern Ambient Fusion
              </h3>
            </Reveal>

            <Reveal delay={0.2} yOffset={20}>
              <p className="font-sans text-base leading-relaxed text-foreground/80 font-light">
                Hrithik Virendra Mishra is a professional flautist and vocalist dedicated to crafting acoustic atmospheres for luxury hospitality and premium celebrations. Trained in the classical Indian bansuri lineage, his approach centers on the meditative, time-slowing characteristics of acoustic woodwinds.
              </p>
            </Reveal>

            <Reveal delay={0.3} yOffset={20}>
              <p className="font-sans text-base leading-relaxed text-foreground/80 font-light">
                Recognizing the distinct needs of five-star properties, Hrithik has spent the last five years pioneering "Ambient Residencies"—musical formats designed not to demand guest attention, but to seamlessly accompany it. From pool-side morning ragas at the Taj to sunset high-tea melodies at the Oberoi, his musical curation is tailored directly to the architecture and brand philosophy of each property.
              </p>
            </Reveal>

            <Reveal delay={0.4} yOffset={20}>
              <p className="font-sans text-base leading-relaxed text-foreground/80 font-light">
                Beyond the flute, Hrithik alternates as a vocalist, offering acoustic guitar-backed interpretations of retro Bollywood classics and international lounge covers. This duality allows him to provide a diverse, multi-session experience for hotels, managing both quiet wellness environments in the morning and active high-energy bars in the evening.
              </p>
            </Reveal>
          </div>

          {/* Portrait Image Block */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-border/30 bg-secondary-bg/25">
            <FadeIn duration={1.2} delay={0.2}>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                  src="/assets/hero-artist.jpg"
                  alt="Hrithik Virendra Mishra"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Timeline Section */}
        <section className="space-y-12">
          <Reveal>
            <div className="space-y-2">
              <span className="font-sans text-xs tracking-widest uppercase text-gold-dark font-semibold">
                Engagements & Experience
              </span>
              <h3 className="font-serif-display text-2xl md:text-3xl font-medium tracking-wide">
                Hospitality Timeline
              </h3>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TIMELINE.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1} yOffset={30}>
                <div className="bg-secondary-bg/25 border border-border/40 p-8 rounded-xl space-y-4 hover:border-gold/30 transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-gold">
                      {item.year}
                    </span>
                    <h4 className="font-serif-display text-xl font-medium text-foreground tracking-wide">
                      {item.role}
                    </h4>
                    <p className="font-sans text-xs font-semibold text-foreground/70">
                      {item.venue}
                    </p>
                    <p className="font-sans text-sm text-foreground/75 leading-relaxed font-light pt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonial Panel */}
        <Reveal yOffset={40}>
          <div className="bg-dark-bg text-background p-10 md:p-14 rounded-2xl border border-border/10 space-y-8 text-center max-w-4xl mx-auto shadow-xl">
            <span className="font-sans text-[10px] tracking-widest uppercase text-gold font-bold">
              Guest Experience Impact
            </span>
            <p className="font-serif-quote italic text-lg md:text-2xl text-background/90 leading-relaxed max-w-2xl mx-auto">
              "The addition of the Morning Flute Session has transformed our courtyard breakfast. Hrithik understands exactly how to match the energy of the morning—serene, unobtrusive, and deeply premium."
            </p>
            <div className="space-y-1">
              <h5 className="font-sans text-xs tracking-wider uppercase font-semibold text-white">
                Food & Beverage Director
              </h5>
              <p className="font-sans text-[10px] tracking-widest text-gold uppercase">
                Taj Hotels Group, Mumbai
              </p>
            </div>
          </div>
        </Reveal>

        {/* Bookings Call to Action */}
        <Reveal yOffset={20}>
          <div className="text-center pt-8 space-y-6">
            <h3 className="font-serif-display text-2xl md:text-3xl font-medium tracking-wide">
              Interested in a Residency or Booking?
            </h3>
            <p className="font-sans text-sm text-foreground/70 max-w-md mx-auto">
              Let's create a curated acoustic experience designed specifically for your venue's brand and layout.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg" className="min-w-[200px]">
                  Contact for Bookings
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </main>
  );
}
