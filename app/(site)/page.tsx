import { Suspense } from 'react';

import HeroSection from '../components/feature/HeroSection';
import AboutMe from '../components/feature/AboutMe';
import SkillsSection from '../components/feature/SkillsSection';
import ProjectsSection from '../components/feature/ProjectsSection';
import ContactSection from '../components/feature/ContactSection';

export default async function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Suspense>
        <HeroSection />
      </Suspense>

      <Suspense>
        <AboutMe />
      </Suspense>

      <Suspense>
        <SkillsSection />
      </Suspense>

      <Suspense>
        <ProjectsSection />
      </Suspense>

      <ContactSection />
    </div>
  );
}
