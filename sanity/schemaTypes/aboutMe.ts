import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutMe',
  title: 'About Me Section',
  type: 'document',
  fields: [
    defineField({
      name: 'subHeading',
      title: 'Sub-Heading',
      type: 'array',
      of: [{ type: 'block' }],
      description:
        'Sentence shown inside the card, optionally with a highlighted span (e.g. "From the circuit board to the source code").',
    }),
    defineField({
      name: 'paragraph1',
      title: 'Paragraph 1',
      type: 'text',
      description: 'First paragraph introducing yourself.',
    }),
    defineField({
      name: 'paragraph2',
      title: 'Paragraph 2',
      type: 'text',
      description: 'Second paragraph about your hobbies, interests, etc.',
    }),
    defineField({
      name: 'cloudinaryUrls',
      title: 'About Photos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'url', type: 'url', title: 'Cloudinary URL' },
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
      description: 'Photos that rotate in the About section carousel.',
    }),
  ],
})
