// Dynamic route for pages created via the Page Builder
// URL pattern: /pages/[slug]
// e.g. /pages/our-team, /pages/investment-guide

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSql } from '@/lib/db'
import type { BuilderSection } from '@/lib/builder-types'
import { PageRenderer } from '@/components/builder/SectionRenderer'

interface LayoutRow {
  slug: string
  title: string
  meta_title: string
  meta_desc: string
  sections: BuilderSection[]
}

async function getLayout(slug: string): Promise<LayoutRow | null> {
  try {
    const sql = getSql()
    const rows = await sql<LayoutRow[]>`SELECT * FROM page_builder_layouts WHERE slug = ${slug}`
    return rows[0] ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const layout = await getLayout(slug)
  if (!layout) return { title: 'Page Not Found' }
  return {
    title: layout.meta_title || layout.title,
    description: layout.meta_desc || undefined,
  }
}

export default async function BuilderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const layout = await getLayout(slug)
  if (!layout) notFound()

  return (
    <main>
      <PageRenderer sections={layout.sections} />
    </main>
  )
}

// Allow new builder pages to be created without a redeploy
export const dynamic = 'force-dynamic'
