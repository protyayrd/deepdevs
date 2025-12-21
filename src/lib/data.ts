import connectDB from './mongodb';
import FAQ from '@/models/FAQ';
import Contact from '@/models/Contact';

export interface FAQ {
  id: string;
  page: string;
  question: string;
  answer: string;
}

export interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  subject: string;
  message: string;
  isRobot: boolean;
  submittedAt: string;
}

// FAQ functions
export async function getFAQs(page?: string): Promise<FAQ[]> {
  try {
    await connectDB();

    const query = page ? { page } : {};
    const faqs = await FAQ.find(query).sort({ createdAt: 1 }).lean();

    return faqs.map((faq) => ({
      id: faq._id.toString(),
      page: faq.page,
      question: faq.question,
      answer: faq.answer,
    }));
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

export async function saveFAQ(faq: Omit<FAQ, 'id'>): Promise<FAQ> {
  await connectDB();

  const newFAQ = new FAQ({
    page: faq.page,
    question: faq.question,
    answer: faq.answer,
  });

  const savedFAQ = await newFAQ.save();

  return {
    id: savedFAQ._id.toString(),
    page: savedFAQ.page,
    question: savedFAQ.question,
    answer: savedFAQ.answer,
  };
}

export async function updateFAQ(id: string, faq: Omit<FAQ, 'id'>): Promise<FAQ | null> {
  await connectDB();

  const updatedFAQ = await FAQ.findByIdAndUpdate(
    id,
    {
      page: faq.page,
      question: faq.question,
      answer: faq.answer,
    },
    { new: true }
  );

  if (!updatedFAQ) {
    return null;
  }

  return {
    id: updatedFAQ._id.toString(),
    page: updatedFAQ.page,
    question: updatedFAQ.question,
    answer: updatedFAQ.answer,
  };
}

export async function deleteFAQ(id: string): Promise<boolean> {
  await connectDB();

  const result = await FAQ.findByIdAndDelete(id);
  return !!result;
}

// Contact functions
export async function getContacts(): Promise<ContactSubmission[]> {
  try {
    await connectDB();

    const contacts = await Contact.find().sort({ submittedAt: -1 }).lean();

    return contacts.map((contact) => ({
      id: contact._id.toString(),
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
      emailAddress: contact.emailAddress,
      subject: contact.subject,
      message: contact.message,
      isRobot: contact.isRobot,
      submittedAt: contact.submittedAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

export async function saveContact(contact: Omit<ContactSubmission, 'id' | 'submittedAt'>): Promise<ContactSubmission> {
  await connectDB();

  const newContact = new Contact({
    firstName: contact.firstName,
    lastName: contact.lastName,
    phoneNumber: contact.phoneNumber,
    emailAddress: contact.emailAddress,
    subject: contact.subject,
    message: contact.message,
    isRobot: contact.isRobot,
    submittedAt: new Date(),
  });

  const savedContact = await newContact.save();

  return {
    id: savedContact._id.toString(),
    firstName: savedContact.firstName,
    lastName: savedContact.lastName,
    phoneNumber: savedContact.phoneNumber,
    emailAddress: savedContact.emailAddress,
    subject: savedContact.subject,
    message: savedContact.message,
    isRobot: savedContact.isRobot,
    submittedAt: savedContact.submittedAt.toISOString(),
  };
}

