import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { isAdminLoggedIn } from '@/lib/admin-auth'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id } = await params
  const sql = getSql()
  const [row] = await sql`SELECT * FROM blog_posts WHERE id = ${id}`
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id } = await params
  const body = await req.json() as Record<string, unknown>
  const sql = getSql()

  const publishedAt = body.status === 'published'
    ? sql`COALESCE(published_at, NOW())`
    : sql`NULL`

  const [row] = await sql`
    UPDATE blog_posts SET
      title = COALESCE(${body.title as string ?? null}, title),
      slug = COALESCE(${body.slug as string ?? null}, slug),
      excerpt = ${(body.excerpt as string) ?? null},
      content = ${(body.content as string) ?? null},
      cover_image = ${(body.cover_image as string) ?? null},
      category = COALESCE(${body.category as string ?? null}, category),
      status = COALESCE(${body.status as string ?? null}, status),
      published_at = ${publishedAt},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *`
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id } = await params
  const sql = getSql()
  await sql`DELETE FROM blog_posts WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}
