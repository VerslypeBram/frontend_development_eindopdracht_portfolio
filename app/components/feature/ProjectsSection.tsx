import Image from 'next/image';
import { cacheLife } from 'next/cache';
import { client } from '@/sanity/lib/client';
import ProjectsScroller from './ProjectsScroller';

interface Project {
  _id: string;
  title: string;
  description: string;
  cloudinaryUrl?: string;
  tags?: string[];
}

async function getProjects(): Promise<Project[]> {
  'use cache';
  cacheLife('hours');
  return client.fetch(`*[_type == "project"]{_id, title, description, cloudinaryUrl, tags}`);
}

export default async function ProjectsSection() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="w-full bg-neutral-100 dark:bg-neutral-900">
      <div className="py-24">
        <div className="text-center mb-16 px-6">
          <h3 className="text-sm font-semibold tracking-wider text-amber-600 dark:text-amber-500 uppercase mb-3">My Work</h3>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">Projects</h2>
        </div>

        <ProjectsScroller projects={projects} />
      </div>
    </section>
  );
}
