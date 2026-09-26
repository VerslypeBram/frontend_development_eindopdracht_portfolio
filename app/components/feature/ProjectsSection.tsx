import { sanityFetch } from '@/sanity/lib/live'
import ProjectsScroller from './ProjectsScroller'
import FadeIn from '@/app/components/common/FadeIn'
import type { Project } from '@/app/types'

async function getProjects(): Promise<Project[]> {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "project"]{_id, "slug": slug.current, title, description, longDescription, cloudinaryUrl, imageAlt, "tags": tags[]->name, githubUrl, liveUrl}`,
      tags: ['projects'],
    })
    return (data as Project[]) ?? []
  } catch (error) {
    console.error('Error fetching projects data:', error)
    return []
  }
}

export default async function ProjectsSection() {
  const projects = await getProjects()

  if (projects.length === 0) return null

  return (
    <section
      id="projects"
      className="w-full bg-neutral-100 dark:bg-neutral-900"
    >
      <div className="py-24">
        <FadeIn className="mb-16 px-6 text-center">
          <p className="mb-3 text-sm font-semibold tracking-wider text-amber-700 uppercase dark:text-amber-500">
            My Work
          </p>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
            Projects
          </h2>
        </FadeIn>

        <ProjectsScroller projects={projects} />
      </div>
    </section>
  )
}
