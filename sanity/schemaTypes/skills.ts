const skills = {
  name: 'skills',
  title: 'Skills & Technologies',
  type: 'document',
  fields: [
    {
      name: 'preHeading',
      title: 'Pre-heading',
      type: 'string',
      description: 'Small label above the main heading, e.g. "EXPERTISE".',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main section heading, e.g. "Skills & Technologies".',
    },
    {
      name: 'skillCategories',
      title: 'Skill Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Category Name',
              type: 'string',
              description: 'e.g. "Frontend", "Backend", "Tools"',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Short subtitle, e.g. "Building responsive, interactive UIs"',
            },
            {
              name: 'skills',
              title: 'Skills',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'List of skill names in this category.',
            },
          ],
          preview: {
            select: { title: 'name' },
          },
        },
      ],
    },
  ],
};

export default skills;
