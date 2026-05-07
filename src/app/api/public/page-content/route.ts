import { type NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page')
  if (!page) {
    return NextResponse.json({ error: 'Missing page parameter' }, { status: 400 })
  }

  try {
    const sql = getSql()
    const rows = await sql<{ section: string; field: string; value: string }[]>`
      SELECT section, field, value FROM page_content WHERE page = ${page}`
    const content = Object.fromEntries(rows.map(r => [`${r.section}.${r.field}`, r.value]))
    return NextResponse.json(content)
  } catch {
    return NextResponse.json({})
  }
}
