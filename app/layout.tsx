import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import '@/env'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Bram Verslype | Portfolio',
  description:
    'Welkom op het portfolio van Bram Verslype, een gepassioneerde Next.js Web Developer. Ontdek mijn nieuwste projecten, vaardigheden en creatieve weboplossingen.',
  openGraph: {
    title: 'Bram Verslype | Portfolio',
    description:
      'Welkom op het portfolio van Bram Verslype, een gepassioneerde Next.js Web Developer. Ontdek mijn nieuwste projecten, vaardigheden en creatieve weboplossingen.',
    url: 'https://bramverslype.be',
    siteName: 'Bram Verslype Portfolio',
    locale: 'nl_BE',
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
      lang="nl"
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
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} flex min-h-full flex-col font-sans antialiased`}
      >
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip naar content
        </a>
        {children}
      </body>
    </html>
  )
}
