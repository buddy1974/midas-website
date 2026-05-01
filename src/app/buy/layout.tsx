import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buy Property at Auction | Register as a Bidder',
  description:
    'Register to bid at Midas Property Auctions. BMV opportunities across London and Essex. 10% deposit on the day. Complete within 28 days. Free to register.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/buy' },
  openGraph: {
    title: 'Buy Property at Auction | Register as a Bidder',
    description: 'BMV property opportunities across London and Essex. 10% deposit on the day. Complete within 28 days. Free to register.',
    url: 'https://www.midaspropertyauctions.co.uk/buy',
  },
}

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
