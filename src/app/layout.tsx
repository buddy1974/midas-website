import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AriaWidget from '@/components/AriaWidget'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.midaspropertyauctions.co.uk'),

  title: {
    default: 'Midas Property Auctions | London, Essex & Nationwide Property Brokerage',
    template: '%s | Midas Property Auctions',
  },

  description:
    'Midas Property Auctions. A property brokerage connecting buyers, sellers and investors through established UK auction companies. HMOs, residential, commercial and development sites. Free to list. 2,847 active investors.',

  keywords: [
    'property auctions London',
    'property brokerage UK',
    'HMO properties London',
    'below market value property',
    'off-market property London',
    'bridging finance property',
    'buy property at auction UK',
    'sell property at auction London',
    'investment property London',
    'yielding investments UK',
    'property auction Essex',
    'tenanted property investment',
    'Midas Property Auctions',
    'Sam Fongho property',
    'property investment London 2026',
  ],

  authors: [{ name: 'Midas Property Auctions', url: 'https://www.midaspropertyauctions.co.uk' }],
  creator: 'Midas Property Auctions',
  publisher: 'Midas Property Group Ltd',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.midaspropertyauctions.co.uk',
    siteName: 'Midas Property Auctions',
    title: 'Midas Property Auctions | London, Essex & Nationwide Property Brokerage',
    description:
      'Connecting buyers, sellers and investors through established UK auction companies. Free to list. 2,847 active investors. HMOs, residential, commercial.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Midas Property Auctions, London Property Brokerage',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Midas Property Auctions | London Property Brokerage',
    description:
      'Connecting buyers, sellers and investors through established UK auction companies. Free to list. 2,847 active investors.',
    images: ['/og-image.jpg'],
    creator: '@midaspropertyauctions',
  },

  alternates: {
    canonical: 'https://www.midaspropertyauctions.co.uk',
  },

  verification: {
    google: 'G-QHFW6H6W5H',
  },

  category: 'property',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#C9A84C',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased overflow-x-hidden">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QHFW6H6W5H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QHFW6H6W5H');
        `}</Script>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AriaWidget />
      </body>
    </html>
  )
}
