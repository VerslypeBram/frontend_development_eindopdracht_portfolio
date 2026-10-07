'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted || !resolvedTheme) {
    return (
      <button
        className="invisible rounded-full border border-neutral-200 p-2.5 dark:border-neutral-800"
        aria-label="Theme Toggle loading"
        disabled
      >
        <Moon size={22} strokeWidth={1.5} />
      </button>
    )
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="relative overflow-hidden rounded-full border border-neutral-200 p-2.5 text-neutral-500 transition-colors hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
      aria-label="Dark mode"
      aria-pressed={currentTheme === 'dark'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {currentTheme === 'dark' ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex"
          >
            <Sun size={22} strokeWidth={1.5} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex"
          >
            <Moon size={22} strokeWidth={1.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
