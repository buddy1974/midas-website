import { type Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/lib/data'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  const title = post ? post.title : 'Article'
  const description = post?.excerpt ?? ''
  const canonical = `https://www.midaspropertyauctions.co.uk/blog/${slug}`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | Midas Property Auctions`,
      description,
      url: canonical,
      type: 'article',
    },
  }
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  // Split content by \n\n into paragraphs (or fallback to excerpt if no content)
  const contentParagraphs = post.content
    ? post.content.split('\n\n').filter(Boolean)
    : [post.excerpt]

  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* Article header */}
      <header className="max-w-3xl mx-auto px-6 pt-8 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[rgba(232,228,220,0.35)] mb-8">
          <Link href="/" className="hover:text-[#C9A84C] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#C9A84C] transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-[rgba(232,228,220,0.5)]">{post.title}</span>
        </div>

        {/* Category badge */}
        <span className="bg-[rgba(201,168,76,0.15)] text-[#C9A84C] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-[#E8E4DC] mt-4 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-[rgba(232,228,220,0.4)]">
          <span>{post.date}</span>
          <span>·</span>
          <span>Midas Property Auctions</span>
          <span>·</span>
          <span>{Math.ceil((post.content ?? post.excerpt).length / 1000)} min read</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-[rgba(201,168,76,0.2)] mt-8" />
      </header>

      {/* Article image placeholder */}
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <div className="h-64 md:h-80 bg-gradient-to-br from-[#15151C] to-[#080809] rounded-xl flex items-center justify-center border border-[rgba(201,168,76,0.15)]">
          <span className="text-[#C9A84C] text-4xl">
            {post.category === 'Guide'
              ? '📋'
              : post.category === 'Finance'
                ? '💰'
                : post.category === 'Market Report'
                  ? '📊'
                  : '🏠'}
          </span>
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6">
        {contentParagraphs.map((para, i) => (
          <p
            key={i}
            className="text-[rgba(232,228,220,0.8)] text-base leading-relaxed mb-6"
          >
            {para}
          </p>
        ))}

        {/* CTA block */}
        <div className="mt-12 bg-[#0F0F14] border border-[rgba(201,168,76,0.25)] rounded-xl p-8 text-center">
          <p className="text-[#C9A84C] font-bold text-lg mb-2">
            Interested in buying or selling at auction?
          </p>
          <p className="text-[rgba(232,228,220,0.6)] text-sm mb-6">
            Speak to our team for free, no-obligation advice.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/current-auction"
              className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
            >
              View Current Lots →
            </Link>
            <Link
              href="/valuation"
              className="border border-[rgba(201,168,76,0.4)] text-[#E8E4DC] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              Free Valuation
            </Link>
          </div>
        </div>
      </article>

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 mt-12">
        <Link
          href="/blog"
          className="text-[#C9A84C] text-sm hover:text-[#E8C96A] transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>

    </div>
  )
}
