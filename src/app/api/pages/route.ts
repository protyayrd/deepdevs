import { NextRequest, NextResponse } from 'next/server';
import { getPages, getPageBySlug, savePage, updatePage, deletePage, upsertPage } from '@/lib/data';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (slug) {
            // Get single page by slug
            const page = await getPageBySlug(slug);
            if (!page) {
                return NextResponse.json(
                    { error: 'Page not found' },
                    { status: 404 }
                );
            }
            return NextResponse.json(page);
        }

        // Get all pages
        const pages = await getPages();
        return NextResponse.json(pages);
    } catch (error) {
        console.error('Error in GET /api/pages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch pages' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { slug, title, content, metaDescription, metaKeywords, isPublished } = body;

        if (!slug || !title) {
            return NextResponse.json(
                { error: 'Slug and title are required' },
                { status: 400 }
            );
        }

        // Use upsert to handle duplicates gracefully
        const newPage = await upsertPage(slug, {
            title,
            content: content || '',
            metaDescription: metaDescription || '',
            metaKeywords: metaKeywords || '',
            isPublished: isPublished ?? true,
        });

        return NextResponse.json(newPage, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/pages:', error);
        return NextResponse.json(
            { error: 'Failed to create page' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        }

        const updatedPage = await updatePage(id, updateData);

        if (!updatedPage) {
            return NextResponse.json(
                { error: 'Page not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedPage);
    } catch (error) {
        console.error('Error in PUT /api/pages:', error);
        return NextResponse.json(
            { error: 'Failed to update page' },
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

        const deleted = await deletePage(id);

        if (!deleted) {
            return NextResponse.json(
                { error: 'Page not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in DELETE /api/pages:', error);
        return NextResponse.json(
            { error: 'Failed to delete page' },
            { status: 500 }
        );
    }
}
