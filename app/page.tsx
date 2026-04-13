import { Suspense } from 'react';

import HeroSection from './components/feature/HeroSection';
import AboutMe from './components/feature/AboutMe';
import SkillsSection from './components/feature/SkillsSection';
import ProjectsSection from './components/feature/ProjectsSection';

export default async function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Suspense>
        <HeroSection />
      </Suspense>

      <AboutMe />

      <SkillsSection />

      <ProjectsSection />
    </main>
  );
}
