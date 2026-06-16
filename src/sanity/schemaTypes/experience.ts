import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'experience',
  title: 'Performance Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Morning Ambience', value: 'morning' },
          { title: 'Sunset Lounge', value: 'sunset' },
          { title: 'Brunch Entertainment', value: 'brunch' },
          { title: 'Dinner Experience', value: 'dinner' },
          { title: 'Wedding Entry', value: 'wedding' },
          { title: 'Corporate Events', value: 'corporate' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Focus Areas (e.g. Breakfast, Wellness)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
