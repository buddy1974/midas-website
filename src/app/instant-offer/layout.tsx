import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get an Instant Cash Offer | Sell Your Property Fast',
  description:
    'Receive an instant cash offer for your property within 24 hours. No viewings, no fuss, no chain. Guaranteed completion in as little as 7 days. All property types considered.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/instant-offer' },
  openGraph: {
    title: 'Get an Instant Cash Offer | Sell Your Property Fast',
    description: 'Instant cash offer within 24 hours. No viewings. Guaranteed completion in 7 days. All property types considered.',
    url: 'https://www.midaspropertyauctions.co.uk/instant-offer',
  },
}

export default function InstantOfferLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
