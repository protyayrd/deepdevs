import { NextRequest, NextResponse } from 'next/server';
import { getFAQs, saveFAQ, updateFAQ, deleteFAQ } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const faqs = await getFAQs(page || undefined);
    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error in GET /api/faqs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, question, answer } = body;

    if (!page || !question || !answer) {
      return NextResponse.json(
        { error: 'Page, question, and answer are required' },
        { status: 400 }
      );
    }

    const newFAQ = await saveFAQ({ page, question, answer });
    return NextResponse.json(newFAQ, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/faqs:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, page, question, answer } = body;

    if (!id || !page || !question || !answer) {
      return NextResponse.json(
        { error: 'ID, page, question, and answer are required' },
        { status: 400 }
      );
    }

    const updatedFAQ = await updateFAQ(id, { page, question, answer });

    if (!updatedFAQ) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedFAQ);
  } catch (error) {
    console.error('Error in PUT /api/faqs:', error);
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
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

    const deleted = await deleteFAQ(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/faqs:', error);
    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}

