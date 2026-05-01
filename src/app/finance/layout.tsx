import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bridging Finance for Auction Purchases | Terms in 24 Hours',
  description:
    'Fast bridging finance for auction purchases. Rates from 0.75%/month. Loans from £50k–£2M. Terms issued within 24 hours. 1st and 2nd charge available.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/finance' },
  openGraph: {
    title: 'Bridging Finance for Auction Purchases | Terms in 24 Hours',
    description: 'Rates from 0.75%/month. Loans from £50k–£2M. Terms in 24 hours. 1st and 2nd charge available.',
    url: 'https://www.midaspropertyauctions.co.uk/finance',
  },
}

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
