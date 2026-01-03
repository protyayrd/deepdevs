import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, saveSiteContent, updateSiteContent, deleteSiteContent, upsertSiteContent } from '@/lib/data';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page');
        const section = searchParams.get('section');

        const content = await getSiteContent(page || undefined, section || undefined);
        return NextResponse.json(content);
    } catch (error) {
        console.error('Error in GET /api/content:', error);
        return NextResponse.json(
            { error: 'Failed to fetch content' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { page, section, content, isActive } = body;

        if (!page || !section || !content) {
            return NextResponse.json(
                { error: 'Page, section, and content are required' },
                { status: 400 }
            );
        }

        // Use upsert to avoid duplicate key errors
        const newContent = await upsertSiteContent(page, section, { content, isActive });
        return NextResponse.json(newContent, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/content:', error);
        return NextResponse.json(
            { error: 'Failed to create content' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, page, section, content, isActive } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        }

        const updatedContent = await updateSiteContent(id, { page, section, content, isActive });

        if (!updatedContent) {
            return NextResponse.json(
                { error: 'Content not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedContent);
    } catch (error) {
        console.error('Error in PUT /api/content:', error);
        return NextResponse.json(
            { error: 'Failed to update content' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        }

        const deleted = await deleteSiteContent(id);

        if (!deleted) {
            return NextResponse.json(
                { error: 'Content not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in DELETE /api/content:', error);
        return NextResponse.json(
            { error: 'Failed to delete content' },
            { status: 500 }
        );
    }
}
