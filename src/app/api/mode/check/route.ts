import { NextResponse } from 'next/server'

async function GET(request: Request) {
  return NextResponse.json(
    {
      success: true,
      message: 'TODO',
    },
    {
      status: 200,
    },
  )
}

export { GET }
