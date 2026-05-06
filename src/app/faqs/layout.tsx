import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Property Auction FAQs',
  description:
    'Answers to the most common questions about buying and selling property at auction. Guide prices, reserve prices, legal packs, bidding, deposits and completion explained.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/faqs' },
  openGraph: {
    title: 'Frequently Asked Questions | Property Auction FAQs',
    description: 'Common questions about buying and selling property at auction. Guide prices, legal packs, bidding, deposits and completion explained.',
    url: 'https://www.midaspropertyauctions.co.uk/faqs',
  },
}

export default function FAQsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
