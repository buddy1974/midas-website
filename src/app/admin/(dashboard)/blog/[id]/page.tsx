import Link from 'next/link'
import { getSql } from '@/lib/db'
import type { BlogPostRow } from '@/lib/db'
import BlogForm from '../BlogForm'
import { notFound } from 'next/navigation'

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sql = getSql()
  const [row] = await sql<BlogPostRow[]>`SELECT * FROM blog_posts WHERE id = ${id}`
  if (!row) notFound()

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Link href="/admin/blog" style={{ color: '#555', fontSize: 12, textDecoration: 'none' }}>← Blog Posts</Link>
        <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: '8px 0 0' }}>Edit Post</h1>
        <p style={{ color: '#555', fontSize: 12, margin: '4px 0 0' }}>{row.title}</p>
      </div>
      <BlogForm initial={row} />
    </div>
  )
}
