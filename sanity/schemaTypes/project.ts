import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Unique URL identifier for the detail page.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description:
        'Position on the homepage (1 = first). Projects without a number come last, newest first.',
      validation: Rule => Rule.integer().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'longDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full case study — problem, approach, result.',
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
        'Descriptive text for the project image (important for SEO).',
    }),
    defineField({
      name: 'tags',
      title: 'Technologies / Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      description: 'e.g. TypeScript, React, Node.js',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Homepage order',
      name: 'homepageOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
