import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Midas Property Auctions. Office: +44 207 206 2691. Sam direct: 07454 753318. Email: info@midaspropertygroup.co.uk. We respond within 24 hours.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
