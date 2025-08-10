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
    // Fetch ALL data from about table
    const allAboutData = await prisma.about.findMany({
      orderBy: {
        id: 'asc'
      }
    });

    if (!allAboutData || allAboutData.length === 0) {
      return NextResponse.json(
        { error: 'No about data found' },
        { status: 404 }
      );
    }

    // Process each row and parse JSON data
    const processedData = allAboutData.map((item) => {
      let parsedData = null;
      let parseError = null;

      // Try to parse JSON data
      try {
        parsedData = JSON.parse(item.data);
      } catch (error) {
        parseError = error instanceof Error ? error.message : 'Unknown parse error';
        // Keep raw data if JSON parsing fails
        parsedData = item.data;
      }

      return {
        id: item.id,
        controller: item.controler,
        data: parsedData,
        visibility: item.visibility,
        parseError: parseError // Include parse error if any
      };
    });

    // Return all processed data
    return NextResponse.json({
      success: true,
      count: processedData.length,
      data: processedData
    }, { status: 200 });

  } catch (error: unknown) {
    let message = 'Unknown error';
    let stack = undefined;
    if (error instanceof Error) {
      message = error.message;
      stack = error.stack;
    }
    return NextResponse.json(
      { error: 'Failed to fetch about data', details: message, stack },
      { status: 500 }
    );
  }
}
