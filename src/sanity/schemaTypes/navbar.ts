import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'navbar',
  title: 'Navbar Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logoText',
      title: 'Navbar Logo Text',
      type: 'string',
      description: 'The main name displayed in the top left.',
    }),
    defineField({
      name: 'logoSubtitle',
      title: 'Navbar Logo Subtitle',
      type: 'string',
      description: 'The small text under the logo.',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { 
              name: 'href', 
              title: 'URL Path', 
              type: 'string',
              options: {
                list: [
                  { title: 'Home Page', value: '/' },
                  { title: 'About Page', value: '/about' },
                  { title: 'Experiences Page', value: '/experiences' },
                  { title: 'Gallery Page', value: '/gallery' },
                  { title: 'Videos Page', value: '/videos' },
                  { title: 'Residency Programs Page', value: '/residency-programs' },
                  { title: 'Contact Page', value: '/contact' },
                ],
              },
              description: 'Select the page this link should point to.',
            }
          ]
        }
      ]
    }),
  ],
});
