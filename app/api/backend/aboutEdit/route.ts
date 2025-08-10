import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/api/settings/prisma';

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log('=== AboutEdit API POST Request Started ===');
  console.log('Timestamp:', new Date().toISOString());
  
  try {
    // Parse request body with error handling
    let body;
    try {
      console.log('📥 Parsing request body...');
      body = await req.json();
      console.log('✅ Request body parsed successfully:', JSON.stringify(body, null, 2));
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

    const { controller, data, visibility } = body;
    console.log('🔍 Extracted fields:');
    console.log('Controller:', controller, '(type:', typeof controller, ')');
    console.log('Data type:', typeof data, 'Length:', typeof data === 'string' ? data.length : Array.isArray(data) ? data.length : 'N/A');
    console.log('Visibility:', visibility, '(type:', typeof visibility, ')');

    // Validate required fields
    if (!controller) {
      console.error('❌ Validation Error: Missing controller');
      return NextResponse.json(
        { 
          error: 'Controller is required',
          details: 'The controller field must be provided',
          code: 'MISSING_CONTROLLER',
          received: { controller, data, visibility }
        },
        { status: 400 }
      );
    }

    // Validate controller type
    if (typeof controller !== 'string') {
      console.error('❌ Validation Error: Invalid controller type');
      return NextResponse.json(
        { 
          error: 'Controller must be a string',
          details: `Expected string, received ${typeof controller}`,
          code: 'INVALID_CONTROLLER_TYPE',
          received: { controller, data, visibility }
        },
        { status: 400 }
      );
    }

    // Validate data field
    if (data === undefined || data === null) {
      console.error('❌ Validation Error: Missing or null data');
      return NextResponse.json(
        { 
          error: 'Data field is required',
          details: 'The data field cannot be null or undefined',
          code: 'MISSING_DATA',
          received: { controller, data, visibility }
        },
        { status: 400 }
      );
    }

    // Convert data to JSON string if it's an array (for highlights)
    let dataToStore;
    try {
      console.log('🔄 Processing data for storage...');
      if (Array.isArray(data)) {
        console.log('Data is array, converting to JSON string, Array length:', data.length);
        dataToStore = JSON.stringify(data);
      } else {
        console.log('Data is not array, storing as-is');
        dataToStore = data;
      }
      console.log('✅ Data processed for storage, Final length:', dataToStore.length);
    } catch (stringifyError) {
      console.error('❌ Data Serialization Error:', stringifyError);
      return NextResponse.json(
        { 
          error: 'Failed to serialize data',
          details: stringifyError instanceof Error ? stringifyError.message : 'JSON stringify failed',
          code: 'DATA_SERIALIZATION_ERROR',
          received: { controller, data, visibility }
        },
        { status: 400 }
      );
    }

    // Validate visibility field
    if (visibility !== undefined && typeof visibility !== 'boolean') {
      console.error('❌ Validation Error: Invalid visibility type');
      return NextResponse.json(
        { 
          error: 'Visibility must be a boolean',
          details: `Expected boolean, received ${typeof visibility}`,
          code: 'INVALID_VISIBILITY_TYPE',
          received: { controller, data, visibility }
        },
        { status: 400 }
      );
    }

    // Database operation with manual upsert logic
    console.log('🗄️ Starting database operation...');
    console.log('Looking for existing record with controller:', controller);
    
    let result;
    try {
      // First, try to find existing record
      const existingRecord = await prisma.about.findFirst({
        where: {
          controler: controller
        }
      });

      console.log('🔍 Existing record search result:', existingRecord ? 'Found' : 'Not found');
      
      if (existingRecord) {
        // Update existing record
        console.log('🔄 Updating existing record with ID:', existingRecord.id);
        result = await prisma.about.update({
          where: {
            id: existingRecord.id
          },
          data: {
            data: dataToStore,
            visibility: visibility ?? true
          }
        });
        console.log('✅ Record updated successfully');
      } else {
        // Create new record
        console.log('🆕 Creating new record');
        result = await prisma.about.create({
          data: {
            controler: controller,
            data: dataToStore,
            visibility: visibility ?? true
          }
        });
        console.log('✅ Record created successfully');
      }

      console.log('📊 Final result:');
      console.log('- ID:', result.id);
      console.log('- Controller:', result.controler);
      console.log('- Visibility:', result.visibility);
      console.log('- Data length:', result.data.length);
      
    } catch (dbError: any) {
      console.error('❌ Database Error Occurred:');
      console.error('=== FULL DATABASE ERROR DETAILS ===');
      console.error('Error object:', dbError);
      console.error('Error name:', dbError.name);
      console.error('Error message:', dbError.message);
      console.error('Error code:', dbError.code);
      console.error('Error meta:', dbError.meta);
      console.error('Error stack:', dbError.stack);
      console.error('=== END DATABASE ERROR DETAILS ===');

      // Handle specific Prisma errors
      if (dbError.code === 'P2002') {
        console.error('🔍 Prisma Error P2002: Unique constraint violation');
        return NextResponse.json(
          { 
            error: 'Database constraint violation',
            details: 'A record with this controller already exists',
            code: 'UNIQUE_CONSTRAINT_ERROR',
            dbError: dbError.message,
            meta: dbError.meta,
            prismaCode: dbError.code
          },
          { status: 409 }
        );
      }

      if (dbError.code === 'P2025') {
        console.error('🔍 Prisma Error P2025: Record not found');
        return NextResponse.json(
          { 
            error: 'Record not found',
            details: 'The record to update was not found',
            code: 'RECORD_NOT_FOUND',
            dbError: dbError.message,
            meta: dbError.meta,
            prismaCode: dbError.code
          },
          { status: 404 }
        );
      }

      if (dbError.code?.startsWith('P2')) {
        console.error('🔍 Generic Prisma Error:', dbError.code);
        return NextResponse.json(
          { 
            error: 'Database error',
            details: dbError.message,
            code: 'PRISMA_ERROR',
            prismaCode: dbError.code,
            meta: dbError.meta
          },
          { status: 500 }
        );
      }

      // Connection errors
      if (dbError.message?.includes('connect') || dbError.message?.includes('timeout')) {
        console.error('🔍 Database Connection Error');
        return NextResponse.json(
          { 
            error: 'Database connection failed',
            details: 'Unable to connect to the database',
            code: 'DB_CONNECTION_ERROR',
            dbError: dbError.message
          },
          { status: 503 }
        );
      }

      // Generic database error
      console.error('🔍 Unhandled Database Error');
      return NextResponse.json(
        { 
          error: 'Database operation failed',
          details: dbError.message || 'Unknown database error',
          code: 'DATABASE_ERROR',
          stack: process.env.NODE_ENV === 'development' ? dbError.stack : undefined
        },
        { status: 500 }
      );
    }

    // Success response
    console.log('🎉 API Request completed successfully');
    console.log('=== AboutEdit API POST Request Completed ===');
    
    return NextResponse.json({
      success: true,
      message: `${controller} updated successfully`,
      data: {
        id: result.id,
        controller: result.controler,
        visibility: result.visibility,
        updatedAt: new Date().toISOString()
      }
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('💥 UNEXPECTED ERROR OCCURRED:');
    console.error('Error object:', error);
    console.error('Error type:', typeof error);
    
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    let errorResponse = {
      error: 'Internal server error',
      details: 'An unexpected error occurred',
      code: 'INTERNAL_ERROR',
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

// Enhanced GET method for debugging
export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log('=== AboutEdit API GET Request Started ===');
  
  try {
    const { searchParams } = new URL(req.url);
    const controller = searchParams.get('controller');
    
    console.log('🔍 Search params:', Object.fromEntries(searchParams.entries()));

    if (controller) {
      console.log('🔎 Fetching single record for controller:', controller);
      
      const record = await prisma.about.findFirst({
        where: { controler: controller }
      });
      
      console.log('📊 Query result:', record ? 'Found' : 'Not found');
      if (record) {
        console.log('Record details:', {
          id: record.id,
          controler: record.controler,
          visibility: record.visibility,
          dataLength: record.data.length
        });
      }
      
      return NextResponse.json({
        success: true,
        data: record,
        found: !!record
      });
    }

    console.log('📊 Fetching all records');
    const allRecords = await prisma.about.findMany();
    console.log('Total records found:', allRecords.length);

    return NextResponse.json({
      success: true,
      data: allRecords,
      count: allRecords.length
    });

  } catch (error: unknown) {
    console.error('❌ GET Request Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch data',
        details: error instanceof Error ? error.message : 'Unknown error',
        code: 'FETCH_ERROR'
      },
      { status: 500 }
    );
  }
}
