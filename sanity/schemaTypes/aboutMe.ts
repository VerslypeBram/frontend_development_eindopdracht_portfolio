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
        'Zin onder of in de tekst met evt. span (bijv. From the circuit board to the source code).',
    }),
    defineField({
      name: 'paragraph1',
      title: 'Alinea 1',
      type: 'text',
      description: 'De eerste alinea van jezelf.',
    }),
    defineField({
      name: 'paragraph2',
      title: 'Alinea 2',
      type: 'text',
      description: "De tweede alinea over je hobby's etc.",
    }),
    defineField({
      name: 'cloudinaryUrls',
      title: 'Foto-URLs voor waaier (About carousel)',
      type: 'array',
      of: [{ type: 'url' }],
      description:
        "Foto's die in de carousel animatie rouleren in de Aboutsectie.",
    }),
  ],
})
