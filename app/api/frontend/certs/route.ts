import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/api/settings/prisma';
import { verifyApiKey } from '@/api/settings/auth';

export async function GET(req: NextRequest): Promise<NextResponse> {
  // ✅ Call reusable auth
  try {
    const authError = verifyApiKey(req);
    if (authError) return authError;
  } catch (authErr: unknown) {
    const message =
      authErr instanceof Error ? authErr.message : 'Unknown authentication error';
    return NextResponse.json(
      { error: 'Authentication failed', details: message },
      { status: 401 }
    );
  }

  try {
    const certs = await prisma.cert.findMany({
  orderBy: [{ issuedate: 'desc' }],
});

    return NextResponse.json(certs, { status: 200 });
  } catch (error: unknown) {
    let message = 'Unknown error';
    let stack = undefined;
    if (error instanceof Error) {
      message = error.message;
      stack = error.stack;
    }
    return NextResponse.json(
      { error: 'Failed to fetch certs', details: message, stack },
      { status: 500 }
    );
  }
}
