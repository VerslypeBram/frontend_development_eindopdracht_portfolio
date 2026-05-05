import type { PortableTextBlock } from 'next-sanity'

export interface Project {
  _id: string
  slug?: string
  title: string
  description: string
  longDescription?: PortableTextBlock[]
  cloudinaryUrl?: string
  imageAlt?: string
  tags?: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface AboutMeData {
  name?: string
  subHeading: PortableTextBlock[]
  paragraph1: string
  paragraph2: string
  cloudinaryUrls?: { url: string; alt?: string }[]
}

export interface HeroData {
  tagline: string
  name: string
  bio: string
  cloudinaryUrl: string
  imageAlt?: string
}

export interface SkillCategory {
  name: string
  description?: string
  skills: string[]
}

export interface SkillsData {
  skillCategories: SkillCategory[]
}
