'use client';

import Image from 'next/image';
import { useRef } from 'react';

interface Project {
  _id: string;
  title: string;
  description: string;
  cloudinaryUrl?: string;
  tags?: string[];
}

interface Props {
  projects: Project[];
}

export default function ProjectsScroller({ projects }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    // Haal de zichtbare breedte van de container op.
    // We scrollen de breedte van het scherm, minus een kleine marge,
    // zodat de gebruiker snapt dat er een 'vorige' kaart was.
    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative group">
      {/* Scroll buttons */}
      <button onClick={() => scroll('left')} aria-label="Scroll left" className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-white/10 shadow-md text-neutral-700 dark:text-white hover:border-amber-500 dark:hover:border-amber-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        </svg>
      </button>

      <button onClick={() => scroll('right')} aria-label="Scroll right" className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-white/10 shadow-md text-neutral-700 dark:text-white hover:border-amber-500 dark:hover:border-amber-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-4 w-6 md:w-16 bg-linear-to-r from-neutral-100 dark:from-neutral-900 to-transparent z-1 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-4 w-6 md:w-16 bg-linear-to-l from-neutral-100 dark:from-neutral-900 to-transparent z-1 pointer-events-none" />

      {/* Scrollable row */}
      <div ref={scrollRef} className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 md:px-16 scroll-pl-6 md:scroll-pl-16 pt-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((project) => (
          <div key={project._id} className="snap-start shrink-0 w-[calc(100vw-3rem)] sm:w-80 md:w-96 flex flex-col rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:border-amber-500 dark:hover:border-amber-500 overflow-hidden">
            {project.cloudinaryUrl && (
              <div className="relative w-full h-52">
                <Image src={project.cloudinaryUrl} alt={`Afbeelding van ${project.title}`} fill sizes="384px" className="object-cover" />
              </div>
            )}

            <div className="flex flex-col flex-1 p-8">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-neutral-800 dark:text-white mb-3 leading-snug">{project.title}</h3>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed flex-1">{project.description}</p>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-white/10 transition-all duration-200 cursor-default hover:scale-[1.04] hover:border-amber-400 dark:hover:border-amber-500">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
