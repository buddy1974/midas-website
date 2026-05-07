import Link from 'next/link'
import BlogForm from '../BlogForm'

export default function NewBlogPostPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Link href="/admin/blog" style={{ color: '#555', fontSize: 12, textDecoration: 'none' }}>← Blog Posts</Link>
        <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: '8px 0 0' }}>New Blog Post</h1>
      </div>
      <BlogForm />
    </div>
  )
}
