import { NextResponse } from 'next/server'
import { getMRIProperties } from '@/lib/mri-feed'

export const revalidate = 300

export async function GET() {
  const properties = await getMRIProperties()
  return NextResponse.json({ properties, count: properties.length })
}
