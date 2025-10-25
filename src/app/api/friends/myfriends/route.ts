import { NextResponse } from 'next/server'

async function GET(request: Request) {
  return NextResponse.json({
    success: true,
  })
}

export { GET }
