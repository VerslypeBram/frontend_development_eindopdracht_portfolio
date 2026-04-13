const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Korte Beschrijving',
      type: 'text',
    },
    {
      name: 'cloudinaryUrl',
      title: 'Cloudinary Afbeeldings-URL',
      type: 'url',
      description: 'Plak hier de geoptimaliseerde Cloudinary URL in',
    },
    {
      name: 'tags',
      title: 'Technologieën / Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bijv. TypeScript, React, Node.js',
    },
  ],
};

export default project;
