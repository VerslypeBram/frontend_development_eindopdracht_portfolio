const aboutMe = {
  name: 'aboutMe',
  title: 'About Me Section',
  type: 'document',
  fields: [
    {
      name: 'preHeading',
      title: 'Pre-Heading',
      type: 'string',
      description: 'Korte label boven de hoofdtitel, bijv. "About Me".',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'De grote hoofdtitel, bijv. "Who I Am".',
    },
    {
      name: 'subHeading',
      title: 'Sub-Heading',
      type: 'string',
      description: 'Zin onder of in de tekst met evt. span (bijv. From the circuit board to the source code).',
    },
    {
      name: 'paragraph1',
      title: 'Alinea 1',
      type: 'text',
      description: 'De eerste alinea van jezelf.',
    },
    {
      name: 'paragraph2',
      title: 'Alinea 2',
      type: 'text',
      description: 'De tweede alinea over je hobby\'s etc.',
    },
    {
      name: 'cloudinaryUrls',
      title: 'Foto-URLs voor waaier (About carousel)',
      type: 'array',
      of: [{ type: 'url' }],
      description: "Foto's die in de carousel animatie rouleren in de Aboutsectie.",
    },
  ],
};

export default aboutMe;
