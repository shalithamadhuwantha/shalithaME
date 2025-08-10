// lib/auth/verifyApiKey.ts
import { NextRequest, NextResponse } from 'next/server';

export function verifyApiKey(req: NextRequest): NextResponse | null {
  const authHeader = req.headers.get('authorization') || req.headers.get('x-api-key');
  const token = authHeader?.replace('Bearer ', '').trim();

  if (!token || token !== process.env.NEXT_PUBLIC_MY_API_KEY) {
    console.warn('Unauthorized access attempt with token:', token);
    return NextResponse.json(
      { error: 'Unauthorized: Invalid or missing API key' },
      { status: 401 }
    );
  }

  return null; // Means passed
}
