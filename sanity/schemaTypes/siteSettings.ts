import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Bram Verslype Portfolio',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      description:
        'Short status shown in the hero and contact section, e.g. "Looking for an internship · 15 Feb – 4 Jun 2027 · Kortrijk area". Leave empty to hide.',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Shown as text and used for the email button.',
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: 'cvFile',
      title: 'CV (PDF)',
      type: 'file',
      options: { accept: 'application/pdf' },
      description:
        'Upload your CV. A "Download CV" button appears in the hero and contact section.',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            {
              name: 'href',
              title: 'URL (e.g. #projects or /about)',
              type: 'string',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform Name', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            {
              name: 'icon',
              title: 'Iconify Icon (e.g. mdi:github)',
              type: 'string',
            },
            {
              name: 'handle',
              title: 'Handle (e.g. @VerslypeBram)',
              type: 'string',
              description: 'Shown next to the icon in the contact section.',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      description: 'Extra text for the footer (optional)',
    }),
  ],
})
