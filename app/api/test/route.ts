import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Try to create a test user
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: 'test123', // In real app, this should be hashed
        role: 'USER'
      }
    })

    return NextResponse.json({ 
      message: 'Database connection successful', 
      user 
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ 
      error: 'Database connection failed', 
      details: error 
    }, { status: 500 })
  }
}