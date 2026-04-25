import Link from 'next/link'
import Image from 'next/image'
import { Phone, Smartphone, Mail } from 'lucide-react'
import { company } from '@/lib/data'

// ── Navigation columns ────────────────────────────────────────────────────────

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  heading: string
  links: FooterLink[]
}

const footerNav: FooterColumn[] = [
  {
    heading: 'AUCTIONS',
    links: [
      { label: 'Current Auction Lots', href: '/current-auction' },
      { label: 'Future Auction Dates', href: '/auction-dates' },
      { label: 'Timed Auction', href: '/timed-auction' },
      { label: 'Lots Still Available', href: '/lots-still-available' },
      { label: 'Previous Results', href: '/past-auctions' },
      { label: 'Register to Bid', href: '/register' },
    ],
  },
  {
    heading: 'BUY PROPERTY',
    links: [
      { label: 'Buying With Us', href: '/buy' },
      { label: 'Guide to Buying', href: '/guide/buying' },
      { label: 'Finance Your Property', href: '/finance' },
      { label: 'AML Requirements', href: '/aml' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  {
    heading: 'SELL PROPERTY',
    links: [
      { label: 'Sell With Us', href: '/sell' },
      { label: 'Guide to Selling', href: '/guide/selling' },
      { label: 'Free Valuation', href: '/valuation' },
      { label: 'Corporate & Probate', href: '/probate' },
      { label: 'Instant Cash Offer', href: '/instant-offer' },
      { label: 'Private Treaty', href: '/private-treaty' },
    ],
  },
  {
    heading: 'ABOUT',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Meet the Team', href: '/about#team' },
      { label: 'Blog', href: '/blog' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Complaints', href: '/complaints' },
    ],
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-[#080809] border-t border-[rgba(201,168,76,0.15)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* 5-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Col 1 — Brand */}
          <div>
            {/* Logo */}
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Midas Property Group"
                  width={160}
                  height={48}
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Fallback wordmark */}
            <div className="mb-4">
              <span className="text-[#C9A84C] font-black text-sm tracking-widest">MIDAS</span>
              <span className="text-[#E8E4DC] text-xs ml-1 tracking-wide">PROPERTY AUCTIONS</span>
            </div>

            {/* Tagline */}
            <p className="text-[#C9A84C] text-sm italic mb-5">{company.tagline}</p>

            {/* Social icons */}
            <div className="flex gap-3 mb-5">
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
            <ul className="space-y-2 mb-5">
              <li>
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-[rgba(232,228,220,0.5)] text-xs hover:text-[#C9A84C] transition-colors"
                >
                  <Phone size={12} className="text-[#C9A84C] shrink-0" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.mobile.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-[rgba(232,228,220,0.5)] text-xs hover:text-[#C9A84C] transition-colors"
                >
                  <Smartphone size={12} className="text-[#C9A84C] shrink-0" />
                  {company.mobile}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-2 text-[rgba(232,228,220,0.5)] text-xs hover:text-[#C9A84C] transition-colors"
                >
                  <Mail size={12} className="text-[#C9A84C] shrink-0" />
                  {company.email}
                </a>
              </li>
            </ul>

            {/* Accreditations */}
            <p className="text-[rgba(232,228,220,0.25)] text-xs leading-relaxed">
              Member: The Property Ombudsman · TSI Code Compliant
            </p>
          </div>

          {/* Cols 2-5 — Navigation */}
          {footerNav.map(col => (
            <div key={col.heading}>
              <h4 className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.2em] mb-5">
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
        <div className="border-t border-[rgba(201,168,76,0.1)] pt-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">

            {/* Left — legal */}
            <div className="space-y-1">
              <p className="text-[rgba(232,228,220,0.25)] text-xs">
                &copy; 2026 {company.fullName} &middot; Company No: {company.companyNo} &middot; VAT: {company.vatNo}
              </p>
              <p className="text-[rgba(232,228,220,0.25)] text-xs">
                Registered: Stanmore Business Centre, Stanmore Place, Honeypot Lane, London HA7 1BT
              </p>
            </div>

            {/* Right — policy links */}
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/privacy"
                className="text-[rgba(232,228,220,0.3)] text-xs hover:text-[#C9A84C] transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-[rgba(232,228,220,0.2)] text-xs">&middot;</span>
              <Link
                href="/complaints"
                className="text-[rgba(232,228,220,0.3)] text-xs hover:text-[#C9A84C] transition-colors"
              >
                Complaints
              </Link>
              <span className="text-[rgba(232,228,220,0.2)] text-xs">&middot;</span>
              <Link
                href="/conditions"
                className="text-[rgba(232,228,220,0.3)] text-xs hover:text-[#C9A84C] transition-colors"
              >
                General Conditions
              </Link>
              <span className="text-[rgba(232,228,220,0.2)] text-xs">&middot;</span>
              <span className="text-[rgba(201,168,76,0.35)] text-xs">
                Site powered by ARIA — Midas Property Intelligence Platform
              </span>
            </div>

          </div>
        </div>

      </div>
    </footer>
  )
}
