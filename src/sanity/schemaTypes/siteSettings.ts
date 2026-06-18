import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'hero', title: 'Hero Section' },
    { name: 'about', title: 'About Section' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'contact', title: 'Contact Info' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'hero',
    }),
    defineField({
      name: 'heroBackgroundImages',
      title: 'Hero Background Images',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Upload multiple images here to create a rotating carousel in the hero section (Desktop view).',
    }),
    defineField({
      name: 'heroBackgroundImagesMobile',
      title: 'Hero Background Images (Mobile)',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Upload portrait-oriented images for the mobile carousel. If left empty, desktop images will be used.',
    }),
    defineField({
      name: 'aboutPortraitImage',
      title: 'About Page Portrait Image',
      type: 'image',
      group: 'about',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'aboutBio',
      title: 'About Page Biography',
      type: 'array',
      group: 'about',
      of: [{ type: 'text' }],
      description: 'Add each paragraph as a new text item.',
    }),
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
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      group: 'contact',
    }),
  ],
});
