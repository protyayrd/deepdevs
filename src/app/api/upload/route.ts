import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only JPEG, PNG, GIF, WebP, and SVG are allowed.' },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 5MB.' },
                { status: 400 }
            );
        }

        // Ensure upload directory exists
        if (!existsSync(UPLOAD_DIR)) {
            await mkdir(UPLOAD_DIR, { recursive: true });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const ext = path.extname(file.name) || '.png';
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').replace(ext, '');
        const filename = `${safeName}-${timestamp}-${randomSuffix}${ext}`;

        // Write file to disk
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filepath = path.join(UPLOAD_DIR, filename);
        await writeFile(filepath, buffer);

        // Return public URL
        const publicUrl = `/uploads/${filename}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            filename,
            size: file.size,
            type: file.type,
        });
    } catch (error) {
        console.error('Error in POST /api/upload:', error);
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const { readdir, stat } = await import('fs/promises');

        if (!existsSync(UPLOAD_DIR)) {
            return NextResponse.json([]);
        }

        const files = await readdir(UPLOAD_DIR);
        const fileInfos = await Promise.all(
            files.map(async (filename) => {
                const filepath = path.join(UPLOAD_DIR, filename);
                const stats = await stat(filepath);
                return {
                    filename,
                    url: `/uploads/${filename}`,
                    size: stats.size,
                    createdAt: stats.birthtime.toISOString(),
                };
            })
        );

        // Sort by creation date, newest first
        fileInfos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json(fileInfos);
    } catch (error) {
        console.error('Error in GET /api/upload:', error);
        return NextResponse.json(
            { error: 'Failed to list files' },
            { status: 500 }
        );
    }
}
