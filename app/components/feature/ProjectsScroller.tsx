'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '@/app/types'

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: Project
  index: number
  isInView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const inner = (
    <>
      {project.cloudinaryUrl && (
        <div className="relative h-52 w-full">
          <Image
            src={project.cloudinaryUrl}
            alt={`Afbeelding van ${project.title}`}
            fill
            sizes="384px"
            quality={80}
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-8">
        <h3 className="font-heading mb-3 text-xl leading-snug font-bold text-neutral-800 md:text-2xl dark:text-white">
          {project.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-neutral-600 md:text-base dark:text-neutral-300">
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag, i) => {
              if (!tag) return null
              return (
                <span
                  key={`${tag}-${i}`}
                  className="cursor-default rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-all duration-200 hover:scale-[1.04] hover:border-amber-400 dark:border-white/10 dark:bg-white/10 dark:text-neutral-200 dark:hover:border-amber-500"
                >
                  {tag}
                </span>
              )
            })}
          </div>
        )}

        {project.slug && (
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-500">
            Bekijk project
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 transition-transform duration-200 group-hover/card:translate-x-1"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
      </div>
    </>
  )

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      whileHover={{ y: -8 }}
      className="group/card flex w-[calc(100vw-3rem)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-[border-color] duration-300 hover:border-amber-500 sm:w-80 md:w-96 dark:border-white/10 dark:bg-white/5 dark:hover:border-amber-500"
      data-cursor-invert
    >
      {project.slug ? (
        <Link
          href={`/projects/${project.slug}`}
          className="flex flex-1 flex-col"
        >
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.div>
  )
}

interface Props {
  projects: Project[]
}

export default function ProjectsScroller({ projects }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -200px 0px',
  })

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return

    // Haal de zichtbare breedte van de container op.
    // We scrollen de breedte van het scherm, minus een kleine marge,
    // zodat de gebruiker snapt dat er een 'vorige' kaart was.
    const scrollAmount = container.clientWidth * 0.8

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div ref={sectionRef} className="group relative">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        className="absolute top-1/2 left-4 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-md transition-colors hover:border-amber-500 md:flex dark:border-white/10 dark:bg-neutral-800 dark:text-white dark:hover:border-amber-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <button
        onClick={() => scroll('right')}
        aria-label="Scroll right"
        className="absolute top-1/2 right-4 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-md transition-colors hover:border-amber-500 md:flex dark:border-white/10 dark:bg-neutral-800 dark:text-white dark:hover:border-amber-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Fade edges */}
      <div className="pointer-events-none absolute top-0 bottom-4 left-0 z-1 w-6 bg-linear-to-r from-neutral-100 to-transparent md:w-16 dark:from-neutral-900" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-4 z-1 w-6 bg-linear-to-l from-neutral-100 to-transparent md:w-16 dark:from-neutral-900" />

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory scroll-pl-6 gap-6 overflow-x-auto scroll-smooth px-6 pt-2 pb-4 [scrollbar-width:none] md:scroll-pl-16 md:gap-8 md:px-16 [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project._id}
            project={project}
            index={i}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  )
}
