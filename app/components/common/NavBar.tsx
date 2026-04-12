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
        <Link href="/" className="text-2xl font-bold font-heading text-neutral-900 dark:text-white tracking-tight">
          Bram Verslype
        </Link>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-8">
          <nav>
            <ul className="flex items-center gap-6 text-base md:text-lg text-neutral-500 dark:text-neutral-400 font-medium">
              <li>
                <a href="about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="skills" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="projects" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
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
