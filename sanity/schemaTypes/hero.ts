const hero = {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short label above the heading, e.g. "Software Developer".',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Your full name, displayed in the highlighted part of the heading.',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
      description: 'Short introductory paragraph shown below the heading.',
    },
    {
      name: 'cloudinaryUrl',
      title: 'Cloudinary Afbeeldings-URL (hoofdfoto)',
      type: 'url',
      description: 'Plak hier de geoptimaliseerde Cloudinary URL in.',
    },
  ],
};

export default hero;
