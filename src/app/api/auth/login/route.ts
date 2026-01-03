import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// Simple password-based authentication
// In production, use proper authentication (JWT, sessions, etc.)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Connect to DB
    await connectDB();

    // Find user
    // If email is not provided, allow login if there is only one admin? 
    // No, let's enforce email. But for now, if the UI sends only password, we could default to the seeded email?
    // Let's support both. If email is missing, try to find the 'admin' user or the specific seeded user.

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else {
      // Fallback: Find the first admin user
      // This is to support the legacy UI if needed, but we will update the UI too.
      user = await User.findOne({ role: 'admin' });
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (isMatch) {
      return NextResponse.json({ success: true, user: { email: user.email, role: user.role } });
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate' },
      { status: 500 }
    );
  }
}

