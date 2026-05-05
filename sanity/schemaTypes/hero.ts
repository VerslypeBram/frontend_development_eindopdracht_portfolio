import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short label above the heading, e.g. "Software Developer".',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description:
        'Your full name, displayed in the highlighted part of the heading.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
      description: 'Short introductory paragraph shown below the heading.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cloudinaryUrl',
      title: 'Cloudinary Image URL',
      type: 'url',
      description: 'Paste the optimised Cloudinary URL here.',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      description:
        'Descriptive text for the profile photo (important for SEO).',
    }),
  ],
})
