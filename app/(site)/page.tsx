import { Suspense } from 'react'

import HeroSection from '../components/feature/HeroSection'
import AboutMe from '../components/feature/AboutMe'
import SkillsSection from '../components/feature/SkillsSection'
import ProjectsSection from '../components/feature/ProjectsSection'
import ContactSection from '../components/feature/ContactSection'
import {
  HeroSkeleton,
  AboutMeSkeleton,
  SkillsSkeleton,
  ProjectsSkeleton,
} from '../components/common/Skeletons'

export default async function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<AboutMeSkeleton />}>
        <AboutMe />
      </Suspense>

      <Suspense fallback={<SkillsSkeleton />}>
        <SkillsSection />
      </Suspense>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsSection />
      </Suspense>

      {/* ContactSection fetches no data — no Suspense needed */}
      <ContactSection />
    </div>
  )
}
