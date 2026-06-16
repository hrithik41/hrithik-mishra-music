import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/animations/reveal";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      
      {/* 1. Cinematic Hero Section (Stretches Full Width edge-to-edge) */}
      <Hero />

      {/* 2. Stats Section (Stretches Full Width edge-to-edge) */}
      <Stats />

      {/* 3. Main Content Container (Aligned with grid padding) */}
      <div className="w-full px-6 md:px-12 lg:px-16 mt-32 space-y-32">
        
        {/* Philosophy Content block */}
        <section className="space-y-16">
          <SectionHeader
            tagline="Philosophy"
            title="Slowing Down Time"
            align="left"
          />
          
          <div className="grid md:grid-cols-2 gap-12 text-foreground/80 font-sans leading-relaxed text-base">
            <Reveal delay={0.1}>
              <p>
                Our Morning Ambience and Sunset Lounge sets are designed to blend seamlessly into the background, adding an auditory layer of sophistication that complements the architectural elegance of heritage hotels.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p>
                Every performance uses a slow, calculated approach to live music—leveraging premium flutes and vocals to keep guests relaxed and fully immersed in the local heritage.
              </p>
            </Reveal>
          </div>
        </section>
        
      </div>
    </main>
  );
}
