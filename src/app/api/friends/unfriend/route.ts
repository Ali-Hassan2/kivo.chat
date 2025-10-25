import { NextResponse } from "next/server"

async function POST(request: Request) {
  return NextResponse.json({
    success: true,
  })
}

export {POST}
