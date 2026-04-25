import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sell Your Property at Auction | Free Valuation',
  description:
    'Sell your property at auction with Midas. 2,847 active investors. 98% sold at or above reserve. No sale, no fee. 2% + VAT on completion. Book a free valuation today.',
}

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
