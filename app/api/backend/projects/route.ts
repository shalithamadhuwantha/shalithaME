import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/api/settings/prisma';

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log('=== Projects API GET Request Started ===');
  
  try {
    const projects = await prisma.thoughts.findMany({
      orderBy: {
        date: 'desc'
      }
    });

    console.log('✅ Projects fetched successfully, count:', projects.length);

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('❌ GET Request Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch projects',
        details: error instanceof Error ? error.message : 'Unknown error',
        code: 'FETCH_ERROR'
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log('=== Projects API POST Request Started ===');
  
  try {
    let body;
    try {
      body = await req.json();
      console.log('✅ Request body parsed, projects count:', body.length);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      return NextResponse.json(
        { 
          error: 'Invalid JSON in request body',
          details: parseError instanceof Error ? parseError.message : 'Failed to parse JSON',
          code: 'JSON_PARSE_ERROR'
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { 
          error: 'Request body must be an array of projects',
          code: 'INVALID_BODY_FORMAT'
        },
        { status: 400 }
      );
    }

    console.log('🗄️ Starting database operations...');

    // Delete all existing projects first
    await prisma.thoughts.deleteMany();
    console.log('🗑️ Deleted existing projects');

    // Insert new projects
    const projectsToCreate = body.map((project: any) => ({
      title: project.title,
      description: project.description,
      image: project.image,
      link: project.link,
      date: new Date(project.date),
      type: project.type,
      visibility: project.visibility ?? true
    }));

    const result = await prisma.thoughts.createMany({
      data: projectsToCreate
    });

    console.log('✅ Projects created successfully, count:', result.count);

    return NextResponse.json({
      success: true,
      message: `${result.count} projects saved successfully`,
      count: result.count
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('💥 POST Request Error:', error);
    
    let errorResponse = {
      error: 'Failed to save projects',
      details: 'An unexpected error occurred',
      code: 'SAVE_ERROR',
      timestamp: new Date().toISOString()
    };

    if (error instanceof Error) {
      errorResponse.details = error.message;
      if (process.env.NODE_ENV === 'development') {
        (errorResponse as any).stack = error.stack;
        (errorResponse as any).name = error.name;
      }
    }

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
