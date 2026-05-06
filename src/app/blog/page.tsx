import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Property Blog | Market Insights, Investment Guides & Auction News',
  description:
    'Market insights, investment guides and auction news from the Midas team. HMO market reports, bridging finance guides and expert buying advice.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/blog' },
  openGraph: {
    title: 'Property Blog | Market Insights, Investment Guides & Auction News',
    description: 'Market insights, investment guides and auction news from the Midas team.',
    url: 'https://www.midaspropertyauctions.co.uk/blog',
  },
}

interface BlogPost {
  title: string
  category: string
  date: string
  excerpt: string
  slug: string
}

const posts: BlogPost[] = [
  {
    title: 'How to Buy Your First Property at Auction',
    category: 'Guide',
    date: '18 April 2026',
    excerpt:
      'Buying at auction for the first time can feel daunting. In this guide we break down everything you need to know, from reading legal packs to registering to bid.',
    slug: 'buying-first-property-at-auction',
  },
  {
    title: 'London HMO Market Report 2026',
    category: 'Market Report',
    date: '10 April 2026',
    excerpt:
      'HMO yields in London remain among the strongest in the UK. This report covers demand trends, licensing updates and the best boroughs for HMO investment.',
    slug: 'london-hmo-market-report-2026',
  },
  {
    title: 'Bridging Finance Explained: A Guide for Auction Buyers',
    category: 'Finance',
    date: '2 April 2026',
    excerpt:
      'Most auction purchases complete in 28 days. Too fast for a standard mortgage. Here is everything you need to know about bridging finance and how to arrange it quickly.',
    slug: 'bridging-finance-guide-auction-buyers',
  },
  {
    title: 'What Makes a Good HMO Investment in 2026?',
    category: 'Investment',
    date: '25 March 2026',
    excerpt:
      'Not every HMO is a good investment. In this guide we cover the key criteria: location, licensing, room size, yield calculation and common pitfalls to avoid.',
    slug: 'good-hmo-investment-2026',
  },
]

export default function BlogPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#F8F7F4] py-16 pt-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-5">
            Insights &amp; Guides
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-5 leading-tight">
            Midas Property Blog
          </h1>
          <p className="text-[#666] text-lg max-w-xl mx-auto leading-relaxed">
            Market insights, investment guides and auction news from the Midas team.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-[#E8E5DE] rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                {/* Image placeholder */}
                <div className="bg-gradient-to-br from-[#0F0F14] to-[#1a1a2e] h-48 w-full flex items-center justify-center">
                  <span className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6">
                  <span className="inline-block bg-[rgba(201,168,76,0.1)] text-[#C9A84C] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h2 className="font-bold text-[#1A1A1A] text-lg mt-3 mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-[#888] text-xs mb-3">{post.date}</p>
                  <p className="text-[#666] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#C9A84C] text-sm font-semibold hover:text-[#E8C96A] transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-[#1A1A1A] mb-4">Stay in the Know</h2>
          <p className="text-[#666] text-base leading-relaxed mb-8">
            Subscribe to our investor list to receive new articles, market reports and exclusive
            opportunities.
          </p>
          <Link
            href="/register"
            className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
          >
            Join the Investor List
          </Link>
        </div>
      </section>
    </main>
  )
}
