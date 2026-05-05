import { draftMode } from 'next/headers'
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'
import { ShellProviders } from '../components/common/ShellProviders'
import { SanityLive } from '../../sanity/lib/live'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <ShellProviders>
      {isDraftMode && (
        <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center gap-4 bg-amber-500 px-4 py-2 text-sm font-semibold text-black">
          <span>Draft mode actief</span>
          <a
            href="/api/draft/disable"
            className="rounded border border-black/20 bg-black/10 px-3 py-0.5 hover:bg-black/20"
          >
            Uitschakelen
          </a>
        </div>
      )}
      <NavBar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <SanityLive />
    </ShellProviders>
  )
}
