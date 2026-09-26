'use client'

import Image from 'next/image'
import { ArrowRight, ChevronDown, FileDown } from 'lucide-react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef, useCallback, useState, useEffect } from 'react'
import AvailabilityBadge from '@/app/components/common/AvailabilityBadge'
import Button from '@/app/components/common/Button'
import type { HeroData } from '@/app/types'

// --- Animation Variants ---

/** Container that coordinates the stagger on the text children */
const textContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

/** Each text item slides softly upwards */
const textItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
}

/**
 * The profile photo is the LCP element, so it stays fully opaque from the
 * first paint and only settles into place with a subtle transform.
 */
const imageVariant = {
  hidden: { scale: 0.96, y: 16 },
  show: {
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const },
  },
}

// --- Typewriter ---

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [active, setActive] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    let interval: ReturnType<typeof setInterval>
    const startTimer = setTimeout(() => {
      setActive(true)
      let i = 0
      interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, 55)
    }, delay * 1000)

    return () => {
      clearTimeout(startTimer)
      clearInterval(interval)
    }
  }, [text, delay, prefersReducedMotion])

  // Reduced motion: show the full name at once, without the blinking cursor
  if (prefersReducedMotion) return <span>{text}</span>

  return (
    <span>
      {displayed}
      {active && (
        <motion.span
          animate={done ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
          transition={
            done ? { duration: 0.9, repeat: 3, ease: 'linear' } : undefined
          }
          className="ml-1 inline-block h-[0.9em] w-0.75 rounded-sm bg-amber-500 align-middle"
        />
      )}
    </span>
  )
}

// --- Component ---

export default function HeroSectionClient({
  hero,
  blurUrl,
  availability,
  cvUrl,
}: {
  hero: HeroData
  blurUrl?: string
  availability?: string
  cvUrl?: string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 150, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 150, damping: 20 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])

  const prefersReducedMotion = useReducedMotion()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      // No 3D tilt for users who prefer reduced motion
      if (prefersReducedMotion) return
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      rawX.set((e.clientX - rect.left) / rect.width - 0.5)
      rawY.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [rawX, rawY, prefersReducedMotion],
  )

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-4 md:flex-row md:gap-16 md:px-6">
        {/* Text column: stagger over children */}
        <motion.div
          className="flex flex-1 flex-col items-start gap-6"
          variants={textContainer}
          initial="hidden"
          animate="show"
        >
          {availability && (
            <motion.div variants={textItem}>
              <AvailabilityBadge>{availability}</AvailabilityBadge>
            </motion.div>
          )}

          {hero.tagline && (
            <motion.span
              variants={textItem}
              className="text-sm font-semibold tracking-widest text-neutral-600 uppercase dark:text-neutral-300"
            >
              {hero.tagline}
            </motion.span>
          )}

          <motion.h1
            variants={textItem}
            className="font-heading text-4xl leading-tight font-bold text-neutral-900 sm:text-5xl md:text-6xl dark:text-white"
          >
            Hi, I&apos;m{' '}
            {/* Full name in the server HTML for SEO and screen readers;
                the typewriter is a visual-only effect. */}
            <span className="sr-only">{hero.name}</span>
            <span
              className="text-amber-700 dark:text-amber-500"
              aria-hidden="true"
            >
              <TypewriterText text={hero.name} delay={0.5} />
            </span>
          </motion.h1>

          {hero.bio && (
            <motion.p
              variants={textItem}
              className="max-w-md text-base leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-300"
            >
              {hero.bio}
            </motion.p>
          )}

          <motion.div
            variants={textItem}
            className="mt-2 flex flex-wrap items-center gap-4"
          >
            <Button href="#projects">
              View My Work{' '}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-2"
              />
            </Button>
            {cvUrl ? (
              <Button href={cvUrl} external variant="outline">
                <FileDown size={16} aria-hidden="true" />
                Download CV
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </Button>
            ) : (
              <Button href="#about" variant="outline">
                About Me
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* Profile photo: follows last */}
        {hero.cloudinaryUrl && (
          <motion.div
            className="relative h-64 w-full max-w-xs shrink-0 overflow-hidden rounded-2xl shadow-xl sm:h-72 sm:w-64 md:h-96 md:w-80"
            variants={imageVariant}
            initial="hidden"
            animate="show"
            style={{ rotateX, rotateY, transformPerspective: 800 }}
          >
            <Image
              src={hero.cloudinaryUrl}
              alt={hero.imageAlt || `Photo of ${hero.name}`}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 256px, 320px"
              quality={80}
              className="object-cover transition-transform duration-500 motion-safe:hover:scale-[1.2]"
              priority
              placeholder={blurUrl ? 'blur' : 'empty'}
              blurDataURL={blurUrl}
            />
          </motion.div>
        )}
        {/* Scroll hint arrow */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-600 transition-colors duration-300 hover:text-amber-500 dark:text-neutral-300 dark:hover:text-amber-500"
          aria-label="Scroll to About Me"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: 4, ease: 'easeInOut' }}
          >
            <ChevronDown size={32} strokeWidth={2.5} />
          </motion.div>
        </motion.a>
      </div>
    </section>
  )
}
