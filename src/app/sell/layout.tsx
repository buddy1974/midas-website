import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sell Your Property at Auction | Free Valuation. No Sale No Fee.',
  description:
    'Sell your property at auction with Midas. 2,847 active investors. 98% sold at or above reserve. No sale, no fee. 2% plus VAT on completion. Book a free valuation today.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/sell' },
  openGraph: {
    title: 'Sell Your Property at Auction | Free Valuation. No Sale No Fee.',
    description: '2,847 active investors. 98% sold at or above reserve. No sale, no fee. Book a free valuation today.',
    url: 'https://www.midaspropertyauctions.co.uk/sell',
  },
}

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
