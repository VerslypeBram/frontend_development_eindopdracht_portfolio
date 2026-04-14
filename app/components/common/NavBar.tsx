'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full h-20 flex items-center justify-center sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-neutral-200/50 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md shadow-sm dark:shadow-neutral-950/50' : 'bg-transparent border-b border-transparent'}`}>
      <div className="w-full max-w-6xl px-6 flex items-center justify-between">
        {/* Logo / Name */}
        <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-2xl font-bold font-heading text-neutral-900 dark:text-white tracking-tight">
          Bram Verslype
        </Link>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-8">
          <nav>
            <ul className="flex items-center gap-6 text-base text-neutral-600 dark:text-neutral-300 font-medium">
              <li>
                <a href="#about" className="hover:text-neutral-900 dark:hover:text-white transition-colors underline-offset-4 decoration-amber-500 hover:underline hover:decoration-2">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-neutral-900 dark:hover:text-white transition-colors underline-offset-4 decoration-amber-500 hover:underline hover:decoration-2">
                  Expertise
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-neutral-900 dark:hover:text-white transition-colors underline-offset-4 decoration-amber-500 hover:underline hover:decoration-2">
                  My Work
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors underline-offset-4 decoration-amber-500 hover:underline hover:decoration-2">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
