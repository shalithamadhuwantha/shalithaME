import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/api/settings/prisma';
import crypto from 'crypto';

interface TrackingData {
  endpoint: string;
  sessionId: string;
  userAgent?: string;
  timestamp: Date;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // console.log('=== Visit Tracking API Started ===');
  
  try {
    // Parse request data
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { endpoint } = body;
    
    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint is required' },
        { status: 400 }
      );
    }

    // Get privacy-compliant visitor data
const clientIP =
  req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  req.headers.get('x-real-ip') ||
  'unknown';

    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // Create hashed identifiers (GDPR compliant - no personal data stored)
    const ipHash = crypto.createHash('sha256').update(clientIP + process.env.HASH_SALT).digest('hex');
    const userAgentHash = crypto.createHash('sha256').update(userAgent).digest('hex');
    const sessionId = crypto.createHash('sha256').update(`${ipHash}-${userAgentHash}-${new Date().toDateString()}`).digest('hex');

    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD format

    // console.log('📊 Tracking visit:', {
      //endpoint,
      //date: dateString,
      //sessionId: sessionId.substring(0, 8) + '...', // Log partial session ID for debugging
    //});

    // Check if this is a unique visitor for this endpoint today
    const existingSession = await prisma.visitor_sessions.findFirst({
      where: {
        session_id: sessionId,
        endpoint: endpoint,
        visited_at: {
          gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
          lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
        }
      }
    });

    const isUniqueVisitor = !existingSession;

    // Record the session (for unique visitor tracking)
    if (isUniqueVisitor) {
      await prisma.visitor_sessions.create({
        data: {
          session_id: sessionId,
          endpoint: endpoint,
          ip_hash: ipHash,
          user_agent_hash: userAgentHash,
          visited_at: today
        }
      });
      // console.log('✅ New unique visitor recorded');
    }

    // Update or create page counter
    await prisma.page_counters.upsert({
      where: {
        endpoint_date: {
          endpoint: endpoint,
          date: new Date(dateString)
        }
      },
      update: {
        views: {
          increment: 1
        },
        unique_visitors: isUniqueVisitor ? {
          increment: 1
        } : undefined,
        updated_at: today
      },
      create: {
        endpoint: endpoint,
        date: new Date(dateString),
        views: 1,
        unique_visitors: isUniqueVisitor ? 1 : 0,
        created_at: today,
        updated_at: today
      }
    });

    // console.log('✅ Page counter updated successfully');

    return NextResponse.json({
      success: true,
      message: 'Visit tracked successfully',
      data: {
        endpoint,
        date: dateString,
        isUniqueVisitor
      }
    }, { status: 200 });

  } catch (error: unknown) {
    // console.error('💥 Tracking Error:', error);
    
    return NextResponse.json({
      error: 'Failed to track visit',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET endpoint to retrieve statistics
export async function GET(req: NextRequest): Promise<NextResponse> {
  // console.log('=== Visit Statistics API Started ===');
  
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get('endpoint');
    const period = searchParams.get('period') || 'daily'; // daily, weekly, monthly
    const limit = parseInt(searchParams.get('limit') || '30');

    let whereClause: any = {};
    let dateFilter: any = {};

    if (endpoint) {
      whereClause.endpoint = endpoint;
    }

    // Date filtering based on period
    const now = new Date();
    switch (period) {
      case 'daily':
        dateFilter = {
          gte: new Date(now.getTime() - (limit * 24 * 60 * 60 * 1000)) // Last N days
        };
        break;
      case 'weekly':
        dateFilter = {
          gte: new Date(now.getTime() - (limit * 7 * 24 * 60 * 60 * 1000)) // Last N weeks
        };
        break;
      case 'monthly':
        dateFilter = {
          gte: new Date(now.getTime() - (limit * 30 * 24 * 60 * 60 * 1000)) // Last N months
        };
        break;
    }

    whereClause.date = dateFilter;

    const statistics = await prisma.page_counters.findMany({
      where: whereClause,
      orderBy: {
        date: 'desc'
      },
      take: limit
    });

    // Aggregate data based on period
    let aggregatedData;
    if (period === 'weekly') {
      // Group by week
      const weeklyData: { [key: string]: { views: number; unique_visitors: number; endpoints: Set<string> } } = {};
      
statistics.forEach(stat => {
  const weekStart = getWeekStart(new Date(stat.date));
  const weekKey = weekStart.toISOString().split('T')[0];

  if (!weeklyData[weekKey]) {
    weeklyData[weekKey] = { views: 0, unique_visitors: 0, endpoints: new Set() };
  }

  weeklyData[weekKey].views += stat.views ?? 0;
  weeklyData[weekKey].unique_visitors += stat.unique_visitors ?? 0;
  weeklyData[weekKey].endpoints.add(stat.endpoint);
});

      
      aggregatedData = Object.entries(weeklyData).map(([date, data]) => ({
        period: date,
        views: data.views,
        unique_visitors: data.unique_visitors,
        endpoints_count: data.endpoints.size
      }));
    } else if (period === 'monthly') {
      // Group by month
      const monthlyData: { [key: string]: { views: number; unique_visitors: number; endpoints: Set<string> } } = {};
      
statistics.forEach(stat => {
  const date = new Date(stat.date);
  const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

  if (!monthlyData[monthKey]) {
    monthlyData[monthKey] = { views: 0, unique_visitors: 0, endpoints: new Set() };
  }

  monthlyData[monthKey].views += stat.views ?? 0;
  monthlyData[monthKey].unique_visitors += stat.unique_visitors ?? 0;
  monthlyData[monthKey].endpoints.add(stat.endpoint);
});

      aggregatedData = Object.entries(monthlyData).map(([date, data]) => ({
        period: date,
        views: data.views,
        unique_visitors: data.unique_visitors,
        endpoints_count: data.endpoints.size
      }));
    } else {
      // Daily data (no aggregation needed)
      aggregatedData = statistics.map(stat => ({
        period: stat.date.toISOString().split('T')[0],
        endpoint: stat.endpoint,
        views: stat.views,
        unique_visitors: stat.unique_visitors
      }));
    }

    return NextResponse.json({
      success: true,
      period,
      limit,
      endpoint,
      data: aggregatedData,
      total_records: statistics.length
    }, { status: 200 });

  } catch (error: unknown) {
    // console.error('💥 Statistics Error:', error);
    
    return NextResponse.json({
      error: 'Failed to fetch statistics',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Helper function to get week start date
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
}
