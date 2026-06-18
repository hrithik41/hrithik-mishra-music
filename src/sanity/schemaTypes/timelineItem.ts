import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'timelineItem',
  title: 'Timeline Item',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year or Duration',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      type: 'number',
      description: 'Lower numbers show up first',
    }),
  ],
  preview: {
    select: {
      title: 'role',
      subtitle: 'year',
    },
  },
});
