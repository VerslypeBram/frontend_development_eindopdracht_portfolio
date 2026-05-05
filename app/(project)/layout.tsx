import { ShellProviders } from '@/app/components/common/ShellProviders'

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ShellProviders>
      <main id="main" className="flex-1">
        {children}
      </main>
    </ShellProviders>
  )
}
