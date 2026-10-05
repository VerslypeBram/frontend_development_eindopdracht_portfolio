import { draftMode } from 'next/headers'
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'
import { ShellProviders } from '../components/common/ShellProviders'
import { SanityLive } from '../../sanity/lib/live'
import { getSiteSettings } from '../lib/settings'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled: isDraftMode } = await draftMode()
  const settings = await getSiteSettings()

  return (
    <ShellProviders>
      {isDraftMode && (
        <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center gap-4 bg-amber-500 px-4 pt-[calc(env(safe-area-inset-top)+0.5rem)] pb-2 text-sm font-semibold text-black">
          <span>Draft mode active</span>
          <a
            href="/api/draft/disable"
            className="rounded border border-black/20 bg-black/10 px-3 py-0.5 hover:bg-black/20"
          >
            Disable
          </a>
        </div>
      )}
      <NavBar navLinks={settings?.navLinks} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer
        navLinks={settings?.navLinks}
        socialLinks={settings?.socialLinks}
        footerText={settings?.footerText}
      />
      <SanityLive />
    </ShellProviders>
  )
}
