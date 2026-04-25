import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log('[register-investor]', new Date().toISOString(), body)

  try {
    const filePath = path.join(process.cwd(), 'data', 'investors.json')
    let existing: unknown[] = []
    if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    }
    existing.push({ ...body, createdAt: new Date().toISOString() })
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2))
  } catch (err) {
    console.error('[register-investor] fs write failed:', err)
  }

  return NextResponse.json({
    success: true,
    message: 'Welcome to the Midas investor network',
  })
}
