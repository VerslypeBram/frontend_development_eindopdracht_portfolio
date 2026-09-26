import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import '@/env'
import { SITE_URL } from './lib/site'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

// Self-hosted body font (Fontshare, ITF Free Font License): no render-blocking
// third-party stylesheet. font-semibold (600) falls back to Bold, as before.
const satoshi = localFont({
  variable: '--font-satoshi',
  src: [
    { path: './fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
  ],
})

const SITE_TITLE = 'Bram Verslype — Web Developer & MCT Student'
const SITE_DESCRIPTION =
  'Portfolio of Bram Verslype, Multimedia & Creative Technology student (Next Web Developer) at Howest, Kortrijk. Looking for a web development internship from 15 February to 4 June 2027 in the Kortrijk area. Projects in React, Next.js and IoT.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Bram Verslype',
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: 'Bram Verslype Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${satoshi.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
