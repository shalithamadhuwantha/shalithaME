import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const givenName = formData.get('name') as string;
    const savePath = formData.get('savePath') as string; // e.g., 'public/assets/img/certlogo'
    const urlPrefix = formData.get('urlPrefix') as string; // e.g., '/api/settings/img/out/assets/img/certlogo/'

    if (!file || !file.name || !givenName || !savePath || !urlPrefix) {
      return NextResponse.json({ success: false, error: 'Missing file, name, path, or URL prefix' }, { status: 400 });
    }

    // Only allow safe filenames
    const safeName = givenName.replace(/[^a-zA-Z0-9_\-.]/g, '');
    if (!safeName) {
      return NextResponse.json({ success: false, error: 'Invalid name' }, { status: 400 });
    }

    // Save the uploaded file to the custom directory
    const buffer = Buffer.from(await file.arrayBuffer());
    const dirPath = join(process.cwd(), ...savePath.split('/'));
    const filePath = join(dirPath, safeName);

    await mkdir(dirPath, { recursive: true });
    await writeFile(filePath, buffer);

    // Return URL using the provided prefix
    return NextResponse.json({ success: true, url: urlPrefix + safeName });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to upload image' }, { status: 500 });
  }
}
