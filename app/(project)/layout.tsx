import { ShellProviders } from '@/app/components/common/ShellProviders'

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ShellProviders>
      <main id="main" className="flex-1 pt-[env(safe-area-inset-top)]">
        {children}
      </main>
    </ShellProviders>
  )
}
