import { getSql } from '@/lib/db'
import type { NewsletterRow } from '@/lib/db'
import { notFound } from 'next/navigation'
import NewsletterForm from '../NewsletterForm'

export default async function EditNewsletterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sql = getSql()
  const [row] = await sql<NewsletterRow[]>`SELECT * FROM newsletters WHERE id = ${id} LIMIT 1`
  if (!row) notFound()
  return <NewsletterForm initial={row} />
}
