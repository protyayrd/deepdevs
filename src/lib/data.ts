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
  websiteUrl: string;
  appStoreUrl: string;
  playStoreUrl: string;
  appIcon: string;
  mockupImage: string;
  qrCode: string;
  appDescription: string;
  features: string[];
  platforms: string[];
  order: number;
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

const DEFAULT_APPS: AppLinkData[] = [
  {
    id: 'default-yoler',
    appName: 'yoler',
    appDisplayName: 'Yoler',
    websiteUrl: '/apps/yoler',
    appStoreUrl: '#',
    playStoreUrl: '#',
    appIcon: 'https://placehold.co/100/4F46E5/ffffff?text=Y',
    mockupImage: 'https://placehold.co/1080x1920/black/white?text=Yoler+App',
    qrCode: 'https://placehold.co/200?text=QR+Code',
    appDescription: 'Your ultimate travel companion for seamless rides and deliveries. Yoler connects you with trusted drivers instantly.',
    features: ['Ride Sharing', 'Real-time Tracking', 'Secure Payments'],
    platforms: ['iOS', 'Android'],
    order: 1,
    isActive: true
  },
  {
    id: 'default-plantzify',
    appName: 'plantzify',
    appDisplayName: 'Plantzify',
    websiteUrl: '/apps/plantzify',
    appStoreUrl: '#',
    playStoreUrl: '#',
    appIcon: 'https://placehold.co/100/10B981/ffffff?text=P',
    mockupImage: 'https://placehold.co/1080x1920/10B981/white?text=Plantzify',
    qrCode: 'https://placehold.co/200?text=QR+Code',
    appDescription: 'Identify plants instantly and get expert care tips. Your personal botanist in your pocket to keep your garden thriving.',
    features: ['Plant ID', 'Care Schedules', 'Disease Diagnosis'],
    platforms: ['iOS', 'Android'],
    order: 2,
    isActive: true
  },
  {
    id: 'default-deepstudy',
    appName: 'deep-study-ai',
    appDisplayName: 'Deep Study AI',
    websiteUrl: '/apps/deep-study-ai',
    appStoreUrl: '#',
    playStoreUrl: '#',
    appIcon: 'https://placehold.co/100/3B82F6/ffffff?text=DS',
    mockupImage: 'https://placehold.co/1080x1920/3B82F6/white?text=Deep+Study+AI',
    qrCode: 'https://placehold.co/200?text=QR+Code',
    appDescription: 'Master any subject with AI-powered study plans, flashcards, and personalized tutoring sessions.',
    features: ['AI Tutoring', 'Smart Flashcards', 'Progress Analytics'],
    platforms: ['Web', 'iOS'],
    order: 3,
    isActive: true
  },
  {
    id: 'default-sesign',
    appName: 'sesign',
    appDisplayName: 'SeSign',
    websiteUrl: '/apps/sesign',
    appStoreUrl: '#',
    playStoreUrl: '#',
    appIcon: 'https://placehold.co/100/6366F1/ffffff?text=S',
    mockupImage: 'https://placehold.co/1080x1920/6366F1/white?text=SeSign',
    qrCode: 'https://placehold.co/200?text=QR+Code',
    appDescription: 'Secure, legally binding digital signatures for everyone. Sign documents anywhere, anytime with bank-grade security.',
    features: ['E-Signatures', 'Audit Trails', 'Document Management'],
    platforms: ['Web', 'Mobile'],
    order: 4,
    isActive: true
  },
  {
    id: 'default-ztax',
    appName: 'ztax',
    appDisplayName: 'Ztax',
    websiteUrl: '/apps/ztax',
    appStoreUrl: '#',
    playStoreUrl: '#',
    appIcon: 'https://placehold.co/100/F59E0B/ffffff?text=Z',
    mockupImage: 'https://placehold.co/1080x1920/F59E0B/white?text=Ztax',
    qrCode: 'https://placehold.co/200?text=QR+Code',
    appDescription: 'Simplify your taxes with our intelligent filing system. Maximize refunds and ensure compliance effortlessly.',
    features: ['Auto Filing', 'Expense Tracking', 'Expert Support'],
    platforms: ['Web', 'Android'],
    order: 5,
    isActive: true
  }
];

export async function getAppLinks(appName?: string): Promise<AppLinkData[]> {
  try {
    await connectDB();

    const query: Record<string, unknown> = { isActive: true };
    if (appName) query.appName = appName.toLowerCase();

    const links = await AppLink.find(query).lean();

    if (!links || links.length === 0) {
      return DEFAULT_APPS;
    }

    return links.map((l) => ({
      id: l._id.toString(),
      appName: l.appName,
      appDisplayName: l.appDisplayName,
      websiteUrl: l.websiteUrl,
      appStoreUrl: l.appStoreUrl,
      playStoreUrl: l.playStoreUrl,
      appIcon: l.appIcon,
      mockupImage: l.mockupImage,
      qrCode: l.qrCode,
      appDescription: l.appDescription,
      features: l.features,
      platforms: l.platforms,
      order: l.order,
      isActive: l.isActive,
    }));
  } catch (error) {
    console.error('Error fetching app links:', error);
    return DEFAULT_APPS;
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
    websiteUrl: saved.websiteUrl,
    appStoreUrl: saved.appStoreUrl,
    playStoreUrl: saved.playStoreUrl,
    appIcon: saved.appIcon,
    mockupImage: saved.mockupImage,
    qrCode: saved.qrCode,
    appDescription: saved.appDescription,
    features: saved.features,
    platforms: saved.platforms,
    order: saved.order,
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
    websiteUrl: updated.websiteUrl,
    appStoreUrl: updated.appStoreUrl,
    playStoreUrl: updated.playStoreUrl,
    appIcon: updated.appIcon,
    mockupImage: updated.mockupImage,
    qrCode: updated.qrCode,
    appDescription: updated.appDescription,
    features: updated.features,
    platforms: updated.platforms,
    order: updated.order,
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
    websiteUrl: updated.websiteUrl,
    appStoreUrl: updated.appStoreUrl,
    playStoreUrl: updated.playStoreUrl,
    appIcon: updated.appIcon,
    mockupImage: updated.mockupImage,
    qrCode: updated.qrCode,
    appDescription: updated.appDescription,
    features: updated.features,
    platforms: updated.platforms,
    order: updated.order,
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

// ============== Dashboard Functions ==============

export interface DashboardStats {
  counts: {
    contacts: number;
    faqs: number;
    testimonials: number;
    pages: number;
  };
  recentContacts: ContactSubmission[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    await connectDB();

    const [contactCount, faqCount, testimonialCount, pageCount, recentContacts] = await Promise.all([
      Contact.countDocuments(),
      FAQ.countDocuments(),
      Testimonial.countDocuments({ isActive: true }),
      Page.countDocuments({ isPublished: true }),
      Contact.find().sort({ submittedAt: -1 }).limit(5).lean(),
    ]);

    return {
      counts: {
        contacts: contactCount,
        faqs: faqCount,
        testimonials: testimonialCount,
        pages: pageCount,
      },
      recentContacts: recentContacts.map((contact) => ({
        id: contact._id.toString(),
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
        emailAddress: contact.emailAddress,
        subject: contact.subject,
        message: contact.message,
        isRobot: contact.isRobot,
        submittedAt: contact.submittedAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      counts: { contacts: 0, faqs: 0, testimonials: 0, pages: 0 },
      recentContacts: [],
    };
  }
}
