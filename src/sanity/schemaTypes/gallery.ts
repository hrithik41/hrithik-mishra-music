import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Event Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Tag',
      type: 'string',
      options: {
        list: [
          { title: 'Flute Performances', value: 'flute' },
          { title: 'Live Singing', value: 'singing' },
          { title: 'Hospitality', value: 'hospitality' },
          { title: 'Weddings', value: 'weddings' },
          { title: 'Corporate Events', value: 'corporate' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'High-Res Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
