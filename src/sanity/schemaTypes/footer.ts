import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'footer',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
      initialValue: 'Hrithik Virendra Mishra'
    }),
    defineField({
      name: 'aboutSubtitle',
      title: 'About Section Subtitle',
      type: 'string',
      initialValue: 'Luxury Hospitality Artist'
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Section Description',
      type: 'text',
    }),
    defineField({
      name: 'directoryLinks',
      title: 'Directory Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            {
              name: 'href',
              type: 'string',
              title: 'URL/Path',
              options: {
                list: [
                  { title: 'Home', value: '/' },
                  { title: 'Artist Story (About)', value: '/about' },
                  { title: 'Performance Portfolio (Experiences)', value: '/experiences' },
                  { title: 'Residency Programs', value: '/residency-programs' },
                  { title: 'Moments Gallery', value: '/gallery' },
                  { title: 'Videos', value: '/videos' },
                  { title: 'Contact', value: '/contact' },
                ],
              },
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number (with country code)',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform Name',
              options: {
                list: [
                  { title: 'Instagram', value: 'Instagram' },
                  { title: 'YouTube', value: 'YouTube' },
                  { title: 'Twitter', value: 'Twitter' },
                  { title: 'Facebook', value: 'Facebook' },
                  { title: 'LinkedIn', value: 'LinkedIn' },
                ],
              },
            },
            { name: 'url', type: 'url', title: 'URL' }
          ]
        }
      ]
    }),
  ],
});
