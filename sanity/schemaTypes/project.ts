import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Korte Beschrijving',
      type: 'text',
    }),
    defineField({
      name: 'cloudinaryUrl',
      title: 'Cloudinary Afbeeldings-URL',
      type: 'url',
      description: 'Plak hier de geoptimaliseerde Cloudinary URL in',
    }),
    defineField({
      name: 'tags',
      title: 'Technologieën / Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bijv. TypeScript, React, Node.js',
    }),
  ],
});
