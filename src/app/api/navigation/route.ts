import { NextRequest, NextResponse } from 'next/server';
import { getNavigation, saveNavigation, updateNavigation, deleteNavigation, upsertNavigation } from '@/lib/data';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const position = searchParams.get('position');

        const navigation = await getNavigation(position || undefined);
        return NextResponse.json(navigation);
    } catch (error) {
        console.error('Error in GET /api/navigation:', error);
        return NextResponse.json(
            { error: 'Failed to fetch navigation' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { position, items } = body;

        if (!position || !items) {
            return NextResponse.json(
                { error: 'Position and items are required' },
                { status: 400 }
            );
        }

        // Validate position
        if (!['header', 'footer', 'sidebar'].includes(position)) {
            return NextResponse.json(
                { error: 'Position must be header, footer, or sidebar' },
                { status: 400 }
            );
        }

        // Use upsert to handle duplicates gracefully
        const newNavigation = await upsertNavigation(position, items);
        return NextResponse.json(newNavigation, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/navigation:', error);
        return NextResponse.json(
            { error: 'Failed to create navigation' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, position, items } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        }

        const updatedNavigation = await updateNavigation(id, { position, items });

        if (!updatedNavigation) {
            return NextResponse.json(
                { error: 'Navigation not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedNavigation);
    } catch (error) {
        console.error('Error in PUT /api/navigation:', error);
        return NextResponse.json(
            { error: 'Failed to update navigation' },
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

        const deleted = await deleteNavigation(id);

        if (!deleted) {
            return NextResponse.json(
                { error: 'Navigation not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in DELETE /api/navigation:', error);
        return NextResponse.json(
            { error: 'Failed to delete navigation' },
            { status: 500 }
        );
    }
}
