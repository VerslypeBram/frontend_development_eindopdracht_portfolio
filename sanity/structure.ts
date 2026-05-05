import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = S =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('hero').title('Hero Section'),
      S.documentTypeListItem('aboutMe').title('About Me'),
      S.documentTypeListItem('skills').title('Skills & Technologies'),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('tag').title('Tags'),
    ])
