import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, saveTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/data';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page');

        const testimonials = await getTestimonials(page || undefined);
        return NextResponse.json(testimonials);
    } catch (error) {
        console.error('Error in GET /api/testimonials:', error);
        return NextResponse.json(
            { error: 'Failed to fetch testimonials' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { page, customerName, location, avatar, content, rating, isActive, order } = body;

        if (!page || !customerName || !location || !content) {
            return NextResponse.json(
                { error: 'Page, customerName, location, and content are required' },
                { status: 400 }
            );
        }

        const newTestimonial = await saveTestimonial({
            page,
            customerName,
            location,
            avatar: avatar || '/figma/default-avatar.png',
            content,
            rating,
            isActive: isActive ?? true,
            order: order ?? 0,
        });

        return NextResponse.json(newTestimonial, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/testimonials:', error);
        return NextResponse.json(
            { error: 'Failed to create testimonial' },
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

        const updatedTestimonial = await updateTestimonial(id, updateData);

        if (!updatedTestimonial) {
            return NextResponse.json(
                { error: 'Testimonial not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedTestimonial);
    } catch (error) {
        console.error('Error in PUT /api/testimonials:', error);
        return NextResponse.json(
            { error: 'Failed to update testimonial' },
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

        const deleted = await deleteTestimonial(id);

        if (!deleted) {
            return NextResponse.json(
                { error: 'Testimonial not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in DELETE /api/testimonials:', error);
        return NextResponse.json(
            { error: 'Failed to delete testimonial' },
            { status: 500 }
        );
    }
}
