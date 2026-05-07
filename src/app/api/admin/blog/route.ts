import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { isAdminLoggedIn } from '@/lib/admin-auth'

export async function GET() {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const sql = getSql()
  const rows = await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
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
