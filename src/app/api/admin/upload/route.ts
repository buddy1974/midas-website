import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { isAdminLoggedIn } from '@/lib/admin-auth'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_BYTES = 10 * 1024 * 1024 // 10 MB

export async function POST(req: NextRequest) {
  if (!await isAdminLoggedIn()) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const form = await req.formData()
  const file = form.get('file') as File | null

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG, WebP or GIF allowed' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File must be under 10 MB' }, { status: 400 })
  }

  // Derive a clean filename: images/properties/1716500000000-filename.jpg
  const ext = file.name.split('.').pop() ?? 'jpg'
  const folder = (form.get('folder') as string | null) ?? 'uploads'
  const filename = `images/${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}.${ext}`

  const blob = await put(filename, file, {
    access: 'public',
    contentType: file.type,
    addRandomSuffix: false,
  })

  return NextResponse.json({ url: blob.url })
}
