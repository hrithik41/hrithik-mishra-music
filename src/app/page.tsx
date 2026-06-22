import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { ExperiencesGrid } from "@/components/sections/experiences-grid";
import { GalleryClient } from "@/components/pages/gallery-client";
import { MarqueeSection } from "@/components/sections/marquee";

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

  const { data: galleryItemsData } = await sanityFetch({
    query: groq`*[_type == "galleryItem"] | order(_createdAt desc)`,
  });

  const experiences = (experiencesData as any[])?.map(exp => ({
    ...exp,
    venueLogo: exp.venueLogo?.asset ? urlFor(exp.venueLogo).url() : "",
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

  const galleryItems = (galleryItemsData as any[])?.map((item: any) => ({
    _id: item._id,
    title: item.title,
    category: item.category,
    image: item.image?.asset ? urlFor(item.image).url() : "",
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

  const marqueeLogos = settings?.marqueeLogos?.map((logoItem: any) => ({
    name: logoItem.name,
    logoUrl: logoItem.logo?.asset ? urlFor(logoItem.logo).url() : "",
  }));

  return (
    <main className="min-h-screen bg-background text-foreground pb-0">
      
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
      <GalleryClient 
        tagline={settings?.galleryTagline || "FEATURED GALLERY"} 
        title={settings?.galleryTitle || "Moments that Create Memories"} 
        subtitle={settings?.gallerySubtitle || "Explore some selected visual snapshots of live performances at premium resorts."}
        items={galleryItems?.length > 0 ? galleryItems : undefined}
        categories={settings?.galleryCategories}
      />

      {/* 5. Partners Marquee block (Replaces Philosophy) */}
      <MarqueeSection 
        tagline={settings?.marqueeTagline}
        title={settings?.marqueeTitle}
        logos={marqueeLogos}
      />

    </main>
  );
}
