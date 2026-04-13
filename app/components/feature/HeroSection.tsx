import { cacheLife } from 'next/cache';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import Button from '@/app/components/common/Button';

interface HeroData {
  tagline: string;
  name: string;
  bio: string;
  cloudinaryUrl: string;
  cloudinaryUrls?: string[];
}

async function getHero(): Promise<HeroData | null> {
  'use cache';
  cacheLife('hours');
  return client.fetch(`*[_type == "hero"][0]{tagline, name, bio, cloudinaryUrl, cloudinaryUrls}`);
}

export default async function HeroSection() {
  const hero = await getHero();

  if (!hero) return null;

  return (
    <section className="min-h-screen w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-16">
      {/* Text content */}
      <div className="flex-1 flex flex-col items-start gap-6">
        {hero.tagline && <span className="text-sm font-semibold tracking-widest uppercase text-neutral-600 dark:text-neutral-400">{hero.tagline}</span>}

        <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight text-neutral-900 dark:text-white">
          Hi, I&apos;m <span className="text-amber-600 dark:text-amber-500">{hero.name}</span>
        </h1>

        {hero.bio && <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">{hero.bio}</p>}

        <div className="flex items-center gap-4 mt-2">
          <Button href="#projects">
            View My Work <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-2" />
          </Button>
          <Button href="#about" variant="outline">
            About Me
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      {hero.cloudinaryUrl && (
        <div className="shrink-0 relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
          <Image src={hero.cloudinaryUrl} alt={`Photo of ${hero.name}`} fill sizes="(max-width: 768px) 288px, 320px" className="object-cover transition-transform duration-500 hover:scale-120" priority />
        </div>
      )}
    </section>
  );
}
