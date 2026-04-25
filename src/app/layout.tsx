import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Midas Property Auctions | London & Essex Property Auctioneers',
    template: '%s | Midas Property Auctions',
  },
  description:
    'Premier property auction house serving London and Essex. HMOs, residential, commercial and development sites. 2,847 active investors. Register to bid today.',
  keywords: [
    'property auction London',
    'HMO auction',
    'buy property at auction',
    'sell property at auction',
    'London property investment',
    'Essex auction house',
    'bridging finance',
    'off-market property',
    'Midas Property Group',
    'Sam Fongho',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Midas Property Auctions',
    title: 'Midas Property Auctions | London & Essex Property Auctioneers',
    description:
      'Premier property auction house serving London and Essex. HMOs, residential, commercial and development sites.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
