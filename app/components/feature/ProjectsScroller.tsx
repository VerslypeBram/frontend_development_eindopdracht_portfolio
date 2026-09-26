'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Tag from '@/app/components/common/Tag'
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
  const inner = (
    <>
      {project.cloudinaryUrl && (
        <div className="relative h-52 w-full">
          <Image
            src={project.cloudinaryUrl}
            alt={project.imageAlt || `Photo of ${project.title}`}
            fill
            sizes="(max-width: 768px) min(calc(100vw - 2rem), 320px), 384px"
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
                <Tag
                  key={`${tag}-${i}`}
                  className="cursor-default transition-all duration-200 hover:scale-[1.04] hover:border-amber-400 dark:hover:border-amber-500"
                >
                  {tag}
                </Tag>
              )
            })}
          </div>
        )}

        {project.slug && (
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-amber-700 dark:text-amber-500">
            View project
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover/card:translate-x-1"
            />
          </span>
        )}
      </div>
    </>
  )

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      whileHover={{ y: -8 }}
      className="group/card flex w-[min(calc(100vw-2rem),20rem)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-[border-color] duration-300 hover:border-amber-500 md:w-96 dark:border-white/10 dark:bg-white/5 dark:hover:border-amber-500"
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
        <ChevronLeft aria-hidden="true" className="h-5 w-5" />
      </button>

      <button
        onClick={() => scroll('right')}
        aria-label="Scroll right"
        className="absolute top-1/2 right-4 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-md transition-colors hover:border-amber-500 md:flex dark:border-white/10 dark:bg-neutral-800 dark:text-white dark:hover:border-amber-500"
      >
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </button>

      {/* Fade edges */}
      <div className="pointer-events-none absolute top-0 bottom-4 left-0 z-1 w-6 bg-linear-to-r from-neutral-100 to-transparent md:w-16 dark:from-neutral-900" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-4 z-1 w-6 bg-linear-to-l from-neutral-100 to-transparent md:w-16 dark:from-neutral-900" />

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto scroll-smooth px-4 pt-2 pb-4 [scrollbar-width:none] md:scroll-pl-16 md:gap-8 md:px-16 [&::-webkit-scrollbar]:hidden"
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
