import { cacheLife } from 'next/cache';
import { client } from '@/sanity/lib/client';
import SkillIcon from '@/app/components/common/SkillIcon';

interface SkillCategory {
  name: string;
  description?: string;
  skills: string[];
}

interface SkillsData {
  preHeading?: string;
  heading?: string;
  skillCategories: SkillCategory[];
}

async function getSkills(): Promise<SkillsData | null> {
  'use cache';
  cacheLife('hours');
  return client.fetch(`*[_type == "skills"][0]`);
}

export default async function SkillsSection() {
  const data = await getSkills();

  if (!data) return null;

  return (
    <section id="skills" className="w-full bg-[#fafafa] dark:bg-[#0a0a0a]">
      <div className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-sm font-semibold tracking-wider text-amber-700 dark:text-amber-500 uppercase mb-3">{data.preHeading || 'EXPERTISE'}</h3>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">{data.heading || 'Skills & Technologies'}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.skillCategories?.map((category) => (
            <div key={category.name} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:border-amber-500 dark:hover:border-amber-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white">{category.name}</h3>
              </div>
              {category.description && <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">{category.description}</p>}
              <div className="grid grid-cols-2 gap-2">
                {category.skills?.map((skill) => (
                  <span key={skill} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/10 transition-all duration-200 cursor-default hover:scale-[1.04] hover:border-amber-400 dark:hover:border-amber-500">
                    <SkillIcon name={skill} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
