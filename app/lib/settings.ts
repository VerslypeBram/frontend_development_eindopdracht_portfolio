import { client } from '@/sanity/lib/client'

export interface SiteSettings {
  title: string
  navLinks: { label: string; href: string }[]
  socialLinks: { platform: string; url: string; icon: string }[]
  footerText?: string
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(
      `*[_type == "siteSettings"][0]{
        title,
        navLinks,
        socialLinks,
        footerText
      }`,
      {},
      { next: { revalidate: 3600, tags: ['siteSettings'] } },
    )
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}
