import { sanityFetch } from '@/sanity/lib/live'

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  platform: string
  url: string
  /** Iconify name, e.g. "mdi:github" */
  icon?: string
  /** Visible handle, e.g. "@VerslypeBram" */
  handle?: string
}

export interface SiteSettings {
  title: string
  navLinks?: NavLink[]
  socialLinks?: SocialLink[]
  footerText?: string
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "siteSettings"][0]{
        title,
        navLinks,
        socialLinks,
        footerText
      }`,
      tags: ['siteSettings'],
    })
    return data as SiteSettings | null
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}
