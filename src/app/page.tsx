import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { ExperiencesGrid } from "@/components/sections/experiences-grid";
import { GalleryClient } from "@/components/pages/gallery-client";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/animations/reveal";
import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: homePageSettings } = await sanityFetch({
    query: groq`*[_type == "homePage"][0]`,
  });

  const { data: experiencesData } = await sanityFetch({
    query: groq`*[_type == "experience"] | order(orderRank asc) {
      _id,
      title,
      venueLogo,
      location,
      isFeatured,
      duration,
      previewText,
      fullText,
      highlights,
      coverImage,
      gallery[] {
        _type == "image" => {
          "_type": "image",
          "image": @
        },
        _type == "videoItem" => {
          "_type": "video",
          "url": coalesce(videoFile.asset->url, url),
          "thumbnail": thumbnail
        }
      }
    }`,
  });

  const experiences = (experiencesData as any[])?.map(exp => ({
    ...exp,
    coverImage: exp.coverImage?.asset ? urlFor(exp.coverImage).url() : "",
    gallery: exp.gallery?.map((item: any) => {
      if (item._type === 'image') {
        return {
          _type: 'image',
          url: item.image?.asset ? urlFor(item.image).url() : ""
        };
      } else if (item._type === 'video') {
        return {
          _type: 'video',
          url: item.url,
          thumbnail: item.thumbnail?.asset ? urlFor(item.thumbnail).url() : undefined
        };
      }
      return item;
    })
  }));

  const settings: any = homePageSettings;

  const heroBackgroundImages = settings?.heroBackgroundImages
    ? settings.heroBackgroundImages
        .filter((img: any) => img?.asset)
        .map((img: any) => urlFor(img).url())
    : undefined;

  const heroBackgroundImagesMobile = settings?.heroBackgroundImagesMobile
    ? settings.heroBackgroundImagesMobile
        .filter((img: any) => img?.asset)
        .map((img: any) => urlFor(img).url())
    : undefined;

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      
      {/* 1. Cinematic Hero Section (Stretches Full Width edge-to-edge) */}
      <Hero 
        heroTitle={settings?.heroTitle}
        heroTag={settings?.heroTag}
        heroText={settings?.heroText}
        heroBackgroundImages={heroBackgroundImages} 
        heroBackgroundImagesMobile={heroBackgroundImagesMobile} 
      />

      {/* 2. Stats Section (Stretches Full Width edge-to-edge) */}
      <Stats stats={settings?.stats} />

      {/* 3. Performance Experiences Section (White Cards, Gold overlap badges) */}
      <ExperiencesGrid 
        goldenTitle={settings?.experiencesGoldenTitle}
        title={settings?.experiencesTitle}
        subtitle={settings?.experiencesSubtitle}
        experiences={(experiences as any[])?.length > 0 ? (experiences as any[]) : undefined}
      />

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
