import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'skills',
  title: 'Skills & Technologies',
  type: 'document',
  fields: [
    defineField({
      name: 'skillCategories',
      title: 'Skill Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Category Name',
              type: 'string',
              description: 'e.g. "Frontend", "Backend", "Tools"',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Short subtitle, e.g. "Building responsive, interactive UIs"',
            }),
            defineField({
              name: 'skills',
              title: 'Skills',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'List of skill names in this category.',
            }),
          ],
          preview: {
            select: { title: 'name' },
          },
        },
      ],
    }),
  ],
});
