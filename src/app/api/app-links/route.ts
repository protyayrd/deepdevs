import { NextRequest, NextResponse } from 'next/server';
import { getAppLinks, saveAppLink, updateAppLink, deleteAppLink, upsertAppLink } from '@/lib/data';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const appName = searchParams.get('appName');

        const links = await getAppLinks(appName || undefined);
        return NextResponse.json(links);
    } catch (error) {
        console.error('Error in GET /api/app-links:', error);
        return NextResponse.json(
            { error: 'Failed to fetch app links' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { appName, appDisplayName, appStoreUrl, playStoreUrl, appIcon, appDescription, isActive } = body;

        if (!appName || !appDisplayName) {
            return NextResponse.json(
                { error: 'appName and appDisplayName are required' },
                { status: 400 }
            );
        }

        // Use upsert to handle duplicates gracefully
        const newLink = await upsertAppLink(appName, {
            appDisplayName,
            appStoreUrl: appStoreUrl || '#',
            playStoreUrl: playStoreUrl || '#',
            appIcon: appIcon || '',
            appDescription: appDescription || '',
            isActive: isActive ?? true,
        });

        return NextResponse.json(newLink, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/app-links:', error);
        return NextResponse.json(
            { error: 'Failed to create app link' },
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

        const updatedLink = await updateAppLink(id, updateData);

        if (!updatedLink) {
            return NextResponse.json(
                { error: 'App link not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedLink);
    } catch (error) {
        console.error('Error in PUT /api/app-links:', error);
        return NextResponse.json(
            { error: 'Failed to update app link' },
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

        const deleted = await deleteAppLink(id);

        if (!deleted) {
            return NextResponse.json(
                { error: 'App link not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in DELETE /api/app-links:', error);
        return NextResponse.json(
            { error: 'Failed to delete app link' },
            { status: 500 }
        );
    }
}
