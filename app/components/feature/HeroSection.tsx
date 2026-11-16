import { sanityFetch } from '@/sanity/lib/live'
import HeroSectionClient from './HeroSectionClient'
import { cloudinaryBlurUrl } from '@/app/lib/cloudinaryBlur'
import { getSiteSettings } from '@/app/lib/settings'
import type { HeroData } from '@/app/types'

async function getHero(): Promise<HeroData | null> {
  // Errors propagate to error.tsx instead of caching an empty hero
  const { data } = await sanityFetch({
    query: `*[_type == "hero"][0]{tagline, name, bio, cloudinaryUrl, imageAlt}`,
    tags: ['hero'],
  })
  return data as HeroData | null
}

export default async function HeroSection() {
  const [hero, settings] = await Promise.all([getHero(), getSiteSettings()])
  if (!hero) return null
  return (
    <HeroSectionClient
      hero={hero}
      blurUrl={cloudinaryBlurUrl(hero.cloudinaryUrl)}
      availability={settings?.availability}
      cvUrl={settings?.cvUrl}
    />
  )
}
