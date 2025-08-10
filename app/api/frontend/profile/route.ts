
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/api/settings/prisma';
import { verifyApiKey } from '@/api/settings/auth';
import { log } from 'node:console';

export async function GET(req: NextRequest): Promise<NextResponse> {
  // ✅ Call reusable auth
  console.log("call profile")
  try {
    const authError = verifyApiKey(req);
    console.log(req);
    console.log(authError);
    
    // if (authError) return authError;

  } catch (authErr: unknown) {
    console.log('Authentication Error:', authErr);
    
    const message =
      authErr instanceof Error ? authErr.message : 'Unknown authentication error';
    return NextResponse.json(
      { error: 'Authentication failed', details: message },
      { status: 401 }
    );
  }

  try {
    const profiles = await prisma.profile.findMany();
    return NextResponse.json(profiles, { status: 200 });
  } catch (error: unknown) {
    let message = 'Unknown error';
    let stack = undefined;
    if (error instanceof Error) {
      message = error.message;
      stack = error.stack;
    }
    return NextResponse.json(
      { error: 'Failed to fetch profiles', details: message, stack },
      { status: 500 }
    );
  }
}
