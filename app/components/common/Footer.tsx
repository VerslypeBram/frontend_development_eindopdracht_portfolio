import Link from 'next/link'
import CurrentYear from './CurrentYear'
import FadeIn from './FadeIn'

const DEFAULT_SOCIAL_LINKS = [
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/bram-verslype-b27460408/',
  },
  { platform: 'GitHub', url: 'https://github.com/VerslypeBram' },
]

interface FooterProps {
  socialLinks?: { platform: string; url: string; icon?: string }[]
  footerText?: string
}

export default function Footer({ socialLinks, footerText }: FooterProps) {
  const socials = socialLinks?.length ? socialLinks : DEFAULT_SOCIAL_LINKS

  return (
    <footer className="bg-background w-full pt-12 pb-0 transition-colors">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeIn>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {/* Logo & Info */}
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="font-heading text-2xl font-bold tracking-tight text-neutral-900 dark:text-white"
              >
                Bram Verslype
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {footerText ||
                  'Design-minded developer focused on building beautiful, interactive digital experiences.'}
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold tracking-wider text-neutral-900 uppercase dark:text-white">
                Navigation
              </h2>
              <ul className="flex flex-col gap-2">
                {[
                  { name: 'About Me', href: '#about' },
                  { name: 'Expertise', href: '#skills' },
                  { name: 'My Work', href: '#projects' },
                  { name: 'Contact', href: '#contact' },
                ].map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 decoration-amber-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline hover:decoration-2 dark:text-neutral-300 dark:hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials & Contact */}
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold tracking-wider text-neutral-900 uppercase dark:text-white">
                Connect
              </h2>
              <ul className="flex flex-col gap-2">
                {socials.map(link => (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-600 decoration-amber-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline hover:decoration-2 dark:text-neutral-300 dark:hover:text-white"
                    >
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-12 flex items-center justify-center border-t border-neutral-100 pt-8 text-center dark:border-neutral-900">
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              © <CurrentYear /> Bram Verslype. Built with Next.js and Tailwind.
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}
