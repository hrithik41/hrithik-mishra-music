import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO Settings' },
    { name: 'hero', title: 'Hero Section' },
    { name: 'stats', title: 'Stats Section' },
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
      name: 'heroTag',
      title: 'Hero Tag',
      type: 'string',
      group: 'hero',
      description: 'The small text above the title (e.g. PROFESSIONAL FLAUTIST & VOCALIST)',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title (White Text)',
      type: 'string',
      group: 'hero',
      description: 'The first part of the title, displayed in white.',
    }),
    defineField({
      name: 'heroTitleGold',
      title: 'Hero Title (Gold Text)',
      type: 'string',
      group: 'hero',
      description: 'The second part of the title, displayed in gold italics on a new line.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
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
            { name: 'value', title: 'Value (e.g. 15+)', type: 'string' },
            { name: 'label', title: 'Label (e.g. Years Experience)', type: 'string' },
          ],
        },
      ],
      description: 'Add statistical highlights to show on the home page.',
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
