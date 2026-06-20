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
