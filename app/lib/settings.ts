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
  availability?: string
  contactHeading?: string
  contactText?: string
  seoDescription?: string
  ogTagline?: string
  email?: string
  /** Public URL of the uploaded CV PDF */
  cvUrl?: string
  navLinks?: NavLink[]
  socialLinks?: SocialLink[]
  footerText?: string
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  // Errors propagate: a failed fetch must not be cached as "no settings"
  const { data } = await sanityFetch({
    query: `*[_type == "siteSettings"][0]{
        title,
        availability,
        contactHeading,
        contactText,
        seoDescription,
        ogTagline,
        email,
        "cvUrl": cvFile.asset->url,
        navLinks,
        socialLinks,
        footerText
      }`,
    tags: ['siteSettings'],
  })
  return data as SiteSettings | null
}
