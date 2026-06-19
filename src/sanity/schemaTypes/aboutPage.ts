import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutPortraitImage',
      title: 'Portrait Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'aboutBio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'text' }],
    }),
  ],
});
