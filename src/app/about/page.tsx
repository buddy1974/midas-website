import type { Metadata } from 'next'
import SectionHeader from '@/components/SectionHeader'
import { team, services, company } from '@/lib/data'
import { Shield, Eye, Zap, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Midas Property Auctions | Founded by Sam Fongho',
  description:
    'Learn about Midas Property Group, founded by Sam Fongho, former IT consultant to Goldman Sachs, JP Morgan and CitiBank. 15+ years at the heart of London property auctions.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/about' },
  openGraph: {
    title: 'About Midas Property Auctions | Founded by Sam Fongho',
    description: 'Founded by Sam Fongho, former IT consultant to Goldman Sachs, JP Morgan and CitiBank. 15+ years at the heart of London property auctions.',
    url: 'https://www.midaspropertyauctions.co.uk/about',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 text-center py-16">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          About Midas
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
          15+ Years at the Heart of UK Property Auctions
        </h1>
        <p className="text-[#666] text-xl">
          Built on expertise, trust, and an unrivalled investor network.
        </p>
      </section>

      {/* Sam's full bio */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-white border border-[#E8E5DE] rounded-2xl p-10 md:p-12 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#080809] font-black text-3xl flex-shrink-0">
              SF
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#1A1A1A] mb-1">{team[0].name}</h2>
              <p className="text-[#C9A84C] text-sm uppercase tracking-wider mb-6">{team[0].role}</p>
              <p className="text-[#444] text-sm leading-relaxed">{team[0].bio}</p>
              {team[0].phone && (
                <a
                  href={`tel:${team[0].phone}`}
                  className="inline-block mt-4 text-[#C9A84C] text-sm font-medium hover:text-[#E8C96A] transition-colors"
                >
                  Direct: {team[0].phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Company description */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader eyebrow="Who We Are" title="A Team of Dedicated Experts" />
          <p className="text-center text-[#C9A84C] font-bold text-base mb-10 -mt-8">
            That&apos;s The Midas Touch
          </p>
          <div className="space-y-5 text-[#444] text-sm leading-relaxed">
            <p>
              At Midas Property Group, we focus on ensuring we deliver a professional service for
              each of our clients. We are experts in Property Investment as well as land and property
              sourcing, residential acquisitions and disposals, and auction acquisitions and disposals.
            </p>
            <p>
              Our team has a drive and a vision to help Midas Property Group become one of the leaders
              in our industry. We work closely with investors and developers throughout the UK and
              overseas to help implement investment strategies that underpin and support their goals.
            </p>
            <p>
              We strive to work with clients who want to invest in property. With our foresight and
              network of contacts, we can assist clients in all aspects of property investments.
              Whether you are taking that first step on your property investment journey or you want
              to expand your portfolio, we are with you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Dedicated to clients */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader eyebrow="Our Reputation" title="We&rsquo;re Dedicated to Supporting Our Clients" />
          <div className="space-y-5 text-[#444] text-sm leading-relaxed">
            <p>
              We have gained a reputation as one of the leading companies when it comes to working
              with investors. We don&apos;t just help investors with the acquisition and disposal of
              assets. We now offer a complete acquisition and disposal service through auction.
            </p>
            <p>
              Through a dynamic approach, we offer high-quality auction facilities for both corporate
              and independent sellers and buyers. We strive to offer a personal service that sets
              us apart.
            </p>
          </div>
        </div>
      </section>

      {/* How We Do It */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader eyebrow="Our Approach" title="How We Do It" />
          <div className="space-y-5 text-[#444] text-sm leading-relaxed">
            <p>
              We have a strong ethos and a desire to provide a turn-key solution. We work closely
              with each client, build strong relationships and understand their exact needs.
            </p>
            <p>
              Due diligence and research are part of what we do because we only offer stock backed
              by data and analysis. We manage the risk of investment for each client, giving them
              complete confidence in every decision they make.
            </p>
            <p>
              Every purchase and sale benefits from our extensive knowledge and our ability to work
              closely with mortgage brokers, solicitors, private lenders, estate agents and developers.
            </p>
          </div>
        </div>
      </section>

      {/* What we help with */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Our Focus" title="What we help with" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Finding good property deals',
                desc: 'On-market, off-market and BMV opportunities across the UK.',
              },
              {
                title: 'Helping clients buy',
                desc: 'Properties on and off market, at auction and through private treaty.',
              },
              {
                title: 'Helping clients sell',
                desc: 'Through auction or off-market. Fast, certain and at the best price.',
              },
              {
                title: 'Connecting investors to opportunities',
                desc: 'Our pool of 2,847 active investors matched to the right deals.',
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="w-2 h-2 rounded-full bg-[#C9A84C] mb-4" />
                <h3 className="text-[#1A1A1A] font-bold text-base mb-2">{title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted network */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="Partners"
            title="Our trusted network"
            subtitle="We work with established professionals so our clients are supported from start to finish."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: '🏛', label: 'Auction Houses' },
              { icon: '⚖️', label: 'Solicitors & Lawyers' },
              { icon: '🏦', label: 'Private Lenders' },
              { icon: '🔨', label: 'Construction Companies' },
              { icon: '📋', label: 'Estate Agents' },
              { icon: '🌍', label: 'International Partners' },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="bg-white border border-[#E8E5DE] rounded-xl p-5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <p className="text-[#444] text-xs font-medium leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="What We Do"
            title="Our Services"
            subtitle="Full-service property auction and investment services for buyers, sellers and investors."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, description }) => (
              <div
                key={title}
                className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-[#1A1A1A] font-bold text-lg mb-3">{title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="What We Stand For" title="Our Values" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Integrity',
                desc: 'We deal honestly with every buyer, seller and partner. No hidden agendas, no hidden fees.',
              },
              {
                icon: Eye,
                title: 'Transparency',
                desc: 'Open bidding, clear fees, full legal packs upfront. You know exactly what you are buying.',
              },
              {
                icon: Zap,
                title: 'Speed',
                desc: 'We move fast. Exchange on auction day. Complete in 28 days. No chains, no delays.',
              },
              {
                icon: Star,
                title: 'Expertise',
                desc: '15+ years of market knowledge. We know what a deal looks like and we share that with you.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-[#E8E5DE] rounded-xl p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="w-12 h-12 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-[#C9A84C]" size={22} />
                </div>
                <h3 className="text-[#1A1A1A] font-bold mb-2">{title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeader eyebrow="Accreditations" title="Trusted & Regulated" />
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {company.accreditations.map((acc) => (
              <div
                key={acc}
                className="bg-white border border-[#E0DDD4] rounded-xl px-8 py-5 text-[#555] text-sm font-medium shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                {acc}
              </div>
            ))}
          </div>
          <div className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <p className="text-[#666] text-sm leading-relaxed">
              {company.fullName} · Company No: {company.companyNo} · VAT: {company.vatNo}
              <br />
              Registered: {company.address.full}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
