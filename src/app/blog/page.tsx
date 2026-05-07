import { type Metadata } from 'next'
import Link from 'next/link'
import { getSql, type BlogPostRow } from '@/lib/db'
import { blogPosts as staticPosts } from '@/lib/data'

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

interface DisplayPost {
  title: string
  category: string
  date: string
  excerpt: string
  slug: string
  coverImage?: string | null
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPage() {
  let posts: DisplayPost[] = staticPosts.map(p => ({
    title: p.title,
    category: p.category,
    date: p.date,
    excerpt: p.excerpt,
    slug: p.slug,
  }))

  try {
    const sql = getSql()
    const dbPosts = await sql<BlogPostRow[]>`
      SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC`
    if (dbPosts.length > 0) {
      posts = dbPosts.map(p => ({
        title: p.title,
        category: p.category,
        date: formatDate(p.published_at),
        excerpt: p.excerpt ?? '',
        slug: p.slug,
        coverImage: p.cover_image,
      }))
    }
  } catch { /* DB not yet configured */ }

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
                <div
                  className="h-48 w-full flex items-center justify-center"
                  style={post.coverImage
                    ? { backgroundImage: `url(${post.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : { background: 'linear-gradient(135deg, #0F0F14, #1a1a2e)' }
                  }
                >
                  {!post.coverImage && (
                    <span className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest">
                      {post.category}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <span className="inline-block bg-[rgba(201,168,76,0.1)] text-[#C9A84C] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h2 className="font-bold text-[#1A1A1A] text-lg mt-3 mb-2 leading-snug">
                    {post.title}
                  </h2>
                  {post.date && <p className="text-[#888] text-xs mb-3">{post.date}</p>}
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
            Subscribe to our investor list to receive new articles, market reports and exclusive opportunities.
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
