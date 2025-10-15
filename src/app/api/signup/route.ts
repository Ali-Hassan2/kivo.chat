import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('The request body is:', request)
  return NextResponse.json({ message: 'Signup route working' })
}
