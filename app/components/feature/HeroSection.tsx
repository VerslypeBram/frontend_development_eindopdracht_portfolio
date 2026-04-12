import { cacheLife } from 'next/cache';
import { ArrowRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import Button from '@/app/components/common/Button';
import FanPhotoCarousel from '@/app/components/feature/FanPhotoCarousel';

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

  // Combine the primary URL with any extra URLs into one ordered array
  const photos = [...(hero.cloudinaryUrl ? [hero.cloudinaryUrl] : []), ...(hero.cloudinaryUrls?.filter(Boolean) ?? [])];

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-16">
      {/* Text content */}
      <div className="flex-1 flex flex-col items-start gap-6">
        {hero.tagline && <span className="text-sm font-semibold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">{hero.tagline}</span>}

        <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight text-neutral-900 dark:text-white">
          Hi, I&apos;m <span className="text-amber-600 dark:text-amber-500">{hero.name}</span>
        </h1>

        {hero.bio && <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed">{hero.bio}</p>}

        <div className="flex items-center gap-4 mt-2">
          <Button href="#projects">
            View My Work <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-2" />
          </Button>
          <Button href="#about" variant="outline">
            About Me
          </Button>
        </div>
      </div>

      {/* Fan photo carousel */}
      {photos.length > 0 && <FanPhotoCarousel photos={photos} name={hero.name} />}
    </section>
  );
}
