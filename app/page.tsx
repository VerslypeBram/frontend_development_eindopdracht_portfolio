import Image from 'next/image';
import { cacheLife } from 'next/cache';
import { Suspense } from 'react';

import { dataset, projectId } from '../sanity/env';
import HeroSection from './components/feature/HeroSection';
interface Project {
  _id: string;
  title: string;
  description: string;
  cloudinaryUrl: string;
}

async function getProjects(): Promise<Project[]> {
  'use cache';
  cacheLife('hours');

  const query = encodeURIComponent('*[_type == "project"]{_id, title, description, cloudinaryUrl}');
  const url = `https://${projectId}.api.sanity.io/v2022-03-07/data/query/${dataset}?query=${query}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  const { result } = await response.json();
  return result;
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen font-sans">
      <Suspense>
        <HeroSection />
      </Suspense>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project._id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
            {project.cloudinaryUrl && (
              <div className="relative w-full h-48 mb-4">
                <Image src={project.cloudinaryUrl} alt={`Afbeelding van ${project.title}`} fill className="object-cover rounded-md" />
              </div>
            )}
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
