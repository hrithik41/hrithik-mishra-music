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
      description: 'The name of the venue (e.g. Taj Lands End)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venueLogo',
      title: 'Venue Logo',
      type: 'image',
      description: 'Upload the official logo image (PNG with transparent background recommended).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / Subtitle',
      type: 'string',
      description: 'e.g. MUMBAI',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      description: 'Toggle to show the "FEATURED" badge on the card.',
      initialValue: false,
    }),

    defineField({
      name: 'previewText',
      title: 'Preview Text',
      type: 'text',
      description: 'The short description visible directly on the card.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'fullText',
      title: 'Full Text',
      type: 'text',
      description: 'The complete description shown when the card is expanded.',
    }),
    defineField({
      name: 'highlights',
      title: 'Experience Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points shown in the expanded view (e.g. "Lobby Ambience").',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        { type: 'image', options: { hotspot: true } },
        { 
          type: 'object',
          name: 'videoItem',
          title: 'Video',
          fields: [
            { 
              name: 'videoFile', 
              type: 'file',
              title: 'Upload Video File (MP4)',
              description: 'Upload a direct MP4 file. This will play beautifully without YouTube controls.',
              options: { accept: 'video/mp4,video/webm' }
            },
            { 
              name: 'url', 
              type: 'url',
              title: 'Or Paste Video URL (YouTube/Vimeo)',
              description: 'Use this only if you do not have an MP4 file to upload.'
            },
            { 
              name: 'thumbnail', 
              type: 'image',
              title: 'Video Thumbnail (Required for URLs)',
              description: 'An image to show before the video plays.',
              options: { hotspot: true }
            }
          ]
        }
      ],
    }),
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      type: 'number',
      description: 'Used to manually sort experiences in the grid.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'coverImage',
      featured: 'isFeatured'
    },
    prepare(selection) {
      const { title, subtitle, media, featured } = selection;
      return {
        title: `${title}${featured ? ' (Featured)' : ''}`,
        subtitle: subtitle,
        media: media,
      }
    }
  }
});
