import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { SITE_URL } from './lib/site'

// Regenerate at most once per hour, so new projects show up even when the
// revalidation webhook does not reach this route.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await client.fetch<{ slug: string; updatedAt: string }[]>(
    `*[_type == "project" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`,
    {},
    { next: { revalidate, tags: ['projects'] } },
  )

  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    ...projects.map(({ slug, updatedAt }) => ({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified: updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
