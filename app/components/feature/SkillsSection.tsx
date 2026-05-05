import { sanityFetch } from '@/sanity/lib/live'
import SkillIcon from '@/app/components/common/SkillIcon'
import FadeIn from '@/app/components/common/FadeIn'
import type { SkillsData } from '@/app/types'

async function getSkills(): Promise<SkillsData | null> {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "skills"][0]{skillCategories}`,
      tags: ['skills'],
    })
    return data as SkillsData | null
  } catch (error) {
    console.error('Error fetching skills data:', error)
    return null
  }
}

export default async function SkillsSection() {
  const data = await getSkills()

  if (!data) return null

  return (
    <section id="skills" className="bg-background w-full">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <FadeIn className="mb-16 text-center">
          <h3
            className="mb-3 text-sm font-semibold tracking-wider text-amber-600 uppercase dark:text-amber-500"
            data-cursor-invert
          >
            EXPERTISE
          </h3>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
            Skills & Technologies
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.skillCategories?.map((category, index) => (
            <FadeIn key={category.name} delay={index * 0.1} amount={0.1}>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:border-amber-500 dark:border-white/10 dark:bg-white/5 dark:hover:border-amber-500">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" />
                  <h3 className="font-heading text-lg font-bold text-neutral-900 dark:text-white">
                    {category.name}
                  </h3>
                </div>
                {category.description && (
                  <p className="mb-5 text-sm text-neutral-600 dark:text-neutral-300">
                    {category.description}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-2">
                  {category.skills?.map(skill => (
                    <span
                      key={skill}
                      className="flex cursor-default items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-all duration-200 hover:scale-[1.04] hover:border-amber-400 dark:border-white/10 dark:bg-white/10 dark:text-neutral-200 dark:hover:border-amber-500"
                    >
                      <SkillIcon name={skill} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
