'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
  const links = navLinks?.length ? navLinks : DEFAULT_NAV_LINKS
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const { setVariant } = useCursorContext()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 10)

      const offset = scrollY + 120 // account for sticky navbar height + buffer
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

  return (
    <header
      className={`sticky top-0 z-50 flex h-20 w-full items-center justify-center transition-all duration-300 ${isScrolled ? 'border-b border-neutral-200/50 bg-white/70 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/70 dark:shadow-neutral-950/50' : 'border-b border-transparent bg-transparent'}`}
    >
      <div className="flex w-full max-w-6xl items-center justify-between px-6">
        {/* Logo / Name */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-heading text-2xl font-bold tracking-tight text-neutral-900 dark:text-white"
          onMouseEnter={() => setVariant('hover')}
          onMouseLeave={() => setVariant('default')}
        >
          Bram Verslype
        </Link>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-8">
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
      </div>
    </header>
  )
}
