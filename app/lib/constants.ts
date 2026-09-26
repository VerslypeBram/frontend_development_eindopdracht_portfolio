import type { NavLink, SocialLink } from './settings'

// Fallbacks used when the Site Settings document in Sanity is empty.
// The CMS is the single source of truth; keep these in sync with it.

export const DEFAULT_EMAIL = 'bram.verslype@student.howest.be'

export const DEFAULT_NAV_LINKS: NavLink[] = [
  { href: '#about', label: 'About Me' },
  { href: '#skills', label: 'Expertise' },
  { href: '#projects', label: 'My Work' },
  { href: '#contact', label: 'Contact' },
]

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/VerslypeBram',
    icon: 'simple-icons:github',
    handle: '@VerslypeBram',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/bram-verslype-b27460408/',
    icon: 'simple-icons:linkedin',
    handle: 'Bram Verslype',
  },
]

/**
 * Social links from the CMS, falling back to the defaults. A CMS link without
 * a handle borrows the handle of the default link with the same URL.
 */
export function resolveSocialLinks(links?: SocialLink[] | null): SocialLink[] {
  if (!links?.length) return DEFAULT_SOCIAL_LINKS
  return links.map(link => ({
    ...link,
    handle:
      link.handle ?? DEFAULT_SOCIAL_LINKS.find(d => d.url === link.url)?.handle,
  }))
}
