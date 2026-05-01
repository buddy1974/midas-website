import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Property Valuation | Sell at Auction in 28 Days',
  description:
    'Get a free, no-obligation auction valuation from the Midas team. We value all property types across London, Essex and nationwide. Guaranteed sale. No sale, no fee. Book in under 2 minutes.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/valuation' },
  openGraph: {
    title: 'Free Property Valuation | Sell at Auction in 28 Days',
    description: 'Get a free, no-obligation auction valuation. Guaranteed sale. No sale, no fee. Book in under 2 minutes.',
    url: 'https://www.midaspropertyauctions.co.uk/valuation',
  },
}

export default function ValuationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
