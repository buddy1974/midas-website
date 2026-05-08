// Server-side helper: fetch a page layout from the builder DB.
// Used by public pages to check if a builder override exists.

import { getSql } from './db'
import type { BuilderSection } from './builder-types'

export interface BuilderLayout {
  slug: string
  title: string
  metaTitle: string
  metaDesc: string
  sections: BuilderSection[]
}

export async function getBuilderLayout(slug: string): Promise<BuilderLayout | null> {
  try {
    const sql = getSql()
    const rows = await sql<{
      slug: string; title: string; meta_title: string; meta_desc: string; sections: BuilderSection[]
    }[]>`SELECT slug, title, meta_title, meta_desc, sections FROM page_builder_layouts WHERE slug = ${slug}`

    if (rows.length === 0) return null

    const row = rows[0]
    // Parse sections — Neon JSONB may return a string instead of an array
    const sections: BuilderSection[] = Array.isArray(row.sections)
      ? row.sections
      : typeof row.sections === 'string'
        ? JSON.parse(row.sections)
        : []
    // Only return if the layout actually has sections (not just a stub)
    if (sections.length === 0) return null

    return {
      slug: row.slug,
      title: row.title,
      metaTitle: row.meta_title,
      metaDesc: row.meta_desc,
      sections,
    }
  } catch {
    return null
  }
}
