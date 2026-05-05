'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCursorContext } from './CursorContext'

const DEFAULT_NAV_LINKS = [
  { href: '#about', label: 'About Me' },
  { href: '#skills', label: 'Expertise' },
  { href: '#projects', label: 'My Work' },
  { href: '#contact', label: 'Contact' },
]

interface NavBarProps {
  navLinks?: { label: string; href: string }[]
}

export default function NavBar({ navLinks }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const links = navLinks?.length ? navLinks : DEFAULT_NAV_LINKS
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const { setVariant } = useCursorContext()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 10)

      const offset = scrollY + 120
      let current: string | null = null
      for (const link of links) {
        if (link.href.startsWith('#')) {
          const id = link.href.substring(1)
          const el = document.getElementById(id)
          if (el && el.offsetTop <= offset) {
            current = id
          }
        }
      }
      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [links])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 flex w-full flex-col items-center justify-center transition-all duration-300 ${isScrolled || mobileOpen ? 'border-b border-neutral-200/50 bg-white/70 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/70 dark:shadow-neutral-950/50' : 'border-b border-transparent bg-transparent'}`}
    >
      <div className="flex h-16 w-full max-w-6xl items-center justify-between px-4 md:h-20 md:px-6">
        {/* Logo / Name */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-heading text-xl font-bold tracking-tight text-neutral-900 md:text-2xl dark:text-white"
          onMouseEnter={() => setVariant('hover')}
          onMouseLeave={() => setVariant('default')}
        >
          Bram Verslype
        </Link>

        {/* Desktop Navigation & Actions */}
        <div className="hidden items-center gap-8 md:flex">
          <nav>
            <ul className="flex items-center gap-6 text-base font-medium">
              {links.map(({ href, label }) => {
                const id = href.startsWith('#') ? href.substring(1) : null
                const isActive = id ? activeSection === id : false
                return (
                  <li key={href} className="relative pb-1">
                    <Link
                      href={href}
                      className={`transition-colors ${isActive ? 'text-neutral-900 dark:text-white' : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'}`}
                      onMouseEnter={() => setVariant('hover')}
                      onMouseLeave={() => setVariant('default')}
                    >
                      {label}
                    </Link>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-amber-500"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <ThemeToggle />
        </div>

        {/* Mobile: ThemeToggle + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <span className="sr-only">{mobileOpen ? 'Close' : 'Menu'}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-6 w-6"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="w-full overflow-hidden md:hidden"
          >
            <ul className="flex flex-col border-t border-neutral-200/50 px-4 pt-2 pb-4 dark:border-neutral-800">
              {links.map(({ href, label }) => {
                const id = href.startsWith('#') ? href.substring(1) : null
                const isActive = id ? activeSection === id : false
                return (
                  <li key={href} className="flex min-h-11 items-center">
                    <span className="relative pb-1">
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={`text-base font-medium transition-colors ${isActive ? 'text-neutral-900 dark:text-white' : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'}`}
                      >
                        {label}
                      </Link>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline-mobile"
                          className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-amber-500"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
