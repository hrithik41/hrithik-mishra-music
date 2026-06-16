import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'residencyProgram',
  title: 'Residency Program',
  type: 'document',
  fields: [
    defineField({
      name: 'programName',
      title: 'Program Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (e.g. 2 Hours Daily)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pricingStructure',
      title: 'Commercial Tier (e.g. Daily Rate, Monthly Contract)',
      type: 'string',
    }),
    defineField({
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
