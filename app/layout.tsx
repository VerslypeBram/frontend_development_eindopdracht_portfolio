import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import '@/env'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Bram Verslype',
  description:
    'Welcome to the portfolio of Bram Verslype, a passionate Next.js Web Developer. Discover my latest projects, skills, and creative web solutions.',
  openGraph: {
    title: 'Bram Verslype',
    description:
      'Welcome to the portfolio of Bram Verslype, a passionate Next.js Web Developer. Discover my latest projects, skills, and creative web solutions.',
    url: 'https://bramverslype.be',
    siteName: 'Bram Verslype Portfolio',
    locale: 'en_US',
    type: 'website',
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
