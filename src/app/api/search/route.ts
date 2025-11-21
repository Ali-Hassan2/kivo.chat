import { NextResponse } from 'next/server'

async function GET(request: Request) {
  if (request.method !== 'GET') {
    return NextResponse.json(
      {
        success: false,
        message: 'Method Not Allowed',
      },
      {
        status: 405,
      },
    )
  }
}
