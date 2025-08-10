import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/api/settings/prisma';
import { verifyApiKey } from '@/api/settings/auth';

export async function GET(req: NextRequest): Promise<NextResponse> {
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
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    let whereClause: any = {
      visibility: true
    };

    // Filter by type if provided
    if (type && type !== 'all') {
      whereClause.type = type;
    }

    // Search functionality
    if (search) {
      whereClause.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ];
    }

    const thoughts = await prisma.thoughts.findMany({
      where: whereClause,
      orderBy: {
        date: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      count: thoughts.length,
      data: thoughts
    }, { status: 200 });

  } catch (error: unknown) {
    let message = 'Unknown error';
    let stack = undefined;
    if (error instanceof Error) {
      message = error.message;
      stack = error.stack;
    }
    return NextResponse.json(
      { error: 'Failed to fetch thoughts data', details: message, stack },
      { status: 500 }
    );
  }
}
