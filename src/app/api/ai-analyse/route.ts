import { NextRequest, NextResponse } from 'next/server'
import { getOpenAI, hasOpenAI } from '@/lib/openai'

const DEMO_RESPONSE = {
  score: 78,
  verdict: 'Worth Considering',
  yield: '6.2%',
  roi: '34%',
  risk: 'Medium',
  summary:
    'Strong London location with good rental demand. ARV suggests solid uplift potential. Legal pack review recommended before bidding.',
}

export async function POST(req: NextRequest) {
  const { address, guidePrice, type, bedrooms, arv } = await req.json()

  if (!hasOpenAI()) {
    return NextResponse.json(DEMO_RESPONSE)
  }

  try {
    const openai = getOpenAI()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 400,
      messages: [
        {
          role: 'system',
          content: `You are a UK property investment analyst at Midas Property Auctions. Analyse deals for investors. Return ONLY valid JSON with no markdown:
{"score":number 0-100,"verdict":"Strong Buy"|"Worth Considering"|"Proceed with Caution","yield":"string e.g. 6.2%","roi":"string e.g. 34%","risk":"Low"|"Medium"|"High","summary":"2 sentences max, plain English, actionable"}`,
        },
        {
          role: 'user',
          content: `Property: ${address}, ${type}
Guide Price: £${guidePrice?.toLocaleString()}
ARV: £${arv?.toLocaleString()}
Bedrooms: ${bedrooms ?? 'N/A'}
Location: London/Essex UK
Analyse as an investment opportunity.`,
        },
      ],
    })

    const text = completion.choices[0].message.content ?? ''
    const parsed = JSON.parse(text.trim())
    return NextResponse.json(parsed)
  } catch (err) {
    console.error('[ai-analyse] error:', err)
    return NextResponse.json(DEMO_RESPONSE)
  }
}
