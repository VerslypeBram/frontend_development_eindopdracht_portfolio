import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import '@/env'
import { DEFAULT_SEO_DESCRIPTION } from './lib/constants'
import { getSiteSettings } from './lib/settings'
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

// viewport-fit=cover lets the page draw behind the iPhone status bar and
// notch; the header and project pages pad themselves with the safe-area
// insets so nothing important ends up underneath.
export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

// The description is editable in Sanity (Site Settings → SEO Description)
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const description = settings?.seoDescription || DEFAULT_SEO_DESCRIPTION

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_TITLE,
      template: '%s | Bram Verslype',
    },
    description,
    alternates: { canonical: '/' },
    openGraph: {
      title: SITE_TITLE,
      description,
      url: '/',
      siteName: 'Bram Verslype Portfolio',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-[calc(env(safe-area-inset-top)+0.5rem)] focus:left-4 focus:z-[10000] focus:rounded-lg focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-neutral-950 focus:outline-2 focus:outline-offset-2 focus:outline-neutral-900 dark:focus:outline-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
