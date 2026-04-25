import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sitemap | Midas Property Auctions',
  description: 'Complete directory of all pages on Midas Property Auctions.',
}

interface SitemapLink {
  label: string
  href: string
  external?: boolean
  italic?: boolean
}

interface SitemapSection {
  heading: string
  links: SitemapLink[]
}

const sections: SitemapSection[] = [
  {
    heading: 'Auctions',
    links: [
      { label: 'Current Auction', href: '/current-auction' },
      { label: 'Timed Auction', href: '/timed-auction' },
      { label: 'Future Auction Dates', href: '/auction-dates' },
      { label: 'Lots Still Available', href: '/lots-still-available' },
      { label: 'Previous Auction Results', href: '/past-auctions' },
      { label: 'Register to Bid', href: '/register' },
    ],
  },
  {
    heading: 'Buy Property',
    links: [
      { label: 'Buying a Property With Us', href: '/buy' },
      { label: 'Guide to Buying at Auction', href: '/guide/buying' },
      { label: 'Guide to Timed Auction', href: '/guide/buying-timed' },
      { label: 'Finance Your Property', href: '/finance' },
      { label: 'AML Requirements', href: '/aml' },
      { label: 'Private Treaty Services', href: '/private-treaty' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  {
    heading: 'Sell Property',
    links: [
      { label: 'Sell Your Property', href: '/sell' },
      { label: 'Free Valuation', href: '/valuation' },
      { label: 'Guide to Selling', href: '/guide/selling' },
      { label: 'Guide to Timed Auction', href: '/guide/selling-timed' },
      { label: 'Corporate & Probate', href: '/probate' },
      { label: 'Instant Cash Offer', href: '/instant-offer' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Meet the Team', href: '/about#team' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Events', href: '/events' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'General Conditions', href: '/conditions' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Complaints Procedure', href: '/complaints' },
      { label: 'AML Requirements', href: '/aml' },
    ],
  },
  {
    heading: 'Alternative',
    links: [
      { label: 'Alternative Investments', href: '/alternative-investments' },
      { label: 'Off-Market Properties', href: '/off-market' },
      { label: 'Wishlist', href: '/wishlist' },
      {
        label: 'Main Website ↗',
        href: 'https://www.midaspropertygroup.co.uk',
        external: true,
        italic: true,
      },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* Hero */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] mb-4">Sitemap</h1>
          <p className="text-[rgba(232,228,220,0.5)] text-lg">
            Complete directory of all pages on Midas Property Auctions.
          </p>
        </div>
      </section>

      {/* Sections grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-16">
        {sections.map((section) => (
          <div
            key={section.heading}
            className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-6"
          >
            <p className="text-[#C9A84C] font-bold uppercase text-xs tracking-wider mb-4">
              {section.heading}
            </p>
            <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
            <ul className="space-y-2">
              {section.links.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[rgba(232,228,220,0.65)] text-sm hover:text-[#C9A84C] transition-colors${link.italic ? ' italic' : ''}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[rgba(232,228,220,0.65)] text-sm hover:text-[#C9A84C] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* XML note */}
      <p className="text-center text-[rgba(232,228,220,0.3)] text-xs mt-8">
        Machine-readable XML sitemap available at /sitemap.xml
      </p>

    </div>
  )
}
