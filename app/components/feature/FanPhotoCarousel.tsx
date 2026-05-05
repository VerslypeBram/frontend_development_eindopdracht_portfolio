'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Rotation (deg) and visual offset per stack position (0 = front)
const STACK_STYLES: { rotation: number; scale: number; opacity: number }[] = [
  { rotation: 0, scale: 1, opacity: 1 },
  { rotation: 8, scale: 0.97, opacity: 0.75 },
  { rotation: 14, scale: 0.94, opacity: 0.55 },
  { rotation: 18, scale: 0.91, opacity: 0.4 },
]

interface FanPhotoCarouselProps {
  photos: { url: string; alt?: string }[]
  name: string
}

export default function FanPhotoCarousel({
  photos,
  name,
}: FanPhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (photos.length <= 1) return
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % photos.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [photos.length])

  if (!photos.length) return null

  return (
    <div className="shrink-0">
      <div className="relative h-72 w-64 sm:h-80 sm:w-72 md:h-96 md:w-80">
        {photos.map((photo, i) => {
          // How many steps behind the active card is this card?
          const position = (i - activeIndex + photos.length) % photos.length
          const style =
            STACK_STYLES[Math.min(position, STACK_STYLES.length - 1)]

          return (
            <motion.div
              key={i}
              className="absolute inset-0 origin-bottom overflow-hidden rounded-2xl bg-neutral-200 shadow-xl dark:bg-neutral-800"
              animate={{
                rotate: style.rotation,
                scale: style.scale,
                opacity: style.opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
              }}
              style={{ zIndex: photos.length - position }}
            >
              <Image
                src={photo.url}
                alt={photo.alt || `Photo of ${name}`}
                fill
                sizes="(max-width: 480px) 256px, (max-width: 768px) 288px, 320px"
                quality={80}
                className="object-cover"
                priority={position === 0}
              />
            </motion.div>
          )
        })}
      </div>
      {/* Dot indicators */}
      {photos.length > 1 && (
        <div className="mt-4 flex justify-center gap-1">
          {photos.map((photo, i) => (
            <button
              key={photo.url}
              onClick={() => setActiveIndex(i)}
              aria-label={`Photo ${i + 1}`}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-4 bg-amber-500' : 'w-2 bg-neutral-300 hover:bg-amber-400 dark:bg-neutral-600'}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
