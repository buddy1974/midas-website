import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register as a Midas Investor | Free. 2 Minutes.',
  description:
    'Register as a Midas investor and receive alerts when new lots matching your criteria come to market. Free. 2 minutes. Access to off-market deals.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/register' },
  openGraph: {
    title: 'Register as a Midas Investor | Free. 2 Minutes.',
    description: 'Receive alerts when new lots match your criteria. Free. 2 minutes. Access to off-market deals.',
    url: 'https://www.midaspropertyauctions.co.uk/register',
  },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
