import React from "react"
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Instrument_Serif, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GridBackground } from '@/components/GridBackground'
import './globals.css'
import '@/components/ProfileCard.css'

const _instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
});

const _instrumentSerif = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});

const _playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

// Add Monospace Font
import { JetBrains_Mono } from 'next/font/google'
const _jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Shantanu Kudva - Backend Engineer & System Architect',
  description: 'Minimalistic 3D portfolio showcasing backend engineering projects, system design expertise, and creative pursuits. Built with React Three Fiber.',
  generator: 'v0.app',
  keywords: 'backend engineer, system design, distributed systems, Go, Python, React Three Fiber',
  authors: [{ name: 'Shantanu Kudva' }],
  openGraph: {
    title: 'Shantanu Kudva - Backend Engineer',
    description: 'Minimalistic 3D portfolio showcasing backend engineering projects',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

import GradualBlur from '@/components/GradualBlur'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased relative bg-background text-foreground ${_instrumentSans.variable} ${_instrumentSerif.variable} ${_jetbrainsMono.variable} ${_playfairDisplay.variable}`}>
        <GridBackground />
        {children}
        <GradualBlur preset="page-footer" height="6rem" strength={2} fadeOutOnScroll />
        <Analytics />
      </body>
    </html>
  )
}
