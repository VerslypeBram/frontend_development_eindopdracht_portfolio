import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { sanityFetch } from '@/sanity/lib/live'
import { cloudinaryBlurUrl } from '@/app/lib/cloudinaryBlur'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import StaticIcon from '@/app/components/common/StaticIcon'
import Tag from '@/app/components/common/Tag'
import type { Project } from '@/app/types'

async function getProject(slug: string): Promise<Project | null> {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "project" && slug.current == $slug][0]{_id, "slug": slug.current, title, description, longDescription, cloudinaryUrl, imageAlt, "tags": tags[]->name, githubUrl, liveUrl}`,
      params: { slug },
      tags: ['projects'],
    })
    return data as Project | null
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
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
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
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
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
              <div className="portable-text [&_h2]:font-heading [&_h3]:font-heading space-y-5 text-base leading-relaxed text-neutral-700 dark:text-neutral-300 [&_a]:text-amber-700 [&_a]:underline [&_a]:underline-offset-2 dark:[&_a]:text-amber-400 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-neutral-900 dark:[&_h2]:text-white [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-neutral-900 dark:[&_h3]:text-white [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_strong]:text-neutral-900 dark:[&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5">
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
                    <Tag key={tag}>{tag}</Tag>
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
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-lg"
                    >
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
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
                      <StaticIcon
                        icon="simple-icons:github"
                        className="h-4 w-4"
                      />
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
