import { client } from '@/sanity/lib/client'
import HeroSectionClient from './HeroSectionClient'
import { cloudinaryBlurUrl } from '@/app/lib/cloudinaryBlur'
import type { HeroData } from '@/app/types'

async function getHero(): Promise<HeroData | null> {
  try {
    return await client.fetch(
      `*[_type == "hero"][0]{tagline, name, bio, cloudinaryUrl}`,
      {},
      { next: { revalidate: 3600, tags: ['hero'] } },
    )
  } catch (error) {
    console.error('Error fetching hero data:', error)
    return null
  }
}

export default async function HeroSection() {
  const hero = await getHero()
  if (!hero) return null
  return (
    <HeroSectionClient
      hero={hero}
      blurUrl={cloudinaryBlurUrl(hero.cloudinaryUrl)}
    />
  )
}
