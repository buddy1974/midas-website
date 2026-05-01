import Image from 'next/image'
import Link from 'next/link'
import { Phone, Smartphone, Mail } from 'lucide-react'
import { company } from '@/lib/data'

// ── Social icon circle ────────────────────────────────────────────────────────

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[rgba(232,228,220,0.5)] hover:text-[#C9A84C] hover:border-[#C9A84C] hover:bg-[rgba(201,168,76,0.06)] transition-all"
    >
      {children}
    </a>
  )
}

// ── Column heading with rule ──────────────────────────────────────────────────

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h4 className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
        {children}
      </h4>
      <div className="w-10 h-0.5 bg-[#C9A84C] mb-6" />
    </>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-[#080809] border-t border-[rgba(201,168,76,0.15)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo-midas-white--REMIX.png"
                alt="Midas Property Auctions"
                width={160}
                height={48}
                className="h-12 w-auto"
              />
            </div>

            <p className="text-[rgba(232,228,220,0.5)] text-sm leading-relaxed mb-6 max-w-[220px]">
              A property brokerage connecting buyers, sellers and investors through established
              UK auction companies and exclusive off-market opportunities.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5 mb-5">
              <SocialIcon href={company.social.facebook} label="Facebook">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={company.social.instagram} label="Instagram">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </SocialIcon>
              <SocialIcon href={company.social.linkedin} label="LinkedIn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.youtube.com/@midaspropertyauctions" label="YouTube">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080809" />
                </svg>
              </SocialIcon>
            </div>

            {/* Main website link */}
            <a
              href="https://www.midaspropertygroup.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#C9A84C] text-xs hover:text-[#E8C96A] transition-colors"
            >
              🌐 midaspropertygroup.co.uk
            </a>
          </div>

          {/* Col 2 — Company Address */}
          <div>
            <ColHeading>Company Address</ColHeading>
            <p className="text-[rgba(232,228,220,0.5)] text-sm leading-loose mb-5">
              Stanmore Business and Innovation Centre,<br />
              Stanmore Place, Honeypot Lane,<br />
              London HA7 1BT
            </p>

            <ul className="space-y-2.5 mb-5">
              <li>
                <a href="tel:+442072062691"
                  className="flex items-center gap-2 text-[rgba(232,228,220,0.6)] text-sm hover:text-[#C9A84C] transition-colors">
                  <Phone size={13} className="text-[#C9A84C] flex-shrink-0" />
                  +44 (0) 2072062691
                </a>
              </li>
              <li>
                <a href="tel:+447413041372"
                  className="flex items-center gap-2 text-[rgba(232,228,220,0.6)] text-sm hover:text-[#C9A84C] transition-colors">
                  <Smartphone size={13} className="text-[#C9A84C] flex-shrink-0" />
                  +44 (0) 7413041372
                </a>
              </li>
              <li>
                <a href="mailto:info@midaspropertygroup.co.uk"
                  className="flex items-center gap-2 text-[rgba(232,228,220,0.6)] text-sm hover:text-[#C9A84C] transition-colors">
                  <Mail size={13} className="text-[#C9A84C] flex-shrink-0" />
                  info@midaspropertygroup.co.uk
                </a>
              </li>
            </ul>

            <div className="border-t border-[rgba(201,168,76,0.1)] pt-4">
              <p className="text-[#C9A84C] text-[10px] uppercase tracking-wider font-semibold mb-2">Registration Details</p>
              <p className="text-[rgba(232,228,220,0.35)] text-xs leading-relaxed">
                Midas Property Group Ltd<br />
                Company: {company.companyNo}<br />
                VAT: {company.vatNo}
              </p>
            </div>
          </div>

          {/* Col 3 — Site Map */}
          <div>
            <ColHeading>Site Map</ColHeading>
            <ul className="space-y-2">
              {[
                ['Home', '/'],
                ['Current Auction', '/current-auction'],
                ['Timed Auction', '/timed-auction'],
                ['Buying UK Property', '/buy'],
                ['Selling UK Property', '/sell'],
                ['Off-Market Properties', '/off-market'],
                ['Yielding Investments', '/yielding-investments'],
                ['Finance & Bridging', '/finance'],
                ['Our Services', '/about#services'],
                ['Alternative Investments', '/alternative-investments'],
                ['Events', '/events'],
                ['Blog', '/blog'],
                ['Testimonials', '/testimonials'],
                ['Contact Us', '/contact'],
                ['Sitemap', '/sitemap'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[rgba(232,228,220,0.5)] text-sm hover:text-[#C9A84C] transition-colors block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-[rgba(201,168,76,0.1)]">
              <p className="text-[#C9A84C] text-[10px] uppercase tracking-wider font-semibold mb-2">Main Website</p>
              <a
                href="https://www.midaspropertygroup.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(232,228,220,0.35)] text-xs hover:text-[#C9A84C] transition-colors"
              >
                midaspropertygroup.co.uk ↗
              </a>
            </div>
          </div>

          {/* Col 4 — Social Networks */}
          <div>
            <ColHeading>Social Networks</ColHeading>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Facebook', href: company.social.facebook, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { name: 'Instagram', href: company.social.instagram, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
                { name: 'LinkedIn', href: company.social.linkedin, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                { name: 'YouTube', href: 'https://www.youtube.com/@midaspropertyauctions', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080809"/></svg> },
              ].map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-[rgba(201,168,76,0.25)] rounded px-3 py-2.5 text-[rgba(232,228,220,0.6)] text-xs hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
                >
                  <span className="flex-shrink-0">{icon}</span>
                  {name}
                </a>
              ))}
            </div>

            <div className="mt-8">
              <ColHeading>Opening Times</ColHeading>
              <p className="text-[rgba(232,228,220,0.5)] text-sm">Mon – Fri: 9.00am – 6.00pm</p>
              <p className="text-[rgba(232,228,220,0.35)] text-xs mt-1">Saturday: 10.00am – 2.00pm</p>
            </div>

            <div className="mt-6 pt-4 border-t border-[rgba(201,168,76,0.1)]">
              <p className="text-[rgba(232,228,220,0.25)] text-[10px] leading-relaxed">
                Member: The Property Ombudsman<br />
                TSI Approved Code · Megamound Partner
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(201,168,76,0.1)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[rgba(232,228,220,0.25)] text-xs">
            © 2026 {company.fullName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[rgba(232,228,220,0.25)] text-xs">
            <Link href="/privacy" className="hover:text-[#C9A84C] transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/complaints" className="hover:text-[#C9A84C] transition-colors">Complaints</Link>
            <span>·</span>
            <Link href="/conditions" className="hover:text-[#C9A84C] transition-colors">General Conditions</Link>
          </div>
          <div className="flex items-center gap-2 text-[rgba(201,168,76,0.35)] text-xs italic">
            <span>Site powered by ARIA — Midas Intelligence</span>
            <span className="text-[rgba(232,228,220,0.2)]">·</span>
            <a
              href="https://maxpromo.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(232,228,220,0.3)] not-italic hover:text-[#C9A84C] transition-colors"
            >
              Developed by maxpromo.digital
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
