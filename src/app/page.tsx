import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { ExperiencesGrid } from "@/components/sections/experiences-grid";
import { GalleryClient } from "@/components/pages/gallery-client";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/animations/reveal";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      
      {/* 1. Cinematic Hero Section (Stretches Full Width edge-to-edge) */}
      <Hero />

      {/* 2. Stats Section (Stretches Full Width edge-to-edge) */}
      <Stats />

      {/* 3. Performance Experiences Section (White Cards, Gold overlap badges) */}
      <ExperiencesGrid />

      {/* 4. Featured Gallery (Reusing the dynamic gallery client) */}
      <div className="-mt-10">
        <GalleryClient 
          tagline="FEATURED GALLERY" 
          title="Moments that Create Memories" 
          subtitle="Explore some selected visual snapshots of live performances at premium resorts."
        />
      </div>

      {/* 5. Main Philosophy block */}
      <div className="w-full px-6 md:px-12 lg:px-16 mt-20 space-y-32">
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
