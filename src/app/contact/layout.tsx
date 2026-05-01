import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Speak to Sam or the Midas Team',
  description:
    'Contact Midas Property Auctions. Office: +44 207 206 2691. Sam direct: 07454 753318. Email: info@midaspropertygroup.co.uk. We respond within 24 hours.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/contact' },
  openGraph: {
    title: 'Contact Us | Speak to Sam or the Midas Team',
    description: 'Office: +44 207 206 2691. Sam direct: 07454 753318. Email: info@midaspropertygroup.co.uk. We respond within 24 hours.',
    url: 'https://www.midaspropertyauctions.co.uk/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
