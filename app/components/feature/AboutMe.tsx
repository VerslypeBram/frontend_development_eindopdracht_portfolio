import { cacheLife } from 'next/cache';
import { client } from '@/sanity/lib/client';
import FanPhotoCarousel from './FanPhotoCarousel';

interface AboutMeData {
  subHeading: string;
  paragraph1: string;
  paragraph2: string;
  cloudinaryUrls?: string[];
}

async function getAboutMe(): Promise<AboutMeData | null> {
  'use cache';
  cacheLife('hours');
  return client.fetch(`*[_type == "aboutMe"][0]{subHeading, paragraph1, paragraph2, cloudinaryUrls}`);
}

export default async function AboutMe() {
  const data = await getAboutMe();

  if (!data) return null;

  return (
    <section id="about" className="w-full bg-neutral-100 dark:bg-neutral-900">
      <div className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-sm font-semibold tracking-wider text-amber-600 dark:text-amber-500 uppercase mb-3">About Me</h3>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Who I Am</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Column - Photo Carousel */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">{data.cloudinaryUrls && data.cloudinaryUrls.length > 0 && <FanPhotoCarousel photos={data.cloudinaryUrls.filter(Boolean)} name="Bram" />}</div>

          {/* Right Column - Large Card with Text */}
          <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:border-amber-500 dark:hover:border-amber-500">
            {data.subHeading && <h3 className="font-heading text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 leading-snug [&_span]:text-amber-600 dark:[&_span]:text-amber-500" dangerouslySetInnerHTML={{ __html: data.subHeading }} />}

            <div className="space-y-4 text-sm md:text-base text-gray-600 dark:text-gray-300 flex-1 flex flex-col justify-center leading-relaxed">
              {data.paragraph1 && <p>{data.paragraph1}</p>}
              {data.paragraph2 && <p>{data.paragraph2}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
