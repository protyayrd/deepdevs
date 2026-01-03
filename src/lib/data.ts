import connectDB from './mongodb';
import FAQ from '@/models/FAQ';
import Contact from '@/models/Contact';
import SiteContent, { IContentData, IContentItem } from '@/models/SiteContent';
import Testimonial from '@/models/Testimonial';
import AppLink from '@/models/AppLink';
import Page from '@/models/Page';
import Navigation, { INavItem } from '@/models/Navigation';

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

// Site Content types
export interface SiteContentData {
  id: string;
  page: string;
  section: string;
  content: IContentData;
  isActive: boolean;
}

// Testimonial types
export interface TestimonialData {
  id: string;
  page: string;
  customerName: string;
  location: string;
  avatar: string;
  content: string;
  rating?: number;
  isActive: boolean;
  order: number;
}

// App Link types
export interface AppLinkData {
  id: string;
  appName: string;
  appDisplayName: string;
  appStoreUrl: string;
  playStoreUrl: string;
  appIcon: string;
  appDescription: string;
  isActive: boolean;
}

// Page types
export interface PageData {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaDescription?: string;
  metaKeywords?: string;
  isPublished: boolean;
  updatedAt: string;
}

// Navigation types
export interface NavigationData {
  id: string;
  position: string;
  items: INavItem[];
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

// ============== Site Content Functions ==============

export async function getSiteContent(page?: string, section?: string): Promise<SiteContentData[]> {
  try {
    await connectDB();

    const query: Record<string, unknown> = { isActive: true };
    if (page) query.page = page;
    if (section) query.section = section;

    const contents = await SiteContent.find(query).lean();

    return contents.map((content) => ({
      id: content._id.toString(),
      page: content.page,
      section: content.section,
      content: content.content,
      isActive: content.isActive,
    }));
  } catch (error) {
    console.error('Error fetching site content:', error);
    return [];
  }
}

export async function saveSiteContent(data: Omit<SiteContentData, 'id'>): Promise<SiteContentData> {
  await connectDB();

  const newContent = new SiteContent({
    page: data.page,
    section: data.section,
    content: data.content,
    isActive: data.isActive ?? true,
  });

  const saved = await newContent.save();

  return {
    id: saved._id.toString(),
    page: saved.page,
    section: saved.section,
    content: saved.content,
    isActive: saved.isActive,
  };
}

export async function updateSiteContent(id: string, data: Partial<Omit<SiteContentData, 'id'>>): Promise<SiteContentData | null> {
  await connectDB();

  const updated = await SiteContent.findByIdAndUpdate(id, data, { new: true });

  if (!updated) return null;

  return {
    id: updated._id.toString(),
    page: updated.page,
    section: updated.section,
    content: updated.content,
    isActive: updated.isActive,
  };
}

export async function upsertSiteContent(page: string, section: string, data: Partial<Omit<SiteContentData, 'id' | 'page' | 'section'>>): Promise<SiteContentData> {
  await connectDB();

  const updated = await SiteContent.findOneAndUpdate(
    { page, section },
    { ...data, page, section },
    { new: true, upsert: true }
  );

  return {
    id: updated._id.toString(),
    page: updated.page,
    section: updated.section,
    content: updated.content,
    isActive: updated.isActive,
  };
}

export async function deleteSiteContent(id: string): Promise<boolean> {
  await connectDB();
  const result = await SiteContent.findByIdAndDelete(id);
  return !!result;
}

// ============== Testimonial Functions ==============

export async function getTestimonials(page?: string): Promise<TestimonialData[]> {
  try {
    await connectDB();

    const query: Record<string, unknown> = { isActive: true };
    if (page) query.page = page;

    const testimonials = await Testimonial.find(query).sort({ order: 1 }).lean();

    return testimonials.map((t) => ({
      id: t._id.toString(),
      page: t.page,
      customerName: t.customerName,
      location: t.location,
      avatar: t.avatar,
      content: t.content,
      rating: t.rating,
      isActive: t.isActive,
      order: t.order,
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function saveTestimonial(data: Omit<TestimonialData, 'id'>): Promise<TestimonialData> {
  await connectDB();

  const newTestimonial = new Testimonial(data);
  const saved = await newTestimonial.save();

  return {
    id: saved._id.toString(),
    page: saved.page,
    customerName: saved.customerName,
    location: saved.location,
    avatar: saved.avatar,
    content: saved.content,
    rating: saved.rating,
    isActive: saved.isActive,
    order: saved.order,
  };
}

export async function updateTestimonial(id: string, data: Partial<Omit<TestimonialData, 'id'>>): Promise<TestimonialData | null> {
  await connectDB();

  const updated = await Testimonial.findByIdAndUpdate(id, data, { new: true });

  if (!updated) return null;

  return {
    id: updated._id.toString(),
    page: updated.page,
    customerName: updated.customerName,
    location: updated.location,
    avatar: updated.avatar,
    content: updated.content,
    rating: updated.rating,
    isActive: updated.isActive,
    order: updated.order,
  };
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  await connectDB();
  const result = await Testimonial.findByIdAndDelete(id);
  return !!result;
}

// ============== App Link Functions ==============

export async function getAppLinks(appName?: string): Promise<AppLinkData[]> {
  try {
    await connectDB();

    const query: Record<string, unknown> = { isActive: true };
    if (appName) query.appName = appName.toLowerCase();

    const links = await AppLink.find(query).lean();

    return links.map((l) => ({
      id: l._id.toString(),
      appName: l.appName,
      appDisplayName: l.appDisplayName,
      appStoreUrl: l.appStoreUrl,
      playStoreUrl: l.playStoreUrl,
      appIcon: l.appIcon,
      appDescription: l.appDescription,
      isActive: l.isActive,
    }));
  } catch (error) {
    console.error('Error fetching app links:', error);
    return [];
  }
}

export async function saveAppLink(data: Omit<AppLinkData, 'id'>): Promise<AppLinkData> {
  await connectDB();

  const newLink = new AppLink({
    ...data,
    appName: data.appName.toLowerCase(),
  });
  const saved = await newLink.save();

  return {
    id: saved._id.toString(),
    appName: saved.appName,
    appDisplayName: saved.appDisplayName,
    appStoreUrl: saved.appStoreUrl,
    playStoreUrl: saved.playStoreUrl,
    appIcon: saved.appIcon,
    appDescription: saved.appDescription,
    isActive: saved.isActive,
  };
}

export async function updateAppLink(id: string, data: Partial<Omit<AppLinkData, 'id'>>): Promise<AppLinkData | null> {
  await connectDB();

  const updateData = { ...data };
  if (data.appName) updateData.appName = data.appName.toLowerCase();

  const updated = await AppLink.findByIdAndUpdate(id, updateData, { new: true });

  if (!updated) return null;

  return {
    id: updated._id.toString(),
    appName: updated.appName,
    appDisplayName: updated.appDisplayName,
    appStoreUrl: updated.appStoreUrl,
    playStoreUrl: updated.playStoreUrl,
    appIcon: updated.appIcon,
    appDescription: updated.appDescription,
    isActive: updated.isActive,
  };
}

export async function upsertAppLink(appName: string, data: Partial<Omit<AppLinkData, 'id' | 'appName'>>): Promise<AppLinkData> {
  await connectDB();

  const updated = await AppLink.findOneAndUpdate(
    { appName: appName.toLowerCase() },
    { ...data, appName: appName.toLowerCase() },
    { new: true, upsert: true }
  );

  return {
    id: updated._id.toString(),
    appName: updated.appName,
    appDisplayName: updated.appDisplayName,
    appStoreUrl: updated.appStoreUrl,
    playStoreUrl: updated.playStoreUrl,
    appIcon: updated.appIcon,
    appDescription: updated.appDescription,
    isActive: updated.isActive,
  };
}

export async function deleteAppLink(id: string): Promise<boolean> {
  await connectDB();
  const result = await AppLink.findByIdAndDelete(id);
  return !!result;
}

// ============== Page Functions ==============

export async function getPages(slug?: string): Promise<PageData[]> {
  try {
    await connectDB();

    const query: Record<string, unknown> = {};
    if (slug) query.slug = slug.toLowerCase();

    const pages = await Page.find(query).lean();

    return pages.map((p) => ({
      id: p._id.toString(),
      slug: p.slug,
      title: p.title,
      content: p.content,
      metaDescription: p.metaDescription,
      metaKeywords: p.metaKeywords,
      isPublished: p.isPublished,
      updatedAt: p.updatedAt?.toISOString() || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    await connectDB();

    const page = await Page.findOne({ slug: slug.toLowerCase(), isPublished: true }).lean();

    if (!page) return null;

    return {
      id: page._id.toString(),
      slug: page.slug,
      title: page.title,
      content: page.content,
      metaDescription: page.metaDescription,
      metaKeywords: page.metaKeywords,
      isPublished: page.isPublished,
      updatedAt: page.updatedAt?.toISOString() || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export async function savePage(data: Omit<PageData, 'id' | 'updatedAt'>): Promise<PageData> {
  await connectDB();

  const newPage = new Page({
    ...data,
    slug: data.slug.toLowerCase(),
  });
  const saved = await newPage.save();

  return {
    id: saved._id.toString(),
    slug: saved.slug,
    title: saved.title,
    content: saved.content,
    metaDescription: saved.metaDescription,
    metaKeywords: saved.metaKeywords,
    isPublished: saved.isPublished,
    updatedAt: saved.updatedAt?.toISOString() || new Date().toISOString(),
  };
}

export async function updatePage(id: string, data: Partial<Omit<PageData, 'id' | 'updatedAt'>>): Promise<PageData | null> {
  await connectDB();

  const updateData = { ...data };
  if (data.slug) updateData.slug = data.slug.toLowerCase();

  const updated = await Page.findByIdAndUpdate(id, updateData, { new: true });

  if (!updated) return null;

  return {
    id: updated._id.toString(),
    slug: updated.slug,
    title: updated.title,
    content: updated.content,
    metaDescription: updated.metaDescription,
    metaKeywords: updated.metaKeywords,
    isPublished: updated.isPublished,
    updatedAt: updated.updatedAt?.toISOString() || new Date().toISOString(),
  };
}

export async function upsertPage(slug: string, data: Partial<Omit<PageData, 'id' | 'slug' | 'updatedAt'>>): Promise<PageData> {
  await connectDB();

  const updated = await Page.findOneAndUpdate(
    { slug: slug.toLowerCase() },
    { ...data, slug: slug.toLowerCase() },
    { new: true, upsert: true }
  );

  return {
    id: updated._id.toString(),
    slug: updated.slug,
    title: updated.title,
    content: updated.content,
    metaDescription: updated.metaDescription,
    metaKeywords: updated.metaKeywords,
    isPublished: updated.isPublished,
    updatedAt: updated.updatedAt?.toISOString() || new Date().toISOString(),
  };
}

export async function deletePage(id: string): Promise<boolean> {
  await connectDB();
  const result = await Page.findByIdAndDelete(id);
  return !!result;
}

// ============== Navigation Functions ==============

export async function getNavigation(position?: string): Promise<NavigationData[]> {
  try {
    await connectDB();

    const query: Record<string, unknown> = {};
    if (position) query.position = position;

    const navs = await Navigation.find(query).lean();

    return navs.map((n) => ({
      id: n._id.toString(),
      position: n.position,
      items: n.items.filter(item => item.isActive).sort((a, b) => a.order - b.order),
    }));
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return [];
  }
}

export async function saveNavigation(data: Omit<NavigationData, 'id'>): Promise<NavigationData> {
  await connectDB();

  const newNav = new Navigation(data);
  const saved = await newNav.save();

  return {
    id: saved._id.toString(),
    position: saved.position,
    items: saved.items,
  };
}

export async function updateNavigation(id: string, data: Partial<Omit<NavigationData, 'id'>>): Promise<NavigationData | null> {
  await connectDB();

  const updated = await Navigation.findByIdAndUpdate(id, data, { new: true });

  if (!updated) return null;

  return {
    id: updated._id.toString(),
    position: updated.position,
    items: updated.items,
  };
}

export async function upsertNavigation(position: string, items: INavItem[]): Promise<NavigationData> {
  await connectDB();

  const updated = await Navigation.findOneAndUpdate(
    { position },
    { position, items },
    { new: true, upsert: true }
  );

  return {
    id: updated._id.toString(),
    position: updated.position,
    items: updated.items,
  };
}

export async function deleteNavigation(id: string): Promise<boolean> {
  await connectDB();
  const result = await Navigation.findByIdAndDelete(id);
  return !!result;
}
