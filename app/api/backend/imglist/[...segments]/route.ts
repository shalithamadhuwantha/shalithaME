import { readdir } from "fs/promises";
import path, { join, normalize } from "path";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: Promise<{ segments?: string[] }> }) {
  // Await params! (params is a Promise)
  const { segments = [] } = await context.params;
  try {
    console.log(`Received segments: ${JSON.stringify(segments)}`);
    const userPath = join(...segments);

    // SECURITY: Prevent outside-path access
    if (userPath.includes("..")) {
      return NextResponse.json({ images: [], path: userPath });
    }

    const dir = join(process.cwd(), userPath);
    console.log(`Listing images in: ${dir}`);

    const allowedBase = join(process.cwd(), "public", "assets");
    if (!normalize(dir).startsWith(allowedBase)) {
      return NextResponse.json({ images: [], path: userPath });
    }

    const images = await readdir(dir);
    return NextResponse.json({ images });
  } catch (e) {
    return NextResponse.json({ images: [] });
  }
}
