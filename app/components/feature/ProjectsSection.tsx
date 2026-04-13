import Image from 'next/image';
import { cacheLife } from 'next/cache';
import { client } from '@/sanity/lib/client';

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
      <div className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-sm font-semibold tracking-wider text-amber-600 dark:text-amber-500 uppercase mb-3">My Work</h3>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project._id} className="flex flex-col rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:border-amber-500 dark:hover:border-amber-500 overflow-hidden">
              {project.cloudinaryUrl && (
                <div className="relative w-full h-52">
                  <Image src={project.cloudinaryUrl} alt={`Afbeelding van ${project.title}`} fill className="object-cover" />
                </div>
              )}

              <div className="flex flex-col flex-1 p-8">
                <h3 className="font-heading text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-3 leading-snug">{project.title}</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed flex-1">{project.description}</p>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/10 transition-all duration-200 cursor-default hover:scale-[1.04] hover:border-amber-400 dark:hover:border-amber-500">
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
    </section>
  );
}
