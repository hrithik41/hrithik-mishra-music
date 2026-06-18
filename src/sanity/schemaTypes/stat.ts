import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g., 8+, 100+',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subLabel',
      title: 'Sub Label',
      type: 'string',
    }),
    defineField({
      name: 'svgPath',
      title: 'SVG Path',
      type: 'text',
      description: 'The "d" attribute of an SVG path (e.g., M9 19V6l12-3...)',
    }),
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'value',
      subtitle: 'label',
    },
  },
});
