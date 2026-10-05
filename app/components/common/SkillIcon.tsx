import StaticIcon from './StaticIcon'

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
  'c#': 'devicon-plain:csharp',
  '.net': 'devicon-plain:dot-net',
  'c#/.net': 'devicon-plain:dot-net',
  'c# / .net': 'devicon-plain:dot-net',
  azure: 'devicon-plain:azure',
  'microsoft azure': 'devicon-plain:azure',
  'asp.net core': 'devicon-plain:dotnetcore',
  mysql: 'devicon-plain:mysql',
  graphql: 'devicon-plain:graphql',
  grpc: 'devicon-plain:grpc',
  'socket.io': 'simple-icons:socketdotio',
  'raspberry pi': 'devicon-plain:raspberrypi',
  arduino: 'devicon-plain:arduino',
  'c++': 'devicon-plain:cplusplus',
  vite: 'devicon-plain:vitejs',
  'framer motion': 'simple-icons:framer',
  sanity: 'devicon-plain:sanity',
  vercel: 'simple-icons:vercel',
}

export default function SkillIcon({ name }: { name: string }) {
  const iconName = iconMap[name.toLowerCase()]
  if (!iconName) return null
  return <StaticIcon icon={iconName} className="h-4 w-4 shrink-0" />
}
