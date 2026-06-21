import React from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import ExperienceDetailsClient from "./experience-details-client";

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const query = groq`*[_type == "experience" && (slug.current == $slug || _id == $slug)][0] {
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
      _type == 'image' => {
        _type,
        "url": asset->url,
        "thumbnail": asset->url
      },
      _type == 'videoItem' => {
        _type,
        "url": coalesce(videoFile.asset->url, url),
        "thumbnail": thumbnail.asset->url
      }
    },
    "slug": slug.current
  }`;

  const experienceData = await client.fetch(query, { slug }, { next: { revalidate: 3600 } });

  if (!experienceData) {
    return <div className="min-h-screen flex items-center justify-center text-white">Experience not found</div>;
  }

  // Format data
  const exp = {
    ...experienceData,
    title: experienceData.title || "Experience",
    venueLogo: experienceData.venueLogo?.asset ? urlFor(experienceData.venueLogo).url() : "",
    coverImage: experienceData.coverImage?.asset ? urlFor(experienceData.coverImage).url() : "",
    gallery: (experienceData.gallery || []).map((item: any) => {
      if (!item) return null;
      if (item._type === 'image') {
        return { _type: 'image', url: item.url };
      }
      if (item._type === 'videoItem') {
        return { _type: 'video', url: item.url, thumbnail: item.thumbnail };
      }
      return null;
    }).filter(Boolean)
  };

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4 md:px-8 flex justify-center items-start">
      <ExperienceDetailsClient activeExp={exp} />
    </main>
  );
}
