import { sanityFetch } from '@/sanity/lib/live'
import ProjectsScroller from './ProjectsScroller'
import FadeIn from '@/app/components/common/FadeIn'
import type { Project } from '@/app/types'
import SectionHeading from '@/app/components/common/SectionHeading'

async function getProjects(): Promise<Project[]> {
  try {
    const { data } = await sanityFetch({
      // No longDescription here: it is only needed on the detail page and would
      // otherwise be serialized into the client-side ProjectsScroller props.
      query: `*[_type == "project"] | order(coalesce(order, 999) asc, _createdAt desc){_id, "slug": slug.current, title, description, cloudinaryUrl, imageAlt, "tags": tags[]->name, githubUrl, liveUrl}`,
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
          <SectionHeading eyebrow="My Work" title="Projects" />
        </FadeIn>

        <ProjectsScroller projects={projects} />
      </div>
    </section>
  )
}
