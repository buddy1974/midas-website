import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { lots } from '@/lib/data'

export async function POST(req: NextRequest) {
  const { lotAId, lotBId } = await req.json()

  const lotA = lots.find((l) => l.id === lotAId)
  const lotB = lots.find((l) => l.id === lotBId)

  if (!lotA || !lotB) {
    return NextResponse.json({ error: 'Lots not found' }, { status: 404 })
  }

  const roiA = lotA.arv > 0 ? (((lotA.arv - lotA.guidePrice) / lotA.guidePrice) * 100).toFixed(1) : 'N/A'
  const roiB = lotB.arv > 0 ? (((lotB.arv - lotB.guidePrice) / lotB.guidePrice) * 100).toFixed(1) : 'N/A'

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      recommendation: `ARIA recommends Lot A (${lotA.address}) for its stronger ROI profile (${roiA}% vs ${roiB}%). Both are solid London assets, but ${lotA.type} properties in ${lotA.area} typically see faster capital appreciation.`,
      winner: 'A',
    })
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system:
        'You are a UK property investment analyst. Compare two properties and recommend the better investment. Return ONLY JSON: {"recommendation":"string 2-3 sentences","winner":"A"|"B"|"Equal"}',
      messages: [
        {
          role: 'user',
          content: `Compare these two UK auction properties:

LOT A: ${lotA.address}, ${lotA.area}
Type: ${lotA.type}, ${lotA.bedrooms} beds
Guide: £${lotA.guidePrice.toLocaleString()}, ARV: £${lotA.arv.toLocaleString()}
Est. ROI: ${roiA}%

LOT B: ${lotB.address}, ${lotB.area}
Type: ${lotB.type}, ${lotB.bedrooms} beds
Guide: £${lotB.guidePrice.toLocaleString()}, ARV: £${lotB.arv.toLocaleString()}
Est. ROI: ${roiB}%

Which is the better investment and why?`,
        },
      ],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    return NextResponse.json(JSON.parse(text.trim()))
  } catch {
    return NextResponse.json({
      recommendation: `ARIA recommends Lot A (${lotA.address}) based on ROI potential of ${roiA}% vs ${roiB}% for Lot B. Both are viable investments in strong London locations.`,
      winner: 'A',
    })
  }
}
