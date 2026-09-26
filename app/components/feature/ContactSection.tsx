import { ArrowRight } from 'lucide-react'
import StaticIcon from '@/app/components/common/StaticIcon'
import Button from '@/app/components/common/Button'
import FadeIn from '@/app/components/common/FadeIn'
import SectionHeading from '@/app/components/common/SectionHeading'
import { resolveSocialLinks } from '@/app/lib/constants'
import { getSiteSettings } from '@/app/lib/settings'

export default async function ContactSection() {
  const settings = await getSiteSettings()
  const socialLinks = resolveSocialLinks(settings?.socialLinks)

  return (
    <section
      id="contact"
      className="bg-background relative w-full overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-75 w-150 -translate-x-1/2 rounded-full bg-amber-400/8 blur-[100px] dark:bg-amber-500/6" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-32">
        <FadeIn className="mb-10 text-center">
          <SectionHeading
            eyebrow="Contact"
            title={"Let's Work Together"}
            className="mb-6"
          />
          <p className="mx-auto max-w-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
            I&apos;m always open to new opportunities and interesting projects.
            Feel free to reach out! Got something in mind?
          </p>
          <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            Hit the button and let&apos;s start a conversation.
          </p>

          <div className="mt-8">
            <Button href="mailto:bram.verslype@student.howest.be">
              Say Hello{' '}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          </div>
        </FadeIn>

        {/* Social links row */}
        <FadeIn
          delay={0.2}
          className="mt-12 flex items-center justify-center gap-4"
        >
          {socialLinks.map(({ platform, url, icon, handle }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              // Accessible name includes the visible handle (WCAG 2.5.3)
              aria-label={handle ? `${platform}: ${handle}` : platform}
              className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-neutral-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500 hover:text-neutral-900 dark:border-white/10 dark:bg-white/3 dark:text-neutral-300 dark:hover:border-amber-500 dark:hover:text-white"
            >
              {icon && <StaticIcon icon={icon} width={18} height={18} />}
              <span className="hidden text-sm font-medium sm:block">
                {handle ?? platform}
              </span>
            </a>
          ))}
        </FadeIn>
      </div>
    </section>
  )
}
