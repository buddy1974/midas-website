import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { requireAdminApiAuth } from '@/lib/admin-auth'

export async function GET() {
  const authError = await requireAdminApiAuth()
  if (authError) return authError

  const sql = getSql()
  const rows = await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  const authError = await requireAdminApiAuth(req, { mutation: true })
  if (authError) return authError

  const body = await req.json() as Record<string, unknown>
  const sql = getSql()
  const [row] = await sql`
    INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, category, status, published_at)
    VALUES (
      ${body.title as string},
      ${body.slug as string},
      ${(body.excerpt as string) ?? null},
      ${(body.content as string) ?? null},
      ${(body.cover_image as string) ?? null},
      ${(body.category as string) ?? 'Guide'},
      ${(body.status as string) ?? 'draft'},
      ${body.status === 'published' ? sql`NOW()` : sql`NULL`}
    )
    RETURNING *`
  return NextResponse.json(row, { status: 201 })
}
