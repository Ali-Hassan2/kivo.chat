import { NextResponse } from 'next/server'

type RequestBody = {
  prompt?: string
}

function generateDumbReply(prompt?: string) {
  const base = "I'm a very dumb agent."
  if (!prompt) return `${base} You didn't give me anything to work with.`
  // intentionally silly transformations
  const worthless = prompt.split('').reverse().join('')
  return `${base} You said: "${prompt}". Backwards it's "${worthless}". Brilliant, right?`
}

export async function GET() {
  const reply = generateDumbReply()
  return NextResponse.json({ agent: 'dumb-agent', prompt: null, reply })
}

export async function POST(request: Request) {
  let body: RequestBody | undefined
  try {
    body = (await request.json()) as RequestBody
  } catch (e) {
    // ignore parse errors
  }
  const reply = generateDumbReply(body?.prompt)
  return NextResponse.json({
    agent: 'dumb-agent',
    prompt: body?.prompt ?? null,
    reply,
  })
}

export const runtime = 'edge'
