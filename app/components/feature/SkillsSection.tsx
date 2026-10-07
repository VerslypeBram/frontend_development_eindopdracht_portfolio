import { sanityFetch } from '@/sanity/lib/live'
import SkillIcon from '@/app/components/common/SkillIcon'
import FadeIn from '@/app/components/common/FadeIn'
import Tag from '@/app/components/common/Tag'
import type { SkillsData } from '@/app/types'
import SectionHeading from '@/app/components/common/SectionHeading'

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
          <SectionHeading eyebrow="Expertise" title={'Skills & Technologies'} />
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.skillCategories?.map((category, index) => (
            <FadeIn key={category.name} delay={index * 0.1} amount={0.1}>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:border-amber-500 motion-safe:hover:-translate-y-2 dark:border-white/10 dark:bg-white/5 dark:hover:border-amber-500">
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
                    <Tag key={skill} className="flex items-center gap-2">
                      <SkillIcon name={skill} />
                      {skill}
                    </Tag>
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
