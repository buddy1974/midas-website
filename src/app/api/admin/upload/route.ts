import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { requireAdminApiAuth } from '@/lib/admin-auth'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_BYTES = 10 * 1024 * 1024 // 10 MB
const ALLOWED_FOLDERS = new Set(['uploads', 'properties', 'events', 'blog', 'pages'])

async function hasValidImageSignature(file: File): Promise<boolean> {
  const header = new Uint8Array(await file.slice(0, 12).arrayBuffer())

  if (file.type === 'image/jpeg') return header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff
  if (file.type === 'image/png') return header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4e && header[3] === 0x47
  if (file.type === 'image/gif') return header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46
  if (file.type === 'image/webp') {
    const riff = String.fromCharCode(...header.slice(0, 4))
    const webp = String.fromCharCode(...header.slice(8, 12))
    return riff === 'RIFF' && webp === 'WEBP'
  }

  return false
}

function cleanFolder(value: FormDataEntryValue | null): string {
  const raw = typeof value === 'string' ? value.toLowerCase().trim() : 'uploads'
  const folder = raw.replace(/[^a-z0-9_-]/g, '')
  return ALLOWED_FOLDERS.has(folder) ? folder : 'uploads'
}

export async function POST(req: NextRequest) {
  const authError = await requireAdminApiAuth(req, { mutation: true })
  if (authError) return authError

  const form = await req.formData()
  const file = form.get('file') as File | null

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG, WebP or GIF allowed' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File must be under 10 MB' }, { status: 400 })
  }
  if (!await hasValidImageSignature(file)) {
    return NextResponse.json({ error: 'File content does not match an allowed image type' }, { status: 400 })
  }

  // Derive a clean filename: images/properties/1716500000000-filename.jpg
  const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') ?? 'jpg'
  const folder = cleanFolder(form.get('folder'))
  const safeBaseName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80)
  const filename = `images/${folder}/${Date.now()}-${safeBaseName}.${ext}`

  try {
    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: false,
    })
    return NextResponse.json({ url: blob.url })
  } catch (err) {
    console.error('[upload] Vercel Blob error:', err)
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 })
  }
}
