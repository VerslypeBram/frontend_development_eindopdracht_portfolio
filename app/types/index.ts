import type { PortableTextBlock } from 'next-sanity'

export interface Project {
  _id: string
  slug?: string
  title: string
  description: string
  longDescription?: PortableTextBlock[]
  cloudinaryUrl?: string
  tags?: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface AboutMeData {
  name?: string
  subHeading: PortableTextBlock[]
  paragraph1: string
  paragraph2: string
  cloudinaryUrls?: string[]
}

export interface HeroData {
  tagline: string
  name: string
  bio: string
  cloudinaryUrl: string
}

export interface SkillCategory {
  name: string
  description?: string
  skills: string[]
}

export interface SkillsData {
  skillCategories: SkillCategory[]
}
