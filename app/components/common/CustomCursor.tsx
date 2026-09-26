'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { useCursorContext } from './CursorContext'

const RING_VARIANTS = {
  default: {
    width: 28,
    height: 28,
    borderWidth: 3,
    borderColor: 'rgb(245 158 11)',
    opacity: 0.85,
  },
  hover: {
    width: 44,
    height: 44,
    borderWidth: 3,
    borderColor: 'rgb(245 158 11)',
    opacity: 1,
  },
  text: {
    width: 3,
    height: 24,
    borderWidth: 3,
    borderColor: 'rgb(245 158 11)',
    opacity: 0.9,
  },
  drag: {
    width: 36,
    height: 36,
    borderWidth: 3,
    borderColor: 'rgb(255 255 255)',
    opacity: 0.9,
  },
}

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const visibleRef = useRef(false)
  const { variant, setVariant } = useCursorContext()

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  useEffect(() => {
    // Only track the mouse when the ring is shown: same condition as the
    // media query in globals.css (no touch devices, no reduced motion)
    if (typeof window === 'undefined') return
    const showRing = window.matchMedia(
      '(pointer: fine) and (prefers-reduced-motion: no-preference)',
    ).matches
    if (!showRing) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }
    }
    const hide = () => setVisible(false)
    const show = () => setVisible(true)

    const INTERACTIVE =
      'a, button, [role="button"], [tabindex]:not([tabindex="-1"]), input, textarea, select, label[for]'

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest(INTERACTIVE)
      if (el) setVariant('hover')
    }
    const onOut = (e: MouseEvent) => {
      const el = (e.target as Element).closest(INTERACTIVE)
      if (el) setVariant('default')
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', hide)
    window.addEventListener('mouseenter', show)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', hide)
      window.removeEventListener('mouseenter', show)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [x, y, setVariant])

  const rv = RING_VARIANTS[variant]

  return (
    // Ring around the native cursor — instant position, spring only on
    // size/opacity changes. The native cursor itself stays visible.
    <motion.div
      className="custom-cursor-element pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        border: `${rv.borderWidth}px solid ${rv.borderColor}`,
      }}
      animate={{
        width: rv.width,
        height: rv.height,
        opacity: visible ? rv.opacity : 0,
        borderColor: rv.borderColor,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    />
  )
}
