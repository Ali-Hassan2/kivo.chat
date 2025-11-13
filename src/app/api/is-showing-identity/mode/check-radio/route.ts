import { NextResponse } from 'next/server'

async function GET(request: Request) {
  return NextResponse.json(
    {
      success: false,
      message: 'Will complete it soom',
    },
    {
      status: 200,
    },
  )
}

export {GET}
