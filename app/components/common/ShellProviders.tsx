'use client'

import { ThemeProvider } from './ThemeProvider'
import { CursorProvider } from './CursorContext'
import CustomCursor from './CustomCursor'
import ScrollProgress from './ScrollProgress'

export function ShellProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CursorProvider>
        <ScrollProgress />
        <CustomCursor />
        {children}
      </CursorProvider>
    </ThemeProvider>
  )
}
