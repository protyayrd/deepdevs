import { NextRequest, NextResponse } from 'next/server';
import { getContacts, saveContact } from '@/lib/data';

export async function GET() {
  try {
    // Contacts are already sorted by most recent first in getContacts()
    const contacts = await getContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error in GET /api/contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phoneNumber, emailAddress, subject, message, isRobot } = body;

    if (!firstName || !lastName || !phoneNumber || !emailAddress || !subject) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const newContact = await saveContact({
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      subject,
      message: message || '',
      isRobot: isRobot || false,
    });

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/contacts:', error);
    return NextResponse.json(
      { error: 'Failed to save contact' },
      { status: 500 }
    );
  }
}

