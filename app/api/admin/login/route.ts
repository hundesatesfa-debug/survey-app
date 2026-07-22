import { NextRequest, NextResponse } from 'next/server';
import {
  validateAdminUsername,
  verifyAdminPassword,
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!validateAdminUsername(username)) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyAdminPassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create a simple token (in production, use JWT)
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

    return NextResponse.json(
      { success: true, token },
      {
        status: 200,
        headers: {
          'Set-Cookie': `adminToken=${token}; Path=/; HttpOnly; Max-Age=3600`,
        },
      }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
