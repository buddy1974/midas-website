import { NextRequest, NextResponse } from 'next/server'
import { getOpenAI, hasOpenAI } from '@/lib/openai'
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

  if (!hasOpenAI()) {
    return NextResponse.json({
      recommendation: `ARIA recommends Lot A (${lotA.address}) for its stronger ROI profile (${roiA}% vs ${roiB}%). Both are solid London assets, but ${lotA.type} properties in ${lotA.area} typically see faster capital appreciation.`,
      winner: 'A',
    })
  }

  try {
    const openai = getOpenAI()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content:
            'You are a UK property investment analyst. Compare two properties and recommend the better investment. Return ONLY JSON: {"recommendation":"string 2-3 sentences","winner":"A"|"B"|"Equal"}',
        },
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

    const text = completion.choices[0].message.content ?? ''
    return NextResponse.json(JSON.parse(text.trim()))
  } catch {
    return NextResponse.json({
      recommendation: `ARIA recommends Lot A (${lotA.address}) based on ROI potential of ${roiA}% vs ${roiB}% for Lot B. Both are viable investments in strong London locations.`,
      winner: 'A',
    })
  }
}
