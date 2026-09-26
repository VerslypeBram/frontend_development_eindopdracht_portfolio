import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import '@/env'
import { SITE_URL } from './lib/site'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

const SITE_TITLE = 'Bram Verslype — Web Developer & MCT Student'
const SITE_DESCRIPTION =
  'Portfolio of Bram Verslype, Multimedia & Creative Technology student (Next Web Developer) at Howest, Kortrijk. Looking for a web development internship. Projects in React, Next.js and IoT.'

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
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} flex min-h-full flex-col font-sans antialiased`}
      >
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
