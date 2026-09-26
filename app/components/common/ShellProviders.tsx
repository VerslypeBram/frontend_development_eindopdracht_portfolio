'use client'

import { MotionConfig } from 'framer-motion'
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
      {/* Respect the OS "reduce motion" setting for every Framer animation */}
      <MotionConfig reducedMotion="user">
        <CursorProvider>
          <ScrollProgress />
          <CustomCursor />
          {children}
        </CursorProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
