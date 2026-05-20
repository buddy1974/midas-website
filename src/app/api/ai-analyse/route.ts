import { NextRequest, NextResponse } from 'next/server'
import { getOpenAI, hasOpenAI } from '@/lib/openai'
import { optionalString } from '@/lib/public-form-security'

interface DealAnalysisResponse {
  score: number
  verdict: 'Strong Buy' | 'Worth Considering' | 'Proceed with Caution'
  yield: string
  roi: string
  risk: 'Low' | 'Medium' | 'High'
  summary: string
}

function unavailable() {
  return NextResponse.json(
    { error: 'ARIA is not available because OpenAI is not configured.' },
    { status: 503 },
  )
}

export async function POST(req: NextRequest) {
  const body = await req.json() as Record<string, unknown>

  if (!hasOpenAI()) return unavailable()

  try {
    const openai = getOpenAI()
    const message = optionalString(body.message, 1000)

    if (message) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        max_tokens: 250,
        messages: [
          {
            role: 'system',
            content: 'You are ARIA, the Midas Property Auctions assistant. Answer website visitor questions briefly and honestly. If a question needs personal advice, tell them to contact Midas.',
          },
          { role: 'user', content: message },
        ],
      })

      return NextResponse.json({ reply: completion.choices[0].message.content?.trim() ?? 'ARIA could not answer that request.' })
    }

    const address = optionalString(body.address, 300)
    const type = optionalString(body.type, 100)
    const guidePrice = Number(body.guidePrice)
    const bedrooms = body.bedrooms === null || body.bedrooms === undefined ? null : Number(body.bedrooms)
    const arv = Number(body.arv)

    if (!address || !Number.isFinite(guidePrice)) {
      return NextResponse.json({ error: 'Property address and guide price are required for analysis.' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 400,
      messages: [
        {
          role: 'system',
          content: `You are a UK property investment analyst at Midas Property Auctions. Return ONLY valid JSON with this shape:
{"score":number,"verdict":"Strong Buy"|"Worth Considering"|"Proceed with Caution","yield":"string","roi":"string","risk":"Low"|"Medium"|"High","summary":"2 sentences max"}`,
        },
        {
          role: 'user',
          content: `Property: ${address}, ${type ?? 'Unknown type'}
Guide Price: £${guidePrice.toLocaleString()}
ARV: ${Number.isFinite(arv) ? `£${arv.toLocaleString()}` : 'Not provided'}
Bedrooms: ${bedrooms ?? 'N/A'}
Location: UK
Analyse as an investment opportunity.`,
        },
      ],
    })

    const text = completion.choices[0].message.content ?? ''
    const parsed = JSON.parse(text.trim()) as DealAnalysisResponse
    return NextResponse.json(parsed)
  } catch (err) {
    console.error('[ai-analyse] error:', err)
    return NextResponse.json({ error: 'ARIA could not complete this request. Please try again later.' }, { status: 502 })
  }
}
