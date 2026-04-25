import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log('[whatsapp-signup]', new Date().toISOString(), body)

  try {
    const filePath = path.join(process.cwd(), 'data', 'whatsapp-subscribers.json')
    let existing: unknown[] = []
    if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    }
    existing.push({ ...body, createdAt: new Date().toISOString() })
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2))
  } catch (err) {
    // On Vercel (read-only fs) this will fail silently — connect to DB/CRM later
    console.error('[whatsapp-signup] fs write failed:', err)
  }

  return NextResponse.json({ success: true })
}
