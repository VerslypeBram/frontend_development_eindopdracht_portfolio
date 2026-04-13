'use client';

import { Icon } from '@iconify/react';

// devicon-plain for most icons (monochrome, consistent weight).
// mdi fallback for icons missing from devicon-plain: react, tailwindcss, github.
const iconMap: Record<string, string> = {
  react: 'mdi:react',
  typescript: 'devicon-plain:typescript',
  javascript: 'devicon-plain:javascript',
  'tailwind css': 'mdi:tailwind',
  'next.js': 'devicon-plain:nextjs',
  'node.js': 'devicon-plain:nodejs',
  python: 'devicon-plain:python',
  postgresql: 'devicon-plain:postgresql',
  mongodb: 'devicon-plain:mongodb',
  git: 'devicon-plain:git',
  github: 'mdi:github',
  docker: 'devicon-plain:docker',
  'vs code': 'devicon-plain:vscode',
  figma: 'devicon-plain:figma',
  html: 'devicon-plain:html5',
  css: 'devicon-plain:css3',
  linux: 'devicon-plain:linux',
  'rest apis': 'devicon-plain:swagger',
};

export default function SkillIcon({ name }: { name: string }) {
  const iconName = iconMap[name.toLowerCase()];
  if (!iconName) return null;
  return <Icon icon={iconName} className="w-4 h-4 shrink-0" />;
}
