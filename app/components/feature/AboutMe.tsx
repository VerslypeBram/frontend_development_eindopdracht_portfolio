import { sanityFetch } from '@/sanity/lib/live'
import FanPhotoCarousel from './FanPhotoCarousel'
import FadeIn from '@/app/components/common/FadeIn'
import { PortableText } from '@portabletext/react'
import type { AboutMeData } from '@/app/types'

async function getAboutMe(): Promise<AboutMeData | null> {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "aboutMe"][0]{subHeading, paragraph1, paragraph2, cloudinaryUrls[]{url, alt}}`,
      tags: ['aboutMe'],
    })
    return data as AboutMeData | null
  } catch (error) {
    console.error('Error fetching about me data:', error)
    return null
  }
}

export default async function AboutMe() {
  const data = await getAboutMe()

  if (!data) return null

  return (
    <section id="about" className="w-full bg-neutral-100 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <FadeIn className="mb-16 text-center">
          <h3
            className="mb-3 text-sm font-semibold tracking-wider text-amber-600 uppercase dark:text-amber-500"
            data-cursor-invert
          >
            About Me
          </h3>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl dark:text-white">
            Who I Am
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left Column - Photo Carousel */}
          <FadeIn
            delay={0.1}
            className="flex w-full justify-center lg:w-1/2 lg:justify-start"
          >
            {data.cloudinaryUrls && data.cloudinaryUrls.length > 0 && (
              <FanPhotoCarousel
                photos={data.cloudinaryUrls.filter(p => p && p.url)}
                name={data.name ?? 'Bram Verslype'}
              />
            )}
          </FadeIn>

          {/* Right Column - Large Card with Text */}
          <FadeIn delay={0.2} className="w-full lg:w-1/2">
            <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:border-amber-500 md:p-8 lg:p-10 dark:border-white/10 dark:bg-white/5 dark:hover:border-amber-500">
              {data.subHeading && (
                <div className="font-heading mb-4 text-xl leading-snug font-bold text-neutral-800 md:text-2xl dark:text-white [&_span]:text-amber-600 dark:[&_span]:text-amber-500">
                  <PortableText value={data.subHeading} />
                </div>
              )}

              <div className="flex flex-1 flex-col justify-center space-y-4 text-sm leading-relaxed text-neutral-600 md:text-base dark:text-neutral-300">
                {data.paragraph1 && <p>{data.paragraph1}</p>}
                {data.paragraph2 && <p>{data.paragraph2}</p>}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
