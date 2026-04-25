import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register as a Midas Investor',
  description:
    'Register as a Midas investor and receive alerts when new lots matching your criteria come to market. Free. 2 minutes. Access to off-market deals.',
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
