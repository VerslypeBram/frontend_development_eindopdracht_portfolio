import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { cloudinaryBlurUrl } from '@/app/lib/cloudinaryBlur'
import type { Project } from '@/app/types'

async function getProject(slug: string): Promise<Project | null> {
  try {
    return await client.fetch(
      `*[_type == "project" && slug.current == $slug][0]{_id, "slug": slug.current, title, description, longDescription, cloudinaryUrl, imageAlt, "tags": tags[]->name, githubUrl, liveUrl}`,
      { slug },
      { next: { revalidate: 3600, tags: ['projects'] } },
    )
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(
    `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`,
    {},
    { next: { tags: ['projects'] } },
  )
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: `${project.title} — Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.cloudinaryUrl ? [{ url: project.cloudinaryUrl }] : [],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) notFound()

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        {/* Back button */}
        <Link
          href="/#projects"
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:border-amber-500 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:border-amber-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          Back to projects
        </Link>

        {/* Hero image */}
        <div className="relative mb-10 aspect-16/7 w-full overflow-hidden rounded-2xl shadow-xl">
          {project.cloudinaryUrl ? (
            <Image
              src={project.cloudinaryUrl}
              alt={project.imageAlt || `Photo of ${project.title}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              quality={85}
              className="object-cover"
              placeholder={
                cloudinaryBlurUrl(project.cloudinaryUrl) ? 'blur' : 'empty'
              }
              blurDataURL={cloudinaryBlurUrl(project.cloudinaryUrl)}
            />
          ) : (
            <div className="h-full w-full bg-neutral-200 dark:bg-neutral-800" />
          )}
          {/* Gradient overlay for title */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          {/* Title overlay */}
          <div className="absolute right-0 bottom-0 left-0 px-8 pb-8">
            <p className="mb-2 text-sm font-semibold tracking-wider text-amber-400 uppercase">
              Project
            </p>
            <h1 className="font-heading text-2xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {project.longDescription && project.longDescription.length > 0 ? (
              <div className="portable-text [&_h2]:font-heading [&_h3]:font-heading space-y-5 text-base leading-relaxed text-neutral-700 dark:text-neutral-300 [&_a]:text-amber-600 [&_a]:underline [&_a]:underline-offset-2 dark:[&_a]:text-amber-400 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-neutral-900 dark:[&_h2]:text-white [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-neutral-900 dark:[&_h3]:text-white [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_strong]:text-neutral-900 dark:[&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5">
                <PortableText value={project.longDescription} />
              </div>
            ) : (
              <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
                {project.description}
              </p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div>
                <h2 className="font-heading mb-4 text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                  Technologies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {(project.liveUrl || project.githubUrl) && (
              <div>
                <h2 className="font-heading mb-4 text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                  Links
                </h2>
                <div className="flex flex-col gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-lg dark:bg-amber-500 dark:hover:bg-amber-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      View live
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-lg dark:border-white/20 dark:text-white dark:hover:border-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
