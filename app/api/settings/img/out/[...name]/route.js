import { join } from 'path';
import { stat, readFile } from 'fs/promises';
import { log } from 'console';

export async function GET(request, { params }) {
    // Extract the image filename from the URL
    const { name } = params || ""; // expects [...name] catch-all
    if (!name || !Array.isArray(name) || name.length === 0) {
        return new Response('Image not specified', { status: 400 });
    }

    // Construct the image path (basic version: serve from public directory)
    const imagePath = join(process.cwd(), 'public', ...name);
    log(`Requesting image: ${imagePath}`);
    try {
        // Check if file exists
        await stat(imagePath);

        // Read the file
        const imageBuffer = await readFile(imagePath);

        // Get content type from extension
        const ext = name[name.length - 1].split('.').pop();
        const contentType = {
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            gif: 'image/gif',
            webp: 'image/webp',
            svg: 'image/svg+xml'
        }[ext] || 'application/octet-stream';
        return new Response(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable'
            }
        });
    } catch (err) {
        return new Response('Image not found', { status: 404 });
    }
}