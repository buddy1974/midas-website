import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buy at Auction | Register as a Bidder',
  description:
    'Register to bid at Midas Property Auctions. BMV opportunities across London and Essex. 10% deposit on the day. Complete within 28 days. Free to register.',
}

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
