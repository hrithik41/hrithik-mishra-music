import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO Settings' },
    { name: 'hero', title: 'Hero Section' },
    { name: 'stats', title: 'Stats Section' },
    { name: 'experiences', title: 'Experiences Section' },
    { name: 'gallery', title: 'Featured Gallery Section' },
    { name: 'marquee', title: 'Partners Marquee Section' },
    { name: 'testimonials', title: 'Testimonials' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      description: 'The main title (use Enter to break into multiple lines).',
    }),
    defineField({
      name: 'heroTag',
      title: 'Hero Tag',
      type: 'string',
      group: 'hero',
      description: 'The small text below the title (e.g. PROFESSIONAL FLAUTIST & VOCALIST)',
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
      group: 'hero',
    }),
    defineField({
      name: 'heroBackgroundImages',
      title: 'Hero Background Images (Desktop)',
      type: 'array',
      group: 'hero',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'heroBackgroundImagesMobile',
      title: 'Hero Background Images (Mobile)',
      type: 'array',
      group: 'hero',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    // Stats Section
    defineField({
      name: 'stats',
      title: 'Stats Items',
      type: 'array',
      group: 'stats',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Number Value (e.g. 8+)', type: 'string' },
            { name: 'label', title: 'Bold Label (e.g. Years of)', type: 'string' },
            { name: 'subLabel', title: 'Bottom Text (e.g. Flute Performance)', type: 'string' },
          ],
          preview: {
            select: {
              title: 'value',
              label: 'label',
              subtitle: 'subLabel'

            },
            prepare(selection: any) {
              const { title, label, subtitle } = selection;
              return {
                title: `${title || 'No value'} - ${label || 'No label'} - ${subtitle || 'No label'}`
              }
            }
          }
        },
      ],
      description: 'Add exactly 4 statistical highlights. The icons are automatically assigned based on order (1 to 4).',
    }),
    // Experiences Section
    defineField({
      name: 'experiencesGoldenTitle',
      title: 'Experiences Golden Title',
      type: 'string',
      group: 'experiences',
      description: 'The small golden text above the main title (e.g. CURATED MUSICAL EXPERIENCES)',
    }),
    defineField({
      name: 'experiencesTitle',
      title: 'Experiences Title',
      type: 'string',
      group: 'experiences',
      description: 'The main title (use Enter to break into multiple lines).',
    }),
    defineField({
      name: 'experiencesSubtitle',
      title: 'Experiences Subtitle',
      type: 'string',
      group: 'experiences',
      description: 'The paragraph text below the title and star partition.',
    }),
    // Featured Gallery Section
    defineField({
      name: 'galleryTagline',
      title: 'Gallery Tagline',
      type: 'string',
      group: 'gallery',
      description: 'e.g. FEATURED GALLERY',
    }),
    defineField({
      name: 'galleryTitle',
      title: 'Gallery Title',
      type: 'string',
      group: 'gallery',
      description: 'e.g. Moments that Create Memories',
    }),
    defineField({
      name: 'gallerySubtitle',
      title: 'Gallery Subtitle',
      type: 'text',
      group: 'gallery',
      description: 'e.g. Explore some selected visual snapshots...',
    }),
    defineField({
      name: 'galleryCategories',
      title: 'Gallery Filter Categories',
      type: 'array',
      group: 'gallery',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Display Label (e.g. Flute Performances)', type: 'string' },
            { name: 'value', title: 'Internal Value (e.g. flute)', type: 'string' },
          ],
        },
      ],
      description: 'Categories for the filter bar. Make sure the "Internal Value" exactly matches the value you choose when uploading Gallery Items.',
    }),
    // Marquee Section
    defineField({
      name: 'marqueeTagline',
      title: 'Marquee Tagline',
      type: 'string',
      group: 'marquee',
      description: 'e.g. TRUSTED BY PREMIUM VENUES',
    }),
    defineField({
      name: 'marqueeTitle',
      title: 'Marquee Title',
      type: 'string',
      group: 'marquee',
      description: 'e.g. Performing at India’s Most Luxurious Properties',
    }),
    defineField({
      name: 'marqueeLogos',
      title: 'Partner Logos',
      type: 'array',
      group: 'marquee',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Venue / Brand Name', type: 'string' },
            { name: 'logo', title: 'Logo Image', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
      description: 'Upload logos (preferably PNGs with transparent backgrounds).',
    }),
    // Testimonials
    defineField({
      name: 'testimonialQuote',
      title: 'Testimonial Quote',
      type: 'text',
      group: 'testimonials',
    }),
    defineField({
      name: 'testimonialRole',
      title: 'Testimonial Role',
      type: 'string',
      group: 'testimonials',
    }),
    defineField({
      name: 'testimonialCompany',
      title: 'Testimonial Company',
      type: 'string',
      group: 'testimonials',
    }),
  ],
});
