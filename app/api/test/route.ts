import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Just check if we can query the database
    const count = await prisma.user.count()

    return NextResponse.json({ 
      message: 'Database connection successful', 
      userCount: count 
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ 
      error: 'Database connection failed', 
      details: error 
    }, { status: 500 })
  }
}