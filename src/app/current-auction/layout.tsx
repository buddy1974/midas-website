import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Current Auction | Live Lots & Properties Going to Auction',
  description:
    'Browse all properties currently going to auction with Midas. HMOs, residential, commercial and development sites across London and Essex. Legal packs available. Register to bid today.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/current-auction' },
  openGraph: {
    title: 'Current Auction | Live Lots & Properties Going to Auction',
    description: 'Browse all properties currently going to auction with Midas. HMOs, residential, commercial and development sites. Register to bid today.',
    url: 'https://www.midaspropertyauctions.co.uk/current-auction',
  },
}

export default function CurrentAuctionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
