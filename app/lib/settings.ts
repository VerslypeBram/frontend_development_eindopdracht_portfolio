import { sanityFetch } from '@/sanity/lib/live'

export interface SiteSettings {
  title: string
  navLinks: { label: string; href: string }[]
  socialLinks: { platform: string; url: string; icon: string }[]
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
