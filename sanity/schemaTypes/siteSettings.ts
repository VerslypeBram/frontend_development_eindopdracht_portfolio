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
        'Optional short status with a green dot, shown in the hero and contact section. Leave empty to hide.',
    }),
    defineField({
      name: 'contactHeading',
      title: 'Contact Heading',
      type: 'string',
      description: 'Heading of the contact section, e.g. "Get in Touch".',
    }),
    defineField({
      name: 'contactText',
      title: 'Contact Text',
      type: 'text',
      rows: 2,
      description: 'Short invitation shown above the email address.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description:
        'Shown in Google results and link previews. Aim for 120 to 160 characters.',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: 'ogTagline',
      title: 'Link Preview Tagline',
      type: 'string',
      description:
        'One line under your name in the link preview image (LinkedIn, Slack, …).',
      validation: Rule => Rule.max(60),
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
