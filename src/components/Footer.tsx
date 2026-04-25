import Link from 'next/link'
import Image from 'next/image'
import { Phone, Smartphone, Mail } from 'lucide-react'
import { company } from '@/lib/data'

const footerNav = [
  {
    heading: 'Auctions',
    links: [
      { label: 'Current Lots', href: '/properties' },
      { label: 'Future Auction Dates', href: '/auction-dates' },
      { label: 'Previous Results', href: '/past-auctions' },
      { label: 'Register to Bid', href: '/register' },
    ],
  },
  {
    heading: 'Buy Property',
    links: [
      { label: 'Buying With Us', href: '/buy' },
      { label: 'Guide to Buying', href: '/guide/buying' },
      { label: 'Finance', href: '/finance' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  {
    heading: 'Sell Property',
    links: [
      { label: 'Sell With Us', href: '/sell' },
      { label: 'Guide to Selling', href: '/guide/selling' },
      { label: 'Free Valuation', href: '/valuation' },
      { label: 'Probate Services', href: '/probate' },
      { label: 'Instant Offer', href: '/instant-offer' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about#team' },
      { label: 'Blog', href: '/blog' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0F0F14] border-t border-[rgba(201,168,76,0.15)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Col 1 — Brand + Contact */}
          <div>
            <div className="mb-5">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Midas Property Group"
                  width={160}
                  height={56}
                  className="h-14 w-auto"
                />
              </Link>
            </div>
            <p className="text-[rgba(232,228,220,0.5)] text-sm leading-relaxed mb-6">
              {company.tagline}
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mb-6">
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[rgba(232,228,220,0.5)] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[rgba(232,228,220,0.5)] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href={company.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[rgba(232,228,220,0.5)] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
            {/* Contact */}
            <ul className="space-y-2">
              <li>
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-[rgba(232,228,220,0.5)] text-xs hover:text-[#C9A84C] transition-colors"
                >
                  <Phone size={12} className="text-[#C9A84C]" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.mobile}`}
                  className="flex items-center gap-2 text-[rgba(232,228,220,0.5)] text-xs hover:text-[#C9A84C] transition-colors"
                >
                  <Smartphone size={12} className="text-[#C9A84C]" />
                  {company.mobile}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-2 text-[rgba(232,228,220,0.5)] text-xs hover:text-[#C9A84C] transition-colors"
                >
                  <Mail size={12} className="text-[#C9A84C]" />
                  {company.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {footerNav.map(col => (
            <div key={col.heading}>
              <h4 className="text-[#E8E4DC] font-semibold text-sm uppercase tracking-wider mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[rgba(232,228,220,0.5)] text-sm hover:text-[#C9A84C] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(201,168,76,0.1)] pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[rgba(232,228,220,0.3)] text-xs">
              © 2026 {company.fullName} · Company No: {company.companyNo} · VAT: {company.vatNo}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[rgba(232,228,220,0.3)] text-xs">
              <Link href="/privacy" className="hover:text-[#C9A84C] transition-colors">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link href="/complaints" className="hover:text-[#C9A84C] transition-colors">
                Complaints Procedure
              </Link>
              <span>·</span>
              <span>The Property Ombudsman</span>
              <span>·</span>
              <span>TSI Approved Code</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
