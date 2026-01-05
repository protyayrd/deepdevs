'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { Toaster, toast } from 'react-hot-toast';
import AdminSidebar, { TabType } from '@/components/AdminSidebar';

// Types
interface FAQ {
  id: string;
  page: string;
  question: string;
  answer: string;
}

interface ContactSubmission {
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

interface Testimonial {
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

interface AppLink {
  id: string;
  appName: string;
  appDisplayName: string;
  appStoreUrl: string;
  playStoreUrl: string;
  appIcon: string;
  appDescription: string;
  isActive: boolean;
}

interface PageContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaDescription?: string;
  isPublished: boolean;
}

interface DashboardStats {
  counts: {
    contacts: number;
    faqs: number;
    testimonials: number;
    pages: number;
  };
  recentContacts: ContactSubmission[];
}

// Homepage Content Types
interface HomepageStats {
  customerCount: string;
  customerCountNumber: number;
  satisfactionRate: number;
}

interface HeroAvatar {
  src: string;
  alt: string;
  order: number;
}

interface FeatureCard {
  title: string;
  description: string;
  image: string;
  order: number;
}

interface AppSliderItem {
  appId: string;
  eyebrow: string;
  title: string;
  description: string;
  accentColor: string;
  phoneImage: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  order: number;
}

interface StoreBadges {
  playStoreBadge: string;
  appStoreBadge: string;
  defaultPlayStoreUrl: string;
  defaultAppStoreUrl: string;
}

interface FeaturedApp {
  id: string;
  title: string;
  description: string;
  link: string;
  iconUrl: string;
  order: number;
}

interface FooterLink {
  label: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterContent {
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  columns: FooterColumn[];
  copyrightText: string;
}

interface HomepageContent {
  stats: HomepageStats;
  heroAvatars: HeroAvatar[];
  featureCards: FeatureCard[];
  appSliderItems: AppSliderItem[];
  storeBadges?: StoreBadges;
  featuredApps?: FeaturedApp[];
  footer?: FooterContent;
  testimonialsConfig?: {
    sectionTitle: string;
    sectionSubtitle: string;
    sectionDescription: string;
  };
}


// Yoler Content Types
interface YolerHero {
  title: string;
  appStoreUrl: string;
  playStoreUrl: string;
  heroImage: string;
  logo: string;
}

interface YolerFeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface YolerBrand {
  id: string;
  name: string;
  logoUrl: string;
  order: number;
}

interface YolerTheoryTestApp {
  title: string;
  description1: string;
  description2: string;
  phoneImage: string;
}

interface YolerFeatureGridItem {
  id: string;
  title: string;
  isList: boolean;
  listItems: string[];
  icon: string;
  backgroundColor: string;
  order: number;
}

interface YolerInfoSection {
  id: string;
  title: string;
  description: string[];
  image: string;
  imagePosition: 'left' | 'right';
}

interface YolerDownloadCta {
  title: string;
  appStoreUrl: string;
  playStoreUrl: string;
}

interface YolerContent {
  hero?: YolerHero;
  featureCards?: YolerFeatureCard[];
  featuredBrands?: YolerBrand[];
  theoryTestApp?: YolerTheoryTestApp;
  featuresGrid?: YolerFeatureGridItem[];
  infoSections?: YolerInfoSection[];
  downloadCta?: YolerDownloadCta;
}

// SeSign Content Types
interface SeSignHero {
  tag: string;
  title: string;
  subtitle: string;
  leftImage: string;
  rightImage: string;
  bottomLeftImage: string;
  bottomRightImage: string;
  happyClientsCount: string;
  happyClientsLabel: string;
}

interface SeSignBrand {
  id: string;
  name: string;
  logoUrl: string;
  order: number;
}

interface SeSignMetricCard {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  order: number;
}

interface SeSignAbout {
  tag: string;
  title: string;
  subtitle: string;
  cards: SeSignMetricCard[];
}

interface SeSignFeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface SeSignFeatures {
  tag: string;
  title: string;
  subtitle: string;
  cards: SeSignFeatureCard[];
}

interface SeSignWorkAnywhere {
  tag: string;
  title: string;
  subtitle: string;
  heroImage: string;
}

interface SeSignTestimonial {
  id: string;
  text: string;
  userName: string;
  userLocation: string;
  userAvatar: string;
  order: number;
}

interface SeSignTestimonialsSection {
  title: string;
  subtitle: string;
  items: SeSignTestimonial[];
}

interface SeSignIntegration {
  id: string;
  name: string;
  icon: string;
  order: number;
}

interface SeSignIntegrationsSection {
  tag: string;
  title: string;
  subtitle: string;
  items: SeSignIntegration[];
}

interface SeSignDownloadCta {
  title: string;
  subtitle: string;
  appStoreUrl: string;
  playStoreUrl: string;
}

interface SeSignContent {
  hero?: SeSignHero;
  featuredBrands?: SeSignBrand[];
  about?: SeSignAbout;
  features?: SeSignFeatures;
  workAnywhere?: SeSignWorkAnywhere;
  testimonials?: SeSignTestimonialsSection;
  integrations?: SeSignIntegrationsSection;
  downloadCta?: SeSignDownloadCta;
}

// Ztax Content Types
interface ZtaxHero {
  title: string;
  subtitle: string;
  appStoreUrl: string;
  playStoreUrl: string;
  heroImage: string;
  logo: string;
}

interface ZtaxStat {
  id: string;
  number: string;
  text: string;
  backgroundColor: string;
  icon: string;
  order: number;
}

interface ZtaxFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface ZtaxPowerfulFeatureStep {
  id: string;
  title: string;
  description: string;
  order: number;
}

interface ZtaxPowerfulFeatures {
  title: string;
  subtitle: string;
  steps: ZtaxPowerfulFeatureStep[];
  phoneImage: string;
}

interface ZtaxTestimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  avatar: string;
  order: number;
}

interface ZtaxPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  order: number;
}

interface ZtaxPricing {
  title: string;
  subtitle: string;
  description: string;
  plans: ZtaxPlan[];
}

interface ZtaxContent {
  hero?: ZtaxHero;
  stats?: ZtaxStat[];
  features?: ZtaxFeature[];
  powerfulFeatures?: ZtaxPowerfulFeatures;
  testimonials?: ZtaxTestimonial[];
  pricing?: ZtaxPricing;
}

// Plantzify Content Types
interface PlantzifyHero {
  welcomeText: string;
  title: string;
  subtitle: string;
  appStoreUrl: string;
  playStoreUrl: string;
  heroImage: string;
  logo: string;
}

interface PlantzifyFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface PlantzifyProblemSolution {
  id: string;
  title: string;
  description: string;
  image: string;
  imagePosition: 'left' | 'right';
}

interface PlantzifyTestimonial {
  text: string;
  name: string;
  avatar: string;
  rating: number;
}

interface PlantzifyGalleryImage {
  id: string;
  imageUrl: string;
  altText: string;
}

interface PlantzifyBlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
}

interface PlantzifyDownloadCta {
  title: string;
  appStoreUrl: string;
  playStoreUrl: string;
  phoneImage: string;
}

interface PlantzifyContent {
  hero?: PlantzifyHero;
  features?: PlantzifyFeature[];
  problemSolution?: PlantzifyProblemSolution[];
  testimonials?: PlantzifyTestimonial[];
  gallery?: PlantzifyGalleryImage[];
  blog?: PlantzifyBlogPost[];
  downloadCta?: PlantzifyDownloadCta;
}

// Deep Study AI Content Types
interface DeepStudyHero {
  title: string;
  subtitle: string;
  appStoreUrl: string;
  playStoreUrl: string;
  heroImage: string;
}

interface DeepStudyStat {
  id: string;
  value: string;
  label: string;
  icon: string;
  order: number;
}

interface DeepStudyFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface DeepStudyProcessStep {
  id: string;
  title: string;
  description: string;
  image: string;
  overlayImage?: string;
  buttonText: string;
  order: number;
}

interface DeepStudyBlogCard {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  order: number;
}

interface DeepStudyContent {
  hero?: DeepStudyHero;
  stats?: DeepStudyStat[];
  featuresHeader?: { title: string; subtitle: string };
  features?: DeepStudyFeature[];
  processHeader?: { title: string; subtitle: string };
  processSteps?: DeepStudyProcessStep[];
  blogHeader?: { title: string };
  blogCards?: DeepStudyBlogCard[];
}

const PAGE_OPTIONS = [
  { value: 'homepage', label: 'Homepage' },
  { value: 'yoler', label: 'Yoler' },
  { value: 'plantzify', label: 'Plantzify' },
  { value: 'sesign', label: 'SeSign' },
  { value: 'deep-study-ai', label: 'Deep Study AI' },
  { value: 'ztax', label: 'Ztax' },
];



export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedPage, setSelectedPage] = useState<string>('homepage');
  const [loading, setLoading] = useState(true);

  // Data states
  const [allFAQs, setAllFAQs] = useState<FAQ[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [appLinks, setAppLinks] = useState<AppLink[]>([]);
  const [pages, setPages] = useState<PageContent[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [homepageContent, setHomepageContent] = useState<HomepageContent | null>(null);
  const [yolerContent, setYolerContent] = useState<YolerContent | null>(null);
  const [seSignContent, setSeSignContent] = useState<SeSignContent | null>(null);
  const [ztaxContent, setZtaxContent] = useState<ZtaxContent | null>(null);
  const [plantzifyContent, setPlantzifyContent] = useState<PlantzifyContent | null>(null);
  const [deepStudyContent, setDeepStudyContent] = useState<DeepStudyContent | null>(null);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQ | Testimonial | AppLink | PageContent | null>(null);

  // FAQ form
  const [faqForm, setFaqForm] = useState({ page: 'homepage', question: '', answer: '' });

  // Testimonial form
  const [testimonialForm, setTestimonialForm] = useState({
    page: 'yoler', customerName: '', location: '', avatar: '', content: '', rating: 5, order: 0
  });

  // App Link form
  const [appLinkForm, setAppLinkForm] = useState({
    appName: '', appDisplayName: '', appStoreUrl: '', playStoreUrl: '', appIcon: '', appDescription: ''
  });

  // Page form
  const [pageForm, setPageForm] = useState({
    slug: '', title: '', content: '', metaDescription: '', isPublished: true
  });

  const faqs = allFAQs.filter(faq => faq.page === selectedPage);
  const filteredTestimonials = testimonials.filter(t => t.page === selectedPage);

  const fetchData = useCallback(async () => {
    try {
      const [faqsRes, contactsRes, testimonialsRes, appLinksRes, pagesRes, statsRes, homepageRes, yolerRes, plantzifyRes, deepStudyRes, sesignRes, ztaxRes] = await Promise.all([
        fetch('/api/faqs'),
        fetch('/api/contacts'),
        fetch('/api/testimonials'),
        fetch('/api/app-links'),
        fetch('/api/pages'),
        fetch('/api/stats'),
        fetch('/api/homepage-content'),
        fetch('/api/yoler-content'),
        fetch('/api/plantzify-content'),
        fetch('/api/deep-study-content'),
        fetch('/api/sesign-content'),
        fetch('/api/ztax-content'),
      ]);

      setAllFAQs(await faqsRes.json());
      setContacts(await contactsRes.json());
      setTestimonials(await testimonialsRes.json());
      setAppLinks(await appLinksRes.json());
      setPages(await pagesRes.json());
      setStats(await statsRes.json());
      setHomepageContent(await homepageRes.json());
      setYolerContent(await yolerRes.json());
      setPlantzifyContent(await plantzifyRes.json());
      setDeepStudyContent(await deepStudyRes.json());
      setSeSignContent(await sesignRes.json());
      setZtaxContent(await ztaxRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }
    fetchData();
  }, [router, fetchData]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    router.push('/admin/login');
  };

  // FAQ handlers
  const handleFAQSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem ? { id: (editingItem as FAQ).id, ...faqForm } : faqForm;
      const res = await fetch('/api/faqs', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) {
        toast.success(editingItem ? 'FAQ updated' : 'FAQ created');
        await fetchData();
        resetForm();
      }
    } catch { toast.error('Failed to save FAQ'); }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      await fetch(`/api/faqs?id=${id}`, { method: 'DELETE' });
      toast.success('FAQ deleted');
      await fetchData();
    } catch { toast.error('Failed to delete'); }
  };

  // Testimonial handlers
  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem ? { id: (editingItem as Testimonial).id, ...testimonialForm, isActive: true } : { ...testimonialForm, isActive: true };
      const res = await fetch('/api/testimonials', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) {
        toast.success(editingItem ? 'Testimonial updated' : 'Testimonial created');
        await fetchData();
        resetForm();
      }
    } catch { toast.error('Failed to save testimonial'); }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      toast.success('Testimonial deleted');
      await fetchData();
    } catch { toast.error('Failed to delete'); }
  };

  // App Link handlers
  const handleAppLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem ? { id: (editingItem as AppLink).id, ...appLinkForm, isActive: true } : { ...appLinkForm, isActive: true };
      const res = await fetch('/api/app-links', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) {
        toast.success(editingItem ? 'App link updated' : 'App link created');
        await fetchData();
        resetForm();
      }
    } catch { toast.error('Failed to save app link'); }
  };

  const handleDeleteAppLink = async (id: string) => {
    if (!confirm('Delete this app link?')) return;
    try {
      await fetch(`/api/app-links?id=${id}`, { method: 'DELETE' });
      toast.success('App link deleted');
      await fetchData();
    } catch { toast.error('Failed to delete'); }
  };

  // Page handlers
  const handlePageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem ? { id: (editingItem as PageContent).id, ...pageForm } : pageForm;
      const res = await fetch('/api/pages', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) {
        toast.success(editingItem ? 'Page updated' : 'Page created');
        await fetchData();
        resetForm();
      }
    } catch { toast.error('Failed to save page'); }
  };

  const handleDeletePage = async (id: string) => {
    if (!confirm('Delete this page?')) return;
    try {
      await fetch(`/api/pages?id=${id}`, { method: 'DELETE' });
      toast.success('Page deleted');
      await fetchData();
    } catch { toast.error('Failed to delete'); }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFaqForm({ page: selectedPage, question: '', answer: '' });
    setTestimonialForm({ page: selectedPage, customerName: '', location: '', avatar: '', content: '', rating: 5, order: 0 });
    setAppLinkForm({ appName: '', appDisplayName: '', appStoreUrl: '', playStoreUrl: '', appIcon: '', appDescription: '' });
    setPageForm({ slug: '', title: '', content: '', metaDescription: '', isPublished: true });
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-600">Loading...</div></div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="text-gray-500 text-sm font-medium">Total Contacts</div>
                <div className="text-3xl font-bold text-indigo-600 mt-2">{stats.counts.contacts}</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="text-gray-500 text-sm font-medium">Total FAQs</div>
                <div className="text-3xl font-bold text-green-600 mt-2">{stats.counts.faqs}</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="text-gray-500 text-sm font-medium">Active Testimonials</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">{stats.counts.testimonials}</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="text-gray-500 text-sm font-medium">Published Pages</div>
                <div className="text-3xl font-bold text-purple-600 mt-2">{stats.counts.pages}</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Contact Submissions</h2>
              <div className="space-y-4">
                {stats.recentContacts.length === 0 ? (
                  <p className="text-gray-500">No recent submissions</p>
                ) : (
                  stats.recentContacts.map(c => (
                    <div key={c.id} className="border-b last:border-0 pb-4 last:pb-0 flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">{c.firstName} {c.lastName}</div>
                        <div className="text-sm text-gray-500">{c.emailAddress}</div>
                        <div className="text-sm text-gray-600 mt-1">{c.subject}</div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(c.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button onClick={() => setActiveTab('contacts')} className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium">View all contacts &rarr;</button>
            </div>
          </div>
        )}

        {/* Homepage Tab */}
        {activeTab === 'homepage' && homepageContent && (
          <div className="space-y-6">
            {/* Stats Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Homepage Stats</h2>
              <p className="text-sm text-gray-500 mb-4">These values animate from 0 on the homepage when users scroll to them.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Count Display</label>
                  <input
                    type="text"
                    value={homepageContent.stats?.customerCount || '64K+'}
                    onChange={(e) => setHomepageContent({
                      ...homepageContent,
                      stats: { ...homepageContent.stats, customerCount: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="64K+"
                  />
                  <p className="text-xs text-gray-400 mt-1">Text shown (e.g., &quot;64K+&quot;)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Animation Target Number</label>
                  <input
                    type="number"
                    value={homepageContent.stats?.customerCountNumber || 64000}
                    onChange={(e) => setHomepageContent({
                      ...homepageContent,
                      stats: { ...homepageContent.stats, customerCountNumber: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="64000"
                  />
                  <p className="text-xs text-gray-400 mt-1">Number to animate to</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Satisfaction Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={homepageContent.stats?.satisfactionRate || 92}
                    onChange={(e) => setHomepageContent({
                      ...homepageContent,
                      stats: { ...homepageContent.stats, satisfactionRate: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="92"
                  />
                  <p className="text-xs text-gray-400 mt-1">Animated percentage</p>
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/homepage-content', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ section: 'stats', stats: homepageContent.stats })
                    });
                    toast.success('Stats updated!');
                  } catch { toast.error('Failed to update stats'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Stats
              </button>
            </div>

            {/* Hero Avatars Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">👥 Hero Section Avatars</h2>
              <p className="text-sm text-gray-500 mb-4">Customer avatars displayed in the satisfaction card.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(homepageContent.heroAvatars || []).map((avatar, index) => (
                  <div key={index} className="border rounded-lg p-3 relative group">
                    <img src={avatar.src} alt={avatar.alt} className="w-16 h-16 rounded-full mx-auto object-cover" />
                    <input
                      type="text"
                      value={avatar.src}
                      onChange={(e) => {
                        const newAvatars = [...(homepageContent.heroAvatars || [])];
                        newAvatars[index] = { ...newAvatars[index], src: e.target.value };
                        setHomepageContent({ ...homepageContent, heroAvatars: newAvatars });
                      }}
                      className="w-full mt-2 px-2 py-1 text-xs border rounded"
                      placeholder="Image URL"
                    />
                    <button
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = async (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append('file', file);
                            const res = await fetch('/api/upload', { method: 'POST', body: formData });
                            const data = await res.json();
                            if (data.url) {
                              const newAvatars = [...(homepageContent.heroAvatars || [])];
                              newAvatars[index] = { ...newAvatars[index], src: data.url };
                              setHomepageContent({ ...homepageContent, heroAvatars: newAvatars });
                              toast.success('Image uploaded!');
                            }
                          }
                        };
                        input.click();
                      }}
                      className="mt-2 w-full text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      Upload New
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/homepage-content', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ section: 'hero_avatars', heroAvatars: homepageContent.heroAvatars })
                    });
                    toast.success('Avatars updated!');
                  } catch { toast.error('Failed to update avatars'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Avatars
              </button>
            </div>

            {/* Feature Cards Section (Why Buy From Us) */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">✨ Why Buy From Us Cards</h2>
              <p className="text-sm text-gray-500 mb-4">Feature cards displayed in the &quot;Why Buy From Us&quot; section. This section is now slidable.</p>
              <div className="space-y-4">
                {(homepageContent.featureCards || []).map((card, index) => (
                  <div key={index} className="border rounded-lg p-4 flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <img src={card.image} alt={card.title} className="w-24 h-24 object-contain rounded" />
                      <button
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = async (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              const formData = new FormData();
                              formData.append('file', file);
                              const res = await fetch('/api/upload', { method: 'POST', body: formData });
                              const data = await res.json();
                              if (data.url) {
                                const newCards = [...(homepageContent.featureCards || [])];
                                newCards[index] = { ...newCards[index], image: data.url };
                                setHomepageContent({ ...homepageContent, featureCards: newCards });
                                toast.success('Image uploaded!');
                              }
                            }
                          };
                          input.click();
                        }}
                        className="mt-2 w-full text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                      >
                        Change Image
                      </button>
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const newCards = [...(homepageContent.featureCards || [])];
                          newCards[index] = { ...newCards[index], title: e.target.value };
                          setHomepageContent({ ...homepageContent, featureCards: newCards });
                        }}
                        className="w-full px-3 py-2 border rounded-lg font-semibold"
                        placeholder="Card Title"
                      />
                      <textarea
                        value={card.description}
                        onChange={(e) => {
                          const newCards = [...(homepageContent.featureCards || [])];
                          newCards[index] = { ...newCards[index], description: e.target.value };
                          setHomepageContent({ ...homepageContent, featureCards: newCards });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        rows={2}
                        placeholder="Card Description"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/homepage-content', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ section: 'feature_cards', featureCards: homepageContent.featureCards })
                    });
                    toast.success('Feature cards updated!');
                  } catch { toast.error('Failed to update feature cards'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Feature Cards
              </button>
            </div>

            {/* App Slider Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📱 App Slider Images</h2>
              <p className="text-sm text-gray-500 mb-4">Phone mockup images for the app download slider at the bottom of the homepage.</p>
              <div className="space-y-4">
                {(homepageContent.appSliderItems || []).map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-shrink-0 text-center">
                        <img src={item.phoneImage} alt={item.eyebrow} className="w-32 h-auto object-contain mx-auto rounded" />
                        <button
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = async (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) {
                                const formData = new FormData();
                                formData.append('file', file);
                                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                const data = await res.json();
                                if (data.url) {
                                  const newItems = [...(homepageContent.appSliderItems || [])];
                                  newItems[index] = { ...newItems[index], phoneImage: data.url };
                                  setHomepageContent({ ...homepageContent, appSliderItems: newItems });
                                  toast.success('Image uploaded!');
                                }
                              }
                            };
                            input.click();
                          }}
                          className="mt-2 text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                        >
                          Change Image
                        </button>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex gap-2 items-center">
                          <span className="text-lg font-bold" style={{ color: item.accentColor }}>{item.eyebrow}</span>
                          <input
                            type="color"
                            value={item.accentColor}
                            onChange={(e) => {
                              const newItems = [...(homepageContent.appSliderItems || [])];
                              newItems[index] = { ...newItems[index], accentColor: e.target.value };
                              setHomepageContent({ ...homepageContent, appSliderItems: newItems });
                            }}
                            className="w-8 h-8 rounded cursor-pointer"
                          />
                        </div>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const newItems = [...(homepageContent.appSliderItems || [])];
                            newItems[index] = { ...newItems[index], title: e.target.value };
                            setHomepageContent({ ...homepageContent, appSliderItems: newItems });
                          }}
                          className="w-full px-3 py-2 border rounded-lg font-medium"
                          placeholder="Slide Title"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) => {
                            const newItems = [...(homepageContent.appSliderItems || [])];
                            newItems[index] = { ...newItems[index], description: e.target.value };
                            setHomepageContent({ ...homepageContent, appSliderItems: newItems });
                          }}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                          rows={2}
                          placeholder="Slide Description"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Play Store URL</label>
                            <input
                              type="url"
                              value={item.playStoreUrl || ''}
                              onChange={(e) => {
                                const newItems = [...(homepageContent.appSliderItems || [])];
                                newItems[index] = { ...newItems[index], playStoreUrl: e.target.value };
                                setHomepageContent({ ...homepageContent, appSliderItems: newItems });
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="https://play.google.com/store/apps/..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">App Store URL</label>
                            <input
                              type="url"
                              value={item.appStoreUrl || ''}
                              onChange={(e) => {
                                const newItems = [...(homepageContent.appSliderItems || [])];
                                newItems[index] = { ...newItems[index], appStoreUrl: e.target.value };
                                setHomepageContent({ ...homepageContent, appSliderItems: newItems });
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="https://apps.apple.com/app/..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/homepage-content', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ section: 'app_slider', appSliderItems: homepageContent.appSliderItems })
                    });
                    toast.success('App slider updated!');
                  } catch { toast.error('Failed to update app slider'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save App Slider
              </button>
            </div>

            {/* Store Badges Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🏪 Store Badge Settings</h2>
              <p className="text-sm text-gray-500 mb-4">Configure store badge images and default URLs (used when app-specific URLs are not set).</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700 flex items-center gap-2">
                    <span>🟢</span> Google Play Store
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Badge Image URL</label>
                    <input
                      type="text"
                      value={homepageContent.storeBadges?.playStoreBadge || '/figma/shared/google-play-badge.png'}
                      onChange={(e) => setHomepageContent({
                        ...homepageContent,
                        storeBadges: {
                          ...homepageContent.storeBadges || {
                            playStoreBadge: '/figma/shared/google-play-badge.png',
                            appStoreBadge: '/figma/shared/appstore-badge.png',
                            defaultPlayStoreUrl: 'https://play.google.com/store/apps',
                            defaultAppStoreUrl: 'https://www.apple.com/app-store/'
                          },
                          playStoreBadge: e.target.value
                        }
                      })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="/figma/shared/google-play-badge.png"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Default Play Store URL</label>
                    <input
                      type="url"
                      value={homepageContent.storeBadges?.defaultPlayStoreUrl || 'https://play.google.com/store/apps'}
                      onChange={(e) => setHomepageContent({
                        ...homepageContent,
                        storeBadges: {
                          ...homepageContent.storeBadges || {
                            playStoreBadge: '/figma/shared/google-play-badge.png',
                            appStoreBadge: '/figma/shared/appstore-badge.png',
                            defaultPlayStoreUrl: 'https://play.google.com/store/apps',
                            defaultAppStoreUrl: 'https://www.apple.com/app-store/'
                          },
                          defaultPlayStoreUrl: e.target.value
                        }
                      })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="https://play.google.com/store/apps"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700 flex items-center gap-2">
                    <span>🍎</span> Apple App Store
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Badge Image URL</label>
                    <input
                      type="text"
                      value={homepageContent.storeBadges?.appStoreBadge || '/figma/shared/appstore-badge.png'}
                      onChange={(e) => setHomepageContent({
                        ...homepageContent,
                        storeBadges: {
                          ...homepageContent.storeBadges || {
                            playStoreBadge: '/figma/shared/google-play-badge.png',
                            appStoreBadge: '/figma/shared/appstore-badge.png',
                            defaultPlayStoreUrl: 'https://play.google.com/store/apps',
                            defaultAppStoreUrl: 'https://www.apple.com/app-store/'
                          },
                          appStoreBadge: e.target.value
                        }
                      })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="/figma/shared/appstore-badge.png"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Default App Store URL</label>
                    <input
                      type="url"
                      value={homepageContent.storeBadges?.defaultAppStoreUrl || 'https://www.apple.com/app-store/'}
                      onChange={(e) => setHomepageContent({
                        ...homepageContent,
                        storeBadges: {
                          ...homepageContent.storeBadges || {
                            playStoreBadge: '/figma/shared/google-play-badge.png',
                            appStoreBadge: '/figma/shared/appstore-badge.png',
                            defaultPlayStoreUrl: 'https://play.google.com/store/apps',
                            defaultAppStoreUrl: 'https://www.apple.com/app-store/'
                          },
                          defaultAppStoreUrl: e.target.value
                        }
                      })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="https://www.apple.com/app-store/"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/homepage-content', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ section: 'store_badges', storeBadges: homepageContent.storeBadges })
                    });
                    toast.success('Store badges updated!');
                  } catch { toast.error('Failed to update store badges'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Store Badges
              </button>
            </div>

            {/* Featured Apps Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">✨ Featured Apps List</h2>
              <p className="text-sm text-gray-500 mb-4">Manage the list of apps featured on the homepage sidebar.</p>

              <div className="space-y-6">
                {homepageContent.featuredApps?.map((app, index) => (
                  <div key={app.id || index} className="p-4 border rounded-lg bg-gray-50 border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-gray-800">App #{index + 1}</h3>
                      <button
                        onClick={() => {
                          const newApps = [...(homepageContent.featuredApps || [])];
                          newApps.splice(index, 1);
                          setHomepageContent({ ...homepageContent, featuredApps: newApps });
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">App Title</label>
                        <input
                          type="text"
                          value={app.title}
                          onChange={(e) => {
                            const newApps = [...(homepageContent.featuredApps || [])];
                            newApps[index] = { ...app, title: e.target.value };
                            setHomepageContent({ ...homepageContent, featuredApps: newApps });
                          }}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Link URL</label>
                        <input
                          type="text"
                          value={app.link}
                          onChange={(e) => {
                            const newApps = [...(homepageContent.featuredApps || [])];
                            newApps[index] = { ...app, link: e.target.value };
                            setHomepageContent({ ...homepageContent, featuredApps: newApps });
                          }}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                        <input
                          type="text"
                          value={app.description}
                          onChange={(e) => {
                            const newApps = [...(homepageContent.featuredApps || [])];
                            newApps[index] = { ...app, description: e.target.value };
                            setHomepageContent({ ...homepageContent, featuredApps: newApps });
                          }}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Icon URL</label>
                        <input
                          type="text"
                          value={app.iconUrl}
                          onChange={(e) => {
                            const newApps = [...(homepageContent.featuredApps || [])];
                            newApps[index] = { ...app, iconUrl: e.target.value };
                            setHomepageContent({ ...homepageContent, featuredApps: newApps });
                          }}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    const newApps = [...(homepageContent.featuredApps || [])];
                    newApps.push({
                      id: Date.now().toString(),
                      title: 'New App',
                      description: 'App description',
                      link: '#',
                      iconUrl: '/figma/app-image-1-7c0480.png',
                      order: newApps.length
                    });
                    setHomepageContent({ ...homepageContent, featuredApps: newApps });
                  }}
                  className="w-full py-2 border-2 border-dashed border-indigo-200 text-indigo-600 rounded-lg hover:border-indigo-400 hover:text-indigo-700 transition-colors"
                >
                  + Add New App
                </button>
              </div>

              <button
                onClick={async () => {
                  try {
                    await fetch('/api/homepage-content', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ section: 'featured_apps', featuredApps: homepageContent.featuredApps })
                    });
                    toast.success('Featured apps updated!');
                  } catch { toast.error('Failed to update featured apps'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Featured Apps
              </button>
            </div>

            {/* Footer Settings Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🦶 Footer Settings</h2>

              {/* Social Links */}
              <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🌐</span> Social Media Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map((platform) => (
                    <div key={platform}>
                      <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">{platform}</label>
                      <input
                        type="url"
                        value={homepageContent.footer?.socialLinks?.[platform as keyof typeof homepageContent.footer.socialLinks] || ''}
                        onChange={(e) => {
                          const newFooter = {
                            ...homepageContent.footer,
                            socialLinks: {
                              ...homepageContent.footer?.socialLinks,
                              [platform]: e.target.value
                            }
                          } as FooterContent;
                          setHomepageContent({ ...homepageContent, footer: newFooter });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder={`https://${platform}.com/...`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Columns */}
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <span>📑</span> Footer Navigation Columns
                </h3>
                {homepageContent.footer?.columns?.map((column, colIndex) => (
                  <div key={colIndex} className="p-4 border rounded-lg bg-gray-50 border-gray-100">
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Column Title</label>
                      <input
                        type="text"
                        value={column.title}
                        onChange={(e) => {
                          const newFooter = { ...homepageContent.footer } as FooterContent;
                          if (newFooter.columns) {
                            newFooter.columns[colIndex].title = e.target.value;
                            setHomepageContent({ ...homepageContent, footer: newFooter });
                          }
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm font-medium"
                      />
                    </div>

                    <div className="space-y-2 pl-4 border-l-2 border-indigo-100">
                      <label className="block text-xs font-medium text-gray-500 mb-2">Links</label>
                      {column.links.map((link, linkIndex) => (
                        <div key={linkIndex} className="grid grid-cols-2 gap-2 mb-2">
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const newFooter = { ...homepageContent.footer } as FooterContent;
                              if (newFooter.columns) {
                                newFooter.columns[colIndex].links[linkIndex].label = e.target.value;
                                setHomepageContent({ ...homepageContent, footer: newFooter });
                              }
                            }}
                            className="w-full px-2 py-1 border rounded text-sm"
                            placeholder="Label"
                          />
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={link.url}
                              onChange={(e) => {
                                const newFooter = { ...homepageContent.footer } as FooterContent;
                                if (newFooter.columns) {
                                  newFooter.columns[colIndex].links[linkIndex].url = e.target.value;
                                  setHomepageContent({ ...homepageContent, footer: newFooter });
                                }
                              }}
                              className="w-full px-2 py-1 border rounded text-sm"
                              placeholder="URL"
                            />
                            <button
                              onClick={() => {
                                const newFooter = { ...homepageContent.footer } as FooterContent;
                                if (newFooter.columns) {
                                  newFooter.columns[colIndex].links.splice(linkIndex, 1);
                                  setHomepageContent({ ...homepageContent, footer: newFooter });
                                }
                              }}
                              className="text-red-500 hover:text-red-700"
                            > ✕ </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newFooter = { ...homepageContent.footer } as FooterContent;
                          if (newFooter.columns) {
                            newFooter.columns[colIndex].links.push({ label: 'New Link', url: '#' });
                            setHomepageContent({ ...homepageContent, footer: newFooter });
                          }
                        }}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium mt-2"
                      >
                        + Add Link
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={async () => {
                  try {
                    await fetch('/api/homepage-content', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ section: 'footer', footer: homepageContent.footer })
                    });
                    toast.success('Footer updated!');
                  } catch { toast.error('Failed to update footer'); }
                }}
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Footer Settings
              </button>
            </div>
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === 'faqs' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Manage FAQs</h2>
                <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg">
                  {PAGE_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
              <button onClick={() => { setShowForm(true); setFaqForm({ ...faqForm, page: selectedPage }); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Add FAQ</button>
            </div>

            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                  <h3 className="text-xl font-bold mb-4">{editingItem ? 'Edit FAQ' : 'Add FAQ'}</h3>
                  <form onSubmit={handleFAQSubmit} className="space-y-4">
                    <select value={faqForm.page} onChange={(e) => setFaqForm({ ...faqForm, page: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                      {PAGE_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                    <input type="text" placeholder="Question" value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
                    <textarea placeholder="Answer" value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} rows={4} className="w-full px-4 py-2 border rounded-lg" required />
                    <div className="flex gap-3">
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">{editingItem ? 'Update' : 'Create'}</button>
                      <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {faqs.length === 0 ? <p className="text-gray-500 text-center py-8">No FAQs yet</p> : faqs.map(faq => (
                <div key={faq.id} className="border rounded-lg p-4 flex justify-between">
                  <div><h3 className="font-semibold">{faq.question}</h3><p className="text-sm text-gray-600">{faq.answer}</p></div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingItem(faq); setFaqForm({ page: faq.page, question: faq.question, answer: faq.answer }); setShowForm(true); }} className="px-3 py-1 text-indigo-600 border border-indigo-300 rounded">Edit</button>
                    <button onClick={() => handleDeleteFAQ(faq.id)} className="px-3 py-1 text-red-600 border border-red-300 rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Submissions ({contacts.length})</h2>
            <div className="space-y-4">
              {contacts.map(c => (
                <div key={c.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="text-sm text-gray-500">Name:</span> {c.firstName} {c.lastName}</div>
                    <div><span className="text-sm text-gray-500">Email:</span> {c.emailAddress}</div>
                    <div><span className="text-sm text-gray-500">Phone:</span> {c.phoneNumber}</div>
                    <div><span className="text-sm text-gray-500">Date:</span> {new Date(c.submittedAt).toLocaleString()}</div>
                    <div className="col-span-2"><span className="text-sm text-gray-500">Subject:</span> {c.subject}</div>
                    {c.message && <div className="col-span-2"><span className="text-sm text-gray-500">Message:</span> {c.message}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
                <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)} className="px-4 py-2 border rounded-lg">
                  {PAGE_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
              <button onClick={() => { setShowForm(true); setTestimonialForm({ ...testimonialForm, page: selectedPage }); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Add Testimonial</button>
            </div>

            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-bold mb-4">{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
                  <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                    <select value={testimonialForm.page} onChange={(e) => setTestimonialForm({ ...testimonialForm, page: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                      {PAGE_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                    <input type="text" placeholder="Customer Name" value={testimonialForm.customerName} onChange={(e) => setTestimonialForm({ ...testimonialForm, customerName: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
                    <input type="text" placeholder="Location" value={testimonialForm.location} onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
                    <input type="text" placeholder="Avatar URL" value={testimonialForm.avatar} onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                    <textarea placeholder="Testimonial Content" value={testimonialForm.content} onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })} rows={4} className="w-full px-4 py-2 border rounded-lg" required />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="number" placeholder="Rating (1-5)" min="1" max="5" value={testimonialForm.rating} onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })} className="px-4 py-2 border rounded-lg" />
                      <input type="number" placeholder="Order" value={testimonialForm.order} onChange={(e) => setTestimonialForm({ ...testimonialForm, order: parseInt(e.target.value) })} className="px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="flex gap-3">
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">{editingItem ? 'Update' : 'Create'}</button>
                      <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {filteredTestimonials.length === 0 ? <p className="text-gray-500 text-center py-8">No testimonials yet</p> : filteredTestimonials.map(t => (
                <div key={t.id} className="border rounded-lg p-4 flex justify-between">
                  <div>
                    <h3 className="font-semibold">{t.customerName} - {t.location}</h3>
                    <p className="text-sm text-gray-600">{t.content}</p>
                    <p className="text-xs text-gray-400">Rating: {t.rating}/5 | Order: {t.order}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingItem(t); setTestimonialForm({ page: t.page, customerName: t.customerName, location: t.location, avatar: t.avatar, content: t.content, rating: t.rating || 5, order: t.order }); setShowForm(true); }} className="px-3 py-1 text-indigo-600 border border-indigo-300 rounded">Edit</button>
                    <button onClick={() => handleDeleteTestimonial(t.id)} className="px-3 py-1 text-red-600 border border-red-300 rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* App Links Tab */}
        {activeTab === 'app-links' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">App Links</h2>
              <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Add App Link</button>
            </div>

            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-bold mb-4">{editingItem ? 'Edit App Link' : 'Add App Link'}</h3>
                  <form onSubmit={handleAppLinkSubmit} className="space-y-4">
                    <input type="text" placeholder="App Name (e.g., yoler)" value={appLinkForm.appName} onChange={(e) => setAppLinkForm({ ...appLinkForm, appName: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
                    <input type="text" placeholder="Display Name" value={appLinkForm.appDisplayName} onChange={(e) => setAppLinkForm({ ...appLinkForm, appDisplayName: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
                    <input type="url" placeholder="App Store URL" value={appLinkForm.appStoreUrl} onChange={(e) => setAppLinkForm({ ...appLinkForm, appStoreUrl: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                    <input type="url" placeholder="Play Store URL" value={appLinkForm.playStoreUrl} onChange={(e) => setAppLinkForm({ ...appLinkForm, playStoreUrl: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                    <input type="text" placeholder="App Icon URL" value={appLinkForm.appIcon} onChange={(e) => setAppLinkForm({ ...appLinkForm, appIcon: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                    <textarea placeholder="Description" value={appLinkForm.appDescription} onChange={(e) => setAppLinkForm({ ...appLinkForm, appDescription: e.target.value })} rows={3} className="w-full px-4 py-2 border rounded-lg" />
                    <div className="flex gap-3">
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">{editingItem ? 'Update' : 'Create'}</button>
                      <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {appLinks.length === 0 ? <p className="text-gray-500 text-center py-8">No app links yet</p> : appLinks.map(a => (
                <div key={a.id} className="border rounded-lg p-4 flex justify-between">
                  <div>
                    <h3 className="font-semibold">{a.appDisplayName} ({a.appName})</h3>
                    <p className="text-sm text-gray-600">{a.appDescription}</p>
                    <p className="text-xs text-blue-500">iOS: {a.appStoreUrl || 'Not set'} | Android: {a.playStoreUrl || 'Not set'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingItem(a); setAppLinkForm({ appName: a.appName, appDisplayName: a.appDisplayName, appStoreUrl: a.appStoreUrl, playStoreUrl: a.playStoreUrl, appIcon: a.appIcon, appDescription: a.appDescription }); setShowForm(true); }} className="px-3 py-1 text-indigo-600 border border-indigo-300 rounded">Edit</button>
                    <button onClick={() => handleDeleteAppLink(a.id)} className="px-3 py-1 text-red-600 border border-red-300 rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pages Tab */}
        {activeTab === 'pages' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Pages</h2>
              <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Add Page</button>
            </div>

            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-bold mb-4">{editingItem ? 'Edit Page' : 'Add Page'}</h3>
                  <form onSubmit={handlePageSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Slug (e.g., about-us)" value={pageForm.slug} onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value })} className="px-4 py-2 border rounded-lg" required />
                      <input type="text" placeholder="Title" value={pageForm.title} onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })} className="px-4 py-2 border rounded-lg" required />
                    </div>
                    <input type="text" placeholder="Meta Description" value={pageForm.metaDescription} onChange={(e) => setPageForm({ ...pageForm, metaDescription: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Content (HTML supported)</label>
                      <textarea value={pageForm.content} onChange={(e) => setPageForm({ ...pageForm, content: e.target.value })} rows={15} className="w-full px-4 py-2 border rounded-lg font-mono text-sm" placeholder="<h1>Page Title</h1><p>Content goes here...</p>" />
                    </div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={pageForm.isPublished} onChange={(e) => setPageForm({ ...pageForm, isPublished: e.target.checked })} className="w-4 h-4" />
                      <span>Published</span>
                    </label>
                    <div className="flex gap-3">
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">{editingItem ? 'Update' : 'Create'}</button>
                      <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {pages.length === 0 ? <p className="text-gray-500 text-center py-8">No pages yet</p> : pages.map(p => (
                <div key={p.id} className="border rounded-lg p-4 flex justify-between">
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-600">/{p.slug}</p>
                    <span className={`text-xs px-2 py-1 rounded ${p.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{p.isPublished ? 'Published' : 'Draft'}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingItem(p); setPageForm({ slug: p.slug, title: p.title, content: p.content, metaDescription: p.metaDescription || '', isPublished: p.isPublished }); setShowForm(true); }} className="px-3 py-1 text-indigo-600 border border-indigo-300 rounded">Edit</button>
                    <button onClick={() => handleDeletePage(p.id)} className="px-3 py-1 text-red-600 border border-red-300 rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Yoler Tab */}
        {activeTab === 'yoler' && yolerContent && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🚗 Yoler Page Content</h2>

            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hero Section</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                  <textarea
                    value={yolerContent.hero?.title || ''}
                    onChange={(e) => setYolerContent({ ...yolerContent, hero: { ...(yolerContent.hero as YolerHero), title: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg whitespace-pre-wrap"
                    rows={2}
                  />
                  <p className="text-xs text-gray-400 mt-1">Use newline for line breaks</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">App Store URL</label>
                    <input
                      type="text"
                      value={yolerContent.hero?.appStoreUrl || ''}
                      onChange={(e) => setYolerContent({ ...yolerContent, hero: { ...(yolerContent.hero as YolerHero), appStoreUrl: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Play Store URL</label>
                    <input
                      type="text"
                      value={yolerContent.hero?.playStoreUrl || ''}
                      onChange={(e) => setYolerContent({ ...yolerContent, hero: { ...(yolerContent.hero as YolerHero), playStoreUrl: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                {/* Images */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Hero Image</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={yolerContent.hero?.heroImage || ''}
                        onChange={(e) => setYolerContent({ ...yolerContent, hero: { ...(yolerContent.hero as YolerHero), heroImage: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Logo URL</label>
                    <input
                      type="text"
                      value={yolerContent.hero?.logo || ''}
                      onChange={(e) => setYolerContent({ ...yolerContent, hero: { ...(yolerContent.hero as YolerHero), logo: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/yoler-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'hero', hero: yolerContent.hero }) });
                    toast.success('Hero updated!');
                  } catch { toast.error('Failed to update hero'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Hero
              </button>
            </div>

            {/* Feature Cards */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Feature Cards (Top)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {yolerContent.featureCards?.map((card, idx) => (
                  <div key={card.id || idx} className="border p-4 rounded-lg bg-gray-50">
                    <h4 className="font-semibold mb-2">{card.title}</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const newCards = [...(yolerContent.featureCards || [])];
                          newCards[idx].title = e.target.value;
                          setYolerContent({ ...yolerContent, featureCards: newCards });
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Title"
                      />
                      <textarea
                        value={card.description}
                        onChange={(e) => {
                          const newCards = [...(yolerContent.featureCards || [])];
                          newCards[idx].description = e.target.value;
                          setYolerContent({ ...yolerContent, featureCards: newCards });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        rows={3}
                        placeholder="Description"
                      />
                      <input
                        type="text"
                        value={card.icon}
                        onChange={(e) => {
                          const newCards = [...(yolerContent.featureCards || [])];
                          newCards[idx].icon = e.target.value;
                          setYolerContent({ ...yolerContent, featureCards: newCards });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="Icon URL"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/yoler-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'feature_cards', featureCards: yolerContent.featureCards }) });
                    toast.success('Feature Cards updated!');
                  } catch { toast.error('Failed to update Feature Cards'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Feature Cards
              </button>
            </div>

            {/* Featured Brands */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Featured Brands (Logos)</h3>
              <div className="space-y-2">
                {yolerContent.featuredBrands?.map((brand, idx) => (
                  <div key={brand.id || idx} className="flex gap-4 items-center">
                    <div className="w-16 h-8 relative bg-gray-100 rounded flex items-center justify-center p-1">
                      <img src={brand.logoUrl} alt={brand.name} className="max-w-full max-h-full object-contain opacity-80" />
                    </div>
                    <input
                      type="text"
                      value={brand.name}
                      onChange={(e) => {
                        const newBrands = [...(yolerContent.featuredBrands || [])];
                        newBrands[idx].name = e.target.value;
                        setYolerContent({ ...yolerContent, featuredBrands: newBrands });
                      }}
                      className="px-3 py-2 border rounded-lg text-sm w-32"
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      value={brand.logoUrl}
                      onChange={(e) => {
                        const newBrands = [...(yolerContent.featuredBrands || [])];
                        newBrands[idx].logoUrl = e.target.value;
                        setYolerContent({ ...yolerContent, featuredBrands: newBrands });
                      }}
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                      placeholder="Logo URL"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/yoler-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'featured_brands', featuredBrands: yolerContent.featuredBrands }) });
                    toast.success('Brands updated!');
                  } catch { toast.error('Failed to update Brands'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Brands
              </button>
            </div>

            {/* Theory Test App Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Theory Test App Section</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={yolerContent.theoryTestApp?.title || ''}
                  onChange={(e) => setYolerContent({ ...yolerContent, theoryTestApp: { ...(yolerContent.theoryTestApp as YolerTheoryTestApp), title: e.target.value } })}
                  className="w-full text-lg font-bold px-3 py-2 border rounded-lg"
                />
                <textarea
                  value={yolerContent.theoryTestApp?.description1 || ''}
                  onChange={(e) => setYolerContent({ ...yolerContent, theoryTestApp: { ...(yolerContent.theoryTestApp as YolerTheoryTestApp), description1: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                  placeholder="Paragraph 1"
                />
                <textarea
                  value={yolerContent.theoryTestApp?.description2 || ''}
                  onChange={(e) => setYolerContent({ ...yolerContent, theoryTestApp: { ...(yolerContent.theoryTestApp as YolerTheoryTestApp), description2: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                  placeholder="Paragraph 2"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone Image URL</label>
                  <input
                    type="text"
                    value={yolerContent.theoryTestApp?.phoneImage || ''}
                    onChange={(e) => setYolerContent({ ...yolerContent, theoryTestApp: { ...(yolerContent.theoryTestApp as YolerTheoryTestApp), phoneImage: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/yoler-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'theory_test_app', theoryTestApp: yolerContent.theoryTestApp }) });
                    toast.success('Updated successfully!');
                  } catch { toast.error('Failed to update'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save
              </button>
            </div>

            {/* Features Grid */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features Grid (6 Items)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {yolerContent.featuresGrid?.map((item, idx) => (
                  <div key={item.id || idx} className="border p-4 rounded-lg bg-gray-50">
                    <div className="flex justify-between mb-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const newGrid = [...(yolerContent.featuresGrid || [])];
                          newGrid[idx].title = e.target.value;
                          setYolerContent({ ...yolerContent, featuresGrid: newGrid });
                        }}
                        className="font-bold px-2 py-1 border rounded w-2/3"
                      />
                      <input
                        type="color"
                        value={item.backgroundColor}
                        onChange={(e) => {
                          const newGrid = [...(yolerContent.featuresGrid || [])];
                          newGrid[idx].backgroundColor = e.target.value;
                          setYolerContent({ ...yolerContent, featuresGrid: newGrid });
                        }}
                        className="w-8 h-8 cursor-pointer"
                      />
                    </div>
                    <input
                      type="text"
                      value={item.icon}
                      onChange={(e) => {
                        const newGrid = [...(yolerContent.featuresGrid || [])];
                        newGrid[idx].icon = e.target.value;
                        setYolerContent({ ...yolerContent, featuresGrid: newGrid });
                      }}
                      className="w-full px-2 py-1 border rounded text-xs mb-2"
                      placeholder="Icon URL"
                    />
                    <label className="flex items-center gap-2 text-sm mb-2">
                      <input
                        type="checkbox"
                        checked={item.isList}
                        onChange={(e) => {
                          const newGrid = [...(yolerContent.featuresGrid || [])];
                          newGrid[idx].isList = e.target.checked;
                          setYolerContent({ ...yolerContent, featuresGrid: newGrid });
                        }}
                      />
                      Is List?
                    </label>
                    {item.isList && (
                      <textarea
                        value={item.listItems?.join('\n')}
                        onChange={(e) => {
                          const newGrid = [...(yolerContent.featuresGrid || [])];
                          newGrid[idx].listItems = e.target.value.split('\n');
                          setYolerContent({ ...yolerContent, featuresGrid: newGrid });
                        }}
                        className="w-full px-2 py-1 border rounded text-sm"
                        rows={3}
                        placeholder="List items (new line separated)"
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/yoler-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'features_grid', featuresGrid: yolerContent.featuresGrid }) });
                    toast.success('Grid updated!');
                  } catch { toast.error('Failed to update grid'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Grid
              </button>
            </div>

            {/* Info Sections */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Info Sections</h3>
              {yolerContent.infoSections?.map((section, idx) => (
                <div key={section.id} className="border-b last:border-0 pb-6 mb-6 last:mb-0 last:pb-0">
                  <h4 className="font-semibold text-gray-700 mb-2 capitalize">{section.id.replace('_', ' ')}</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => {
                        const newInfos = [...(yolerContent.infoSections || [])];
                        newInfos[idx].title = e.target.value;
                        setYolerContent({ ...yolerContent, infoSections: newInfos });
                      }}
                      className="w-full px-3 py-2 border rounded-lg font-bold"
                    />
                    <textarea
                      value={section.description.join('\n\n')}
                      onChange={(e) => {
                        const newInfos = [...(yolerContent.infoSections || [])];
                        newInfos[idx].description = e.target.value.split('\n\n');
                        setYolerContent({ ...yolerContent, infoSections: newInfos });
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                      rows={4}
                      placeholder="Description paragraphs (double new line separated for separate paragraphs)"
                    />
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-xs text-gray-500">Image URL</label>
                        <input
                          type="text"
                          value={section.image}
                          onChange={(e) => {
                            const newInfos = [...(yolerContent.infoSections || [])];
                            newInfos[idx].image = e.target.value;
                            setYolerContent({ ...yolerContent, infoSections: newInfos });
                          }}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Image First?</label>
                        <select
                          value={section.imagePosition}
                          onChange={(e) => {
                            const newInfos = [...(yolerContent.infoSections || [])];
                            newInfos[idx].imagePosition = e.target.value as 'left' | 'right';
                            setYolerContent({ ...yolerContent, infoSections: newInfos });
                          }}
                          className="block px-3 py-2 border rounded-lg text-sm"
                        >
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/yoler-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'info_sections', infoSections: yolerContent.infoSections }) });
                    toast.success('Info sections updated!');
                  } catch { toast.error('Failed to update Info sections'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Info Sections
              </button>
            </div>

            {/* Download CTA */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bottom Download CTA</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={yolerContent.downloadCta?.title || ''}
                  onChange={(e) => setYolerContent({ ...yolerContent, downloadCta: { ...(yolerContent.downloadCta as YolerDownloadCta), title: e.target.value } })}
                  className="w-full font-bold px-3 py-2 border rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="App Store URL"
                    value={yolerContent.downloadCta?.appStoreUrl || ''}
                    onChange={(e) => setYolerContent({ ...yolerContent, downloadCta: { ...(yolerContent.downloadCta as YolerDownloadCta), appStoreUrl: e.target.value } })}
                    className="px-3 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Play Store URL"
                    value={yolerContent.downloadCta?.playStoreUrl || ''}
                    onChange={(e) => setYolerContent({ ...yolerContent, downloadCta: { ...(yolerContent.downloadCta as YolerDownloadCta), playStoreUrl: e.target.value } })}
                    className="px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/yoler-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'download_cta', downloadCta: yolerContent.downloadCta }) });
                    toast.success('CTA updated!');
                  } catch { toast.error('Failed to update CTA'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save CTA
              </button>
            </div>

          </div>
        )}

        {/* Plantzify Tab */}
        {activeTab === 'plantzify' && plantzifyContent && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🌿 Plantzify Page Content</h2>

            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hero Section</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={plantzifyContent.hero?.welcomeText || ''}
                  onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), welcomeText: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Welcome Text"
                />
                <textarea
                  value={plantzifyContent.hero?.title || ''}
                  onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), title: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg whitespace-pre-wrap font-bold text-lg"
                  rows={2}
                  placeholder="Title"
                />
                <textarea
                  value={plantzifyContent.hero?.subtitle || ''}
                  onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), subtitle: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                  placeholder="Subtitle"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={plantzifyContent.hero?.appStoreUrl || ''}
                    onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), appStoreUrl: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="App Store URL"
                  />
                  <input
                    type="text"
                    value={plantzifyContent.hero?.playStoreUrl || ''}
                    onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), playStoreUrl: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Play Store URL"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={plantzifyContent.hero?.heroImage || ''}
                    onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), heroImage: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="Hero Image URL"
                  />
                  <input
                    type="text"
                    value={plantzifyContent.hero?.logo || ''}
                    onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), logo: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="Logo URL"
                  />
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/plantzify-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'hero', hero: plantzifyContent.hero }) });
                    toast.success('Hero updated!');
                  } catch { toast.error('Failed to update hero'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Hero
              </button>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plantzifyContent.features?.map((feature, idx) => (
                  <div key={feature.id || idx} className="border p-4 rounded-lg bg-gray-50">
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => {
                        const newFeatures = [...(plantzifyContent.features || [])];
                        newFeatures[idx].title = e.target.value;
                        setPlantzifyContent({ ...plantzifyContent, features: newFeatures });
                      }}
                      className="w-full px-3 py-2 border rounded-lg font-bold mb-2"
                      placeholder="Title"
                    />
                    <textarea
                      value={feature.description}
                      onChange={(e) => {
                        const newFeatures = [...(plantzifyContent.features || [])];
                        newFeatures[idx].description = e.target.value;
                        setPlantzifyContent({ ...plantzifyContent, features: newFeatures });
                      }}
                      className="w-full px-3 py-2 border rounded-lg text-sm mb-2"
                      rows={3}
                      placeholder="Description"
                    />
                    <input
                      type="text"
                      value={feature.icon}
                      onChange={(e) => {
                        const newFeatures = [...(plantzifyContent.features || [])];
                        newFeatures[idx].icon = e.target.value;
                        setPlantzifyContent({ ...plantzifyContent, features: newFeatures });
                      }}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                      placeholder="Icon URL"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/plantzify-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'features', features: plantzifyContent.features }) });
                    toast.success('Features updated!');
                  } catch { toast.error('Failed to update features'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Features
              </button>
            </div>

            {/* Problem/Solution Info Sections */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Problem & Solution Sections</h3>
              <div className="space-y-6">
                {plantzifyContent.problemSolution?.map((item, idx) => (
                  <div key={item.id} className="border-b last:border-0 pb-6 mb-6 last:mb-0 last:pb-0">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...(plantzifyContent.problemSolution || [])];
                        newItems[idx].title = e.target.value;
                        setPlantzifyContent({ ...plantzifyContent, problemSolution: newItems });
                      }}
                      className="w-full px-3 py-2 border rounded-lg font-bold text-lg mb-2"
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...(plantzifyContent.problemSolution || [])];
                        newItems[idx].description = e.target.value;
                        setPlantzifyContent({ ...plantzifyContent, problemSolution: newItems });
                      }}
                      className="w-full px-3 py-2 border rounded-lg mb-2"
                      rows={4}
                    />
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-xs text-gray-500">Image URL</label>
                        <input
                          type="text"
                          value={item.image}
                          onChange={(e) => {
                            const newItems = [...(plantzifyContent.problemSolution || [])];
                            newItems[idx].image = e.target.value;
                            setPlantzifyContent({ ...plantzifyContent, problemSolution: newItems });
                          }}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Image Position</label>
                        <select
                          value={item.imagePosition}
                          onChange={(e) => {
                            const newItems = [...(plantzifyContent.problemSolution || [])];
                            newItems[idx].imagePosition = e.target.value as 'left' | 'right';
                            setPlantzifyContent({ ...plantzifyContent, problemSolution: newItems });
                          }}
                          className="block px-3 py-2 border rounded-lg text-sm"
                        >
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/plantzify-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'problem_solution', problemSolution: plantzifyContent.problemSolution }) });
                    toast.success('Sections updated!');
                  } catch { toast.error('Failed to update sections'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Sections
              </button>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Plant Gallery (6 Images)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {plantzifyContent.gallery?.map((img, idx) => (
                  <div key={img.id || idx} className="border p-2 rounded-lg">
                    <div className="aspect-[4/3] bg-gray-100 rounded mb-2 overflow-hidden relative">
                      <img src={img.imageUrl} className="w-full h-full object-cover" alt="preview" />
                    </div>
                    <input
                      type="text"
                      value={img.imageUrl}
                      onChange={(e) => {
                        const newGallery = [...(plantzifyContent.gallery || [])];
                        newGallery[idx].imageUrl = e.target.value;
                        setPlantzifyContent({ ...plantzifyContent, gallery: newGallery });
                      }}
                      className="w-full px-2 py-1 border rounded text-xs mb-1"
                      placeholder="Image URL"
                    />
                    <input
                      type="text"
                      value={img.altText}
                      onChange={(e) => {
                        const newGallery = [...(plantzifyContent.gallery || [])];
                        newGallery[idx].altText = e.target.value;
                        setPlantzifyContent({ ...plantzifyContent, gallery: newGallery });
                      }}
                      className="w-full px-2 py-1 border rounded text-xs"
                      placeholder="Alt Text"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/plantzify-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'gallery', gallery: plantzifyContent.gallery }) });
                    toast.success('Gallery updated!');
                  } catch { toast.error('Failed to update gallery'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Gallery
              </button>
            </div>

            {/* Blog Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Blog Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plantzifyContent.blog?.map((post, idx) => (
                  <div key={post.id || idx} className="border p-4 rounded-lg bg-gray-50">
                    <input
                      type="text"
                      value={post.title}
                      onChange={(e) => {
                        const newBlog = [...(plantzifyContent.blog || [])];
                        newBlog[idx].title = e.target.value;
                        setPlantzifyContent({ ...plantzifyContent, blog: newBlog });
                      }}
                      className="w-full px-3 py-2 border rounded-lg font-bold mb-2"
                      placeholder="Title"
                    />
                    <textarea
                      value={post.description}
                      onChange={(e) => {
                        const newBlog = [...(plantzifyContent.blog || [])];
                        newBlog[idx].description = e.target.value;
                        setPlantzifyContent({ ...plantzifyContent, blog: newBlog });
                      }}
                      className="w-full px-3 py-2 border rounded-lg text-sm mb-2"
                      rows={2}
                      placeholder="Description"
                    />
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        value={post.date}
                        onChange={(e) => {
                          const newBlog = [...(plantzifyContent.blog || [])];
                          newBlog[idx].date = e.target.value;
                          setPlantzifyContent({ ...plantzifyContent, blog: newBlog });
                        }}
                        className="w-full px-2 py-1 border rounded text-xs"
                        placeholder="Date"
                      />
                      <input
                        type="text"
                        value={post.readTime}
                        onChange={(e) => {
                          const newBlog = [...(plantzifyContent.blog || [])];
                          newBlog[idx].readTime = e.target.value;
                          setPlantzifyContent({ ...plantzifyContent, blog: newBlog });
                        }}
                        className="w-full px-2 py-1 border rounded text-xs"
                        placeholder="Read Time"
                      />
                    </div>
                    <input
                      type="text"
                      value={post.image}
                      onChange={(e) => {
                        const newBlog = [...(plantzifyContent.blog || [])];
                        newBlog[idx].image = e.target.value;
                        setPlantzifyContent({ ...plantzifyContent, blog: newBlog });
                      }}
                      className="w-full px-2 py-1 border rounded text-xs"
                      placeholder="Image URL"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/plantzify-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'blog', blog: plantzifyContent.blog }) });
                    toast.success('Blog updated!');
                  } catch { toast.error('Failed to update blog'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Blog
              </button>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Testimonials</h3>
              <div className="space-y-4">
                {plantzifyContent.testimonials?.map((t, idx) => (
                  <div key={idx} className="border p-4 rounded-lg bg-gray-50 relative">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) => {
                          const newTestimonials = [...(plantzifyContent.testimonials || [])];
                          newTestimonials[idx].name = e.target.value;
                          setPlantzifyContent({ ...plantzifyContent, testimonials: newTestimonials });
                        }}
                        className="w-full px-3 py-2 border rounded-lg font-bold"
                        placeholder="Name"
                      />
                      <input
                        type="number"
                        step="0.5"
                        value={t.rating}
                        onChange={(e) => {
                          const newTestimonials = [...(plantzifyContent.testimonials || [])];
                          newTestimonials[idx].rating = parseFloat(e.target.value);
                          setPlantzifyContent({ ...plantzifyContent, testimonials: newTestimonials });
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Rating"
                      />
                    </div>
                    <textarea
                      value={t.text}
                      onChange={(e) => {
                        const newTestimonials = [...(plantzifyContent.testimonials || [])];
                        newTestimonials[idx].text = e.target.value;
                        setPlantzifyContent({ ...plantzifyContent, testimonials: newTestimonials });
                      }}
                      className="w-full px-3 py-2 border rounded-lg mb-2"
                      rows={2}
                      placeholder="Review Text"
                    />
                    <input
                      type="text"
                      value={t.avatar}
                      onChange={(e) => {
                        const newTestimonials = [...(plantzifyContent.testimonials || [])];
                        newTestimonials[idx].avatar = e.target.value;
                        setPlantzifyContent({ ...plantzifyContent, testimonials: newTestimonials });
                      }}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                      placeholder="Avatar URL"
                    />
                  </div>
                ))}
                <button onClick={() => {
                  const newTestimonials = [...(plantzifyContent.testimonials || []), { text: 'New Review', name: 'New User', avatar: '', rating: 5 }];
                  setPlantzifyContent({ ...plantzifyContent, testimonials: newTestimonials });
                }} className="text-sm text-indigo-600 hover:text-indigo-800">+ Add Testimonial</button>
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/plantzify-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'testimonials', testimonials: plantzifyContent.testimonials }) });
                    toast.success('Testimonials updated!');
                  } catch { toast.error('Failed to update testimonials'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Testimonials
              </button>
            </div>


            {/* Download CTA */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bottom Download CTA</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={plantzifyContent.downloadCta?.title || ''}
                  onChange={(e) => setPlantzifyContent({ ...plantzifyContent, downloadCta: { ...(plantzifyContent.downloadCta as PlantzifyDownloadCta), title: e.target.value } })}
                  className="w-full font-bold px-3 py-2 border rounded-lg"
                  placeholder="Title"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="App Store URL"
                    value={plantzifyContent.downloadCta?.appStoreUrl || ''}
                    onChange={(e) => setPlantzifyContent({ ...plantzifyContent, downloadCta: { ...(plantzifyContent.downloadCta as PlantzifyDownloadCta), appStoreUrl: e.target.value } })}
                    className="px-3 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Play Store URL"
                    value={plantzifyContent.downloadCta?.playStoreUrl || ''}
                    onChange={(e) => setPlantzifyContent({ ...plantzifyContent, downloadCta: { ...(plantzifyContent.downloadCta as PlantzifyDownloadCta), playStoreUrl: e.target.value } })}
                    className="px-3 py-2 border rounded-lg"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Phone Image URL"
                  value={plantzifyContent.downloadCta?.phoneImage || ''}
                  onChange={(e) => setPlantzifyContent({ ...plantzifyContent, downloadCta: { ...(plantzifyContent.downloadCta as PlantzifyDownloadCta), phoneImage: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/plantzify-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'download_cta', downloadCta: plantzifyContent.downloadCta }) });
                    toast.success('CTA updated!');
                  } catch { toast.error('Failed to update CTA'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save CTA
              </button>
            </div>


          </div>
        )}

        {/* Deep Study AI Tab */}
        {activeTab === 'deep-study-ai' && deepStudyContent && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎓 Deep Study AI Content</h2>

            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hero Section</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                  <input
                    type="text"
                    value={deepStudyContent.hero?.title || ''}
                    onChange={(e) => setDeepStudyContent({ ...deepStudyContent, hero: { ...(deepStudyContent.hero as DeepStudyHero), title: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Subtitle</label>
                  <textarea
                    value={deepStudyContent.hero?.subtitle || ''}
                    onChange={(e) => setDeepStudyContent({ ...deepStudyContent, hero: { ...(deepStudyContent.hero as DeepStudyHero), subtitle: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">App Store URL</label>
                    <input
                      type="text"
                      value={deepStudyContent.hero?.appStoreUrl || ''}
                      onChange={(e) => setDeepStudyContent({ ...deepStudyContent, hero: { ...(deepStudyContent.hero as DeepStudyHero), appStoreUrl: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Play Store URL</label>
                    <input
                      type="text"
                      value={deepStudyContent.hero?.playStoreUrl || ''}
                      onChange={(e) => setDeepStudyContent({ ...deepStudyContent, hero: { ...(deepStudyContent.hero as DeepStudyHero), playStoreUrl: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Hero Image URL</label>
                  <input
                    type="text"
                    value={deepStudyContent.hero?.heroImage || ''}
                    onChange={(e) => setDeepStudyContent({ ...deepStudyContent, hero: { ...(deepStudyContent.hero as DeepStudyHero), heroImage: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/deep-study-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'hero', hero: deepStudyContent.hero }) });
                    toast.success('Hero updated!');
                  } catch { toast.error('Failed to update hero'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Hero
              </button>
            </div>

            {/* Stats Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Stats Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deepStudyContent.stats?.map((stat, idx) => (
                  <div key={stat.id || idx} className="border p-4 rounded-lg bg-gray-50">
                    <div className="mb-2">
                      <label className="text-xs text-gray-500">Value</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...(deepStudyContent.stats || [])];
                          newStats[idx].value = e.target.value;
                          setDeepStudyContent({ ...deepStudyContent, stats: newStats });
                        }}
                        className="w-full px-2 py-1 border rounded font-bold"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="text-xs text-gray-500">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...(deepStudyContent.stats || [])];
                          newStats[idx].label = e.target.value;
                          setDeepStudyContent({ ...deepStudyContent, stats: newStats });
                        }}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Icon (SVG or URL)</label>
                      <textarea
                        value={stat.icon}
                        onChange={(e) => {
                          const newStats = [...(deepStudyContent.stats || [])];
                          newStats[idx].icon = e.target.value;
                          setDeepStudyContent({ ...deepStudyContent, stats: newStats });
                        }}
                        className="w-full px-2 py-1 border rounded text-xs"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/deep-study-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'stats', stats: deepStudyContent.stats }) });
                    toast.success('Stats updated!');
                  } catch { toast.error('Failed to update stats'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Stats
              </button>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features Section</h3>
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-semibold mb-2">Features Header</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={deepStudyContent.featuresHeader?.title || ''}
                    onChange={(e) => setDeepStudyContent({ ...deepStudyContent, featuresHeader: { ...deepStudyContent.featuresHeader!, title: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg font-bold"
                    placeholder="Section Title"
                  />
                  <input
                    type="text"
                    value={deepStudyContent.featuresHeader?.subtitle || ''}
                    onChange={(e) => setDeepStudyContent({ ...deepStudyContent, featuresHeader: { ...deepStudyContent.featuresHeader!, subtitle: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="Section Subtitle"
                  />
                </div>
              </div>

              <h4 className="font-semibold mb-2">Feature Cards</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {deepStudyContent.features?.map((feature, idx) => (
                  <div key={feature.id || idx} className="border p-4 rounded-lg bg-gray-50">
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => {
                        const newFeatures = [...(deepStudyContent.features || [])];
                        newFeatures[idx].title = e.target.value;
                        setDeepStudyContent({ ...deepStudyContent, features: newFeatures });
                      }}
                      className="w-full px-2 py-1 border rounded font-semibold mb-2"
                      placeholder="Title"
                    />
                    <textarea
                      value={feature.description}
                      onChange={(e) => {
                        const newFeatures = [...(deepStudyContent.features || [])];
                        newFeatures[idx].description = e.target.value;
                        setDeepStudyContent({ ...deepStudyContent, features: newFeatures });
                      }}
                      className="w-full px-2 py-1 border rounded text-xs mb-2"
                      rows={3}
                      placeholder="Description"
                    />
                    <input
                      type="text"
                      value={feature.icon}
                      onChange={(e) => {
                        const newFeatures = [...(deepStudyContent.features || [])];
                        newFeatures[idx].icon = e.target.value;
                        setDeepStudyContent({ ...deepStudyContent, features: newFeatures });
                      }}
                      className="w-full px-2 py-1 border rounded text-xs"
                      placeholder="Icon URL"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/deep-study-content', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        section: 'features',
                        features: deepStudyContent.features,
                        featuresHeader: deepStudyContent.featuresHeader
                      })
                    });
                    toast.success('Features updated!');
                  } catch { toast.error('Failed to update features'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Features
              </button>
            </div>

            {/* Process Steps (All-In-One) */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">All-In-One Process Steps</h3>
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-semibold mb-2">Section Header</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={deepStudyContent.processHeader?.title || ''}
                    onChange={(e) => setDeepStudyContent({ ...deepStudyContent, processHeader: { ...deepStudyContent.processHeader!, title: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg font-bold"
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={deepStudyContent.processHeader?.subtitle || ''}
                    onChange={(e) => setDeepStudyContent({ ...deepStudyContent, processHeader: { ...deepStudyContent.processHeader!, subtitle: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="Subtitle"
                  />
                </div>
              </div>
              <div className="space-y-6">
                {deepStudyContent.processSteps?.map((step, idx) => (
                  <div key={step.id || idx} className="border p-4 rounded-lg bg-gray-50">
                    <h5 className="font-bold text-gray-600 mb-2">Step {idx + 1}</h5>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const newSteps = [...(deepStudyContent.processSteps || [])];
                          newSteps[idx].title = e.target.value;
                          setDeepStudyContent({ ...deepStudyContent, processSteps: newSteps });
                        }}
                        className="w-full px-3 py-2 border rounded-lg font-semibold"
                        placeholder="Title"
                      />
                      <textarea
                        value={step.description}
                        onChange={(e) => {
                          const newSteps = [...(deepStudyContent.processSteps || [])];
                          newSteps[idx].description = e.target.value;
                          setDeepStudyContent({ ...deepStudyContent, processSteps: newSteps });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        rows={3}
                        placeholder="Description"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={step.image}
                          onChange={(e) => {
                            const newSteps = [...(deepStudyContent.processSteps || [])];
                            newSteps[idx].image = e.target.value;
                            setDeepStudyContent({ ...deepStudyContent, processSteps: newSteps });
                          }}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                          placeholder="Image URL"
                        />
                        {idx === 2 && (
                          <input
                            type="text"
                            value={step.overlayImage || ''}
                            onChange={(e) => {
                              const newSteps = [...(deepStudyContent.processSteps || [])];
                              newSteps[idx].overlayImage = e.target.value;
                              setDeepStudyContent({ ...deepStudyContent, processSteps: newSteps });
                            }}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            placeholder="Overlay Image URL (Optional)"
                          />
                        )}
                      </div>
                      <input
                        type="text"
                        value={step.buttonText}
                        onChange={(e) => {
                          const newSteps = [...(deepStudyContent.processSteps || [])];
                          newSteps[idx].buttonText = e.target.value;
                          setDeepStudyContent({ ...deepStudyContent, processSteps: newSteps });
                        }}
                        className="w-1/3 px-3 py-2 border rounded-lg text-sm"
                        placeholder="Button Text"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/deep-study-content', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        section: 'process_steps',
                        processSteps: deepStudyContent.processSteps,
                        processHeader: deepStudyContent.processHeader
                      })
                    });
                    toast.success('Process steps updated!');
                  } catch { toast.error('Failed to update process steps'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Process Steps
              </button>
            </div>

            {/* Blog Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Blog Section</h3>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600">Section Title</label>
                <input
                  type="text"
                  value={deepStudyContent.blogHeader?.title || ''}
                  onChange={(e) => setDeepStudyContent({ ...deepStudyContent, blogHeader: { ...deepStudyContent.blogHeader!, title: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg font-bold"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deepStudyContent.blogCards?.map((card, idx) => (
                  <div key={card.id || idx} className="border p-4 rounded-lg bg-gray-50">
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const newBlogs = [...(deepStudyContent.blogCards || [])];
                          newBlogs[idx].title = e.target.value;
                          setDeepStudyContent({ ...deepStudyContent, blogCards: newBlogs });
                        }}
                        className="w-full px-3 py-2 border rounded-lg font-semibold"
                        placeholder="Blog Title"
                      />
                      <textarea
                        value={card.description}
                        onChange={(e) => {
                          const newBlogs = [...(deepStudyContent.blogCards || [])];
                          newBlogs[idx].description = e.target.value;
                          setDeepStudyContent({ ...deepStudyContent, blogCards: newBlogs });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        rows={3}
                        placeholder="Snippet"
                      />
                      <input
                        type="text"
                        value={card.image}
                        onChange={(e) => {
                          const newBlogs = [...(deepStudyContent.blogCards || [])];
                          newBlogs[idx].image = e.target.value;
                          setDeepStudyContent({ ...deepStudyContent, blogCards: newBlogs });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="Image URL (Optional)"
                      />
                      <input
                        type="text"
                        value={card.link}
                        onChange={(e) => {
                          const newBlogs = [...(deepStudyContent.blogCards || [])];
                          newBlogs[idx].link = e.target.value;
                          setDeepStudyContent({ ...deepStudyContent, blogCards: newBlogs });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="Link URL"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/deep-study-content', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        section: 'blog_cards',
                        blogCards: deepStudyContent.blogCards,
                        blogHeader: deepStudyContent.blogHeader
                      })
                    });
                    toast.success('Blog section updated!');
                  } catch { toast.error('Failed to update blog section'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Blog Section
              </button>
            </div>

          </div>
        )}

        {/* Ztax Tab */}
        {activeTab === 'ztax' && ztaxContent && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Ztax Page Content</h2>

            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hero Section</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                  <input
                    type="text"
                    value={ztaxContent.hero?.title || ''}
                    onChange={(e) => setZtaxContent({ ...ztaxContent, hero: { ...(ztaxContent.hero as ZtaxHero), title: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={ztaxContent.hero?.subtitle || ''}
                    onChange={(e) => setZtaxContent({ ...ztaxContent, hero: { ...(ztaxContent.hero as ZtaxHero), subtitle: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">App Store URL</label>
                    <input
                      type="text"
                      value={ztaxContent.hero?.appStoreUrl || ''}
                      onChange={(e) => setZtaxContent({ ...ztaxContent, hero: { ...(ztaxContent.hero as ZtaxHero), appStoreUrl: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Play Store URL</label>
                    <input
                      type="text"
                      value={ztaxContent.hero?.playStoreUrl || ''}
                      onChange={(e) => setZtaxContent({ ...ztaxContent, hero: { ...(ztaxContent.hero as ZtaxHero), playStoreUrl: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Hero Image</label>
                    <input
                      type="text"
                      value={ztaxContent.hero?.heroImage || ''}
                      onChange={(e) => setZtaxContent({ ...ztaxContent, hero: { ...(ztaxContent.hero as ZtaxHero), heroImage: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Logo URL</label>
                    <input
                      type="text"
                      value={ztaxContent.hero?.logo || ''}
                      onChange={(e) => setZtaxContent({ ...ztaxContent, hero: { ...(ztaxContent.hero as ZtaxHero), logo: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/ztax-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'hero', hero: ztaxContent.hero }) });
                    toast.success('Hero updated!');
                  } catch { toast.error('Failed to update hero'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Hero
              </button>
            </div>

            {/* Stats Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Stats Section</h3>
              <div className="space-y-4">
                {ztaxContent.stats?.map((stat, idx) => (
                  <div key={stat.id || idx} className="border p-4 rounded-lg bg-gray-50 flex gap-4">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={stat.number}
                        onChange={(e) => {
                          const newStats = [...(ztaxContent.stats || [])];
                          newStats[idx].number = e.target.value;
                          setZtaxContent({ ...ztaxContent, stats: newStats });
                        }}
                        className="w-full px-3 py-2 border rounded-lg font-bold"
                        placeholder="Number"
                      />
                      <input
                        type="text"
                        value={stat.text}
                        onChange={(e) => {
                          const newStats = [...(ztaxContent.stats || [])];
                          newStats[idx].text = e.target.value;
                          setZtaxContent({ ...ztaxContent, stats: newStats });
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Text"
                      />
                      <input
                        type="text"
                        value={stat.backgroundColor}
                        onChange={(e) => {
                          const newStats = [...(ztaxContent.stats || [])];
                          newStats[idx].backgroundColor = e.target.value;
                          setZtaxContent({ ...ztaxContent, stats: newStats });
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Bg Color (e.g. #92C9E6)"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/ztax-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'stats', stats: ztaxContent.stats }) });
                    toast.success('Stats updated!');
                  } catch { toast.error('Failed to update stats'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Stats
              </button>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features Grid</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ztaxContent.features?.map((feature, idx) => (
                  <div key={feature.id || idx} className="border p-4 rounded-lg bg-gray-50">
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => {
                          const newFeatures = [...(ztaxContent.features || [])];
                          newFeatures[idx].title = e.target.value;
                          setZtaxContent({ ...ztaxContent, features: newFeatures });
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                      <textarea
                        value={feature.description}
                        onChange={(e) => {
                          const newFeatures = [...(ztaxContent.features || [])];
                          newFeatures[idx].description = e.target.value;
                          setZtaxContent({ ...ztaxContent, features: newFeatures });
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                        rows={2}
                      />
                      <input
                        type="text"
                        value={feature.icon}
                        onChange={(e) => {
                          const newFeatures = [...(ztaxContent.features || [])];
                          newFeatures[idx].icon = e.target.value;
                          setZtaxContent({ ...ztaxContent, features: newFeatures });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="Icon URL"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/ztax-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'features', features: ztaxContent.features }) });
                    toast.success('Features updated!');
                  } catch { toast.error('Failed to update features'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Features
              </button>
            </div>

            {/* Powerful Features Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Powerful Features Timeline</h3>
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  value={ztaxContent.powerfulFeatures?.title || ''}
                  onChange={(e) => setZtaxContent({ ...ztaxContent, powerfulFeatures: { ...(ztaxContent.powerfulFeatures as ZtaxPowerfulFeatures), title: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Section Title"
                />
                <textarea
                  value={ztaxContent.powerfulFeatures?.subtitle || ''}
                  onChange={(e) => setZtaxContent({ ...ztaxContent, powerfulFeatures: { ...(ztaxContent.powerfulFeatures as ZtaxPowerfulFeatures), subtitle: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Section Subtitle"
                />
                <input
                  type="text"
                  value={ztaxContent.powerfulFeatures?.phoneImage || ''}
                  onChange={(e) => setZtaxContent({ ...ztaxContent, powerfulFeatures: { ...(ztaxContent.powerfulFeatures as ZtaxPowerfulFeatures), phoneImage: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Phone Image URL"
                />
              </div>
              <div className="space-y-4">
                {ztaxContent.powerfulFeatures?.steps?.map((step, idx) => (
                  <div key={step.id || idx} className="border p-4 rounded-lg bg-gray-50">
                    <h4 className="font-semibold mb-2">Step {idx + 1}</h4>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const newSteps = [...(ztaxContent.powerfulFeatures?.steps || [])];
                          newSteps[idx].title = e.target.value;
                          setZtaxContent({ ...ztaxContent, powerfulFeatures: { ...(ztaxContent.powerfulFeatures as ZtaxPowerfulFeatures), steps: newSteps } });
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                      <textarea
                        value={step.description}
                        onChange={(e) => {
                          const newSteps = [...(ztaxContent.powerfulFeatures?.steps || [])];
                          newSteps[idx].description = e.target.value;
                          setZtaxContent({ ...ztaxContent, powerfulFeatures: { ...(ztaxContent.powerfulFeatures as ZtaxPowerfulFeatures), steps: newSteps } });
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/ztax-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'powerful_features', powerfulFeatures: ztaxContent.powerfulFeatures }) });
                    toast.success('Powerful Features updated!');
                  } catch { toast.error('Failed to update Powerful Features'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Powerful Features
              </button>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Testimonials</h3>
              <div className="space-y-4">
                {ztaxContent.testimonials?.map((t, idx) => (
                  <div key={t.id || idx} className="border p-4 rounded-lg bg-gray-50 space-y-3">
                    <input
                      type="text"
                      value={t.authorName}
                      onChange={(e) => {
                        const newTestimonials = [...(ztaxContent.testimonials || [])];
                        newTestimonials[idx].authorName = e.target.value;
                        setZtaxContent({ ...ztaxContent, testimonials: newTestimonials });
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Author Name"
                    />
                    <textarea
                      value={t.quote}
                      onChange={(e) => {
                        const newTestimonials = [...(ztaxContent.testimonials || [])];
                        newTestimonials[idx].quote = e.target.value;
                        setZtaxContent({ ...ztaxContent, testimonials: newTestimonials });
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Quote"
                    />
                    <input
                      type="text"
                      value={t.authorRole}
                      onChange={(e) => {
                        const newTestimonials = [...(ztaxContent.testimonials || [])];
                        newTestimonials[idx].authorRole = e.target.value;
                        setZtaxContent({ ...ztaxContent, testimonials: newTestimonials });
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Role"
                    />
                    <input
                      type="text"
                      value={t.avatar}
                      onChange={(e) => {
                        const newTestimonials = [...(ztaxContent.testimonials || [])];
                        newTestimonials[idx].avatar = e.target.value;
                        setZtaxContent({ ...ztaxContent, testimonials: newTestimonials });
                      }}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="Avatar URL"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/ztax-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'testimonials', testimonials: ztaxContent.testimonials }) });
                    toast.success('Testimonials updated!');
                  } catch { toast.error('Failed to update testimonials'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Testimonials
              </button>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing</h3>
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  value={ztaxContent.pricing?.title || ''}
                  onChange={(e) => setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), title: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Pricing Title"
                />
                <input
                  type="text"
                  value={ztaxContent.pricing?.subtitle || ''}
                  onChange={(e) => setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), subtitle: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Pricing Subtitle"
                />
                <textarea
                  value={ztaxContent.pricing?.description || ''}
                  onChange={(e) => setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), description: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Pricing Description"
                />
              </div>
              <div className="space-y-6">
                {ztaxContent.pricing?.plans?.map((plan, idx) => (
                  <div key={plan.id || idx} className="border p-4 rounded-lg bg-gray-50">
                    <h4 className="font-semibold mb-3">Plan: {plan.name}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => {
                          const newPlans = [...(ztaxContent.pricing?.plans || [])];
                          newPlans[idx].name = e.target.value;
                          setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), plans: newPlans } });
                        }}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Plan Name"
                      />
                      <input
                        type="text"
                        value={plan.price}
                        onChange={(e) => {
                          const newPlans = [...(ztaxContent.pricing?.plans || [])];
                          newPlans[idx].price = e.target.value;
                          setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), plans: newPlans } });
                        }}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Price"
                      />
                      <input
                        type="text"
                        value={plan.period}
                        onChange={(e) => {
                          const newPlans = [...(ztaxContent.pricing?.plans || [])];
                          newPlans[idx].period = e.target.value;
                          setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), plans: newPlans } });
                        }}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Period (e.g. / month)"
                      />
                      <input
                        type="text"
                        value={plan.description}
                        onChange={(e) => {
                          const newPlans = [...(ztaxContent.pricing?.plans || [])];
                          newPlans[idx].description = e.target.value;
                          setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), plans: newPlans } });
                        }}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Short description"
                      />
                    </div>
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Features (comma separated)</label>
                      <textarea
                        value={plan.features?.join(', ') || ''}
                        onChange={(e) => {
                          const newPlans = [...(ztaxContent.pricing?.plans || [])];
                          newPlans[idx].features = e.target.value.split(',').map(s => s.trim());
                          setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), plans: newPlans } });
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/ztax-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'pricing', pricing: ztaxContent.pricing }) });
                    toast.success('Pricing updated!');
                  } catch { toast.error('Failed to update pricing'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Pricing
              </button>
            </div>
          </div>
        )}


        {/* SeSign Tab */}
        {activeTab === 'sesign' && seSignContent && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">✍️ SeSign Page Content</h2>

            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hero Section</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Tag</label>
                  <input
                    type="text"
                    value={seSignContent.hero?.tag || ''}
                    onChange={(e) => setSeSignContent({ ...seSignContent, hero: { ...(seSignContent.hero as SeSignHero), tag: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                  <input
                    type="text"
                    value={seSignContent.hero?.title || ''}
                    onChange={(e) => setSeSignContent({ ...seSignContent, hero: { ...(seSignContent.hero as SeSignHero), title: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Subtitle</label>
                  <textarea
                    value={seSignContent.hero?.subtitle || ''}
                    onChange={(e) => setSeSignContent({ ...seSignContent, hero: { ...(seSignContent.hero as SeSignHero), subtitle: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={2}
                  />
                </div>

                <h4 className="font-semibold text-gray-700 mt-4">Images</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['leftImage', 'rightImage', 'bottomLeftImage', 'bottomRightImage'].map((key) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                      <input
                        type="text"
                        // @ts-ignore
                        value={seSignContent.hero?.[key] || ''}
                        // @ts-ignore
                        onChange={(e) => setSeSignContent({ ...seSignContent, hero: { ...(seSignContent.hero as SeSignHero), [key]: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  ))}
                </div>

                <h4 className="font-semibold text-gray-700 mt-4">Happy Clients Floating Card</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Count Label</label>
                    <input
                      type="text"
                      value={seSignContent.hero?.happyClientsCount || ''}
                      onChange={(e) => setSeSignContent({ ...seSignContent, hero: { ...(seSignContent.hero as SeSignHero), happyClientsCount: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Text Label</label>
                    <input
                      type="text"
                      value={seSignContent.hero?.happyClientsLabel || ''}
                      onChange={(e) => setSeSignContent({ ...seSignContent, hero: { ...(seSignContent.hero as SeSignHero), happyClientsLabel: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/sesign-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'hero', hero: seSignContent.hero }) });
                    toast.success('Hero updated!');
                  } catch { toast.error('Failed to update hero'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Hero
              </button>
            </div>

            {/* Featured Brands */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Featured Brands</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {seSignContent.featuredBrands?.map((brand, idx) => (
                  <div key={idx} className="border p-3 rounded-lg bg-gray-50">
                    <div className="mb-2">
                      <label className="block text-xs text-gray-500">Logo URL</label>
                      <input
                        type="text"
                        value={brand.logoUrl}
                        onChange={(e) => {
                          const newBrands = [...(seSignContent.featuredBrands || [])];
                          newBrands[idx].logoUrl = e.target.value;
                          setSeSignContent({ ...seSignContent, featuredBrands: newBrands });
                        }}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-xs text-gray-500">Name</label>
                      <input
                        type="text"
                        value={brand.name}
                        onChange={(e) => {
                          const newBrands = [...(seSignContent.featuredBrands || [])];
                          newBrands[idx].name = e.target.value;
                          setSeSignContent({ ...seSignContent, featuredBrands: newBrands });
                        }}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/sesign-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'featured_brands', featuredBrands: seSignContent.featuredBrands }) });
                    toast.success('Brands updated!');
                  } catch { toast.error('Failed to update brands'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Brands
              </button>
            </div>

            {/* About / Metrics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About Us / Metrics</h3>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="text" value={seSignContent.about?.tag || ''} onChange={(e) => setSeSignContent({ ...seSignContent, about: { ...seSignContent.about!, tag: e.target.value } })} className="border rounded px-3 py-2" placeholder="Tag" />
                  <input type="text" value={seSignContent.about?.title || ''} onChange={(e) => setSeSignContent({ ...seSignContent, about: { ...seSignContent.about!, title: e.target.value } })} className="border rounded px-3 py-2 md:col-span-2" placeholder="Title" />
                  <textarea value={seSignContent.about?.subtitle || ''} onChange={(e) => setSeSignContent({ ...seSignContent, about: { ...seSignContent.about!, subtitle: e.target.value } })} className="border rounded px-3 py-2 md:col-span-3" rows={2} placeholder="Subtitle" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {seSignContent.about?.cards.map((card, idx) => (
                  <div key={idx} className="border p-3 rounded-lg bg-gray-50">
                    <input type="text" value={card.value} onChange={(e) => { const newCards = [...seSignContent.about!.cards]; newCards[idx].value = e.target.value; setSeSignContent({ ...seSignContent, about: { ...seSignContent.about!, cards: newCards } }) }} className="w-full mb-2 px-2 py-1 border rounded" placeholder="Value (e.g. 15)" />
                    <input type="text" value={card.suffix || ''} onChange={(e) => { const newCards = [...seSignContent.about!.cards]; newCards[idx].suffix = e.target.value; setSeSignContent({ ...seSignContent, about: { ...seSignContent.about!, cards: newCards } }) }} className="w-full mb-2 px-2 py-1 border rounded" placeholder="Suffix (e.g. +)" />
                    <input type="text" value={card.label} onChange={(e) => { const newCards = [...seSignContent.about!.cards]; newCards[idx].label = e.target.value; setSeSignContent({ ...seSignContent, about: { ...seSignContent.about!, cards: newCards } }) }} className="w-full px-2 py-1 border rounded" placeholder="Label" />
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/sesign-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'about', about: seSignContent.about }) });
                    toast.success('About section updated!');
                  } catch { toast.error('Failed to update about'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save About Section
              </button>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features</h3>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="text" value={seSignContent.features?.tag || ''} onChange={(e) => setSeSignContent({ ...seSignContent, features: { ...seSignContent.features!, tag: e.target.value } })} className="border rounded px-3 py-2" placeholder="Tag" />
                  <input type="text" value={seSignContent.features?.title || ''} onChange={(e) => setSeSignContent({ ...seSignContent, features: { ...seSignContent.features!, title: e.target.value } })} className="border rounded px-3 py-2 md:col-span-2" placeholder="Title" />
                  <textarea value={seSignContent.features?.subtitle || ''} onChange={(e) => setSeSignContent({ ...seSignContent, features: { ...seSignContent.features!, subtitle: e.target.value } })} className="border rounded px-3 py-2 md:col-span-3" rows={2} placeholder="Subtitle" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {seSignContent.features?.cards.map((card, idx) => (
                  <div key={idx} className="border p-4 rounded-lg bg-gray-50 flex gap-4">
                    <div className="flex-1 space-y-3">
                      <input type="text" value={card.title} onChange={(e) => { const newCards = [...seSignContent.features!.cards]; newCards[idx].title = e.target.value; setSeSignContent({ ...seSignContent, features: { ...seSignContent.features!, cards: newCards } }) }} className="w-full px-3 py-2 border rounded font-semibold" placeholder="Title" />
                      <textarea value={card.description} onChange={(e) => { const newCards = [...seSignContent.features!.cards]; newCards[idx].description = e.target.value; setSeSignContent({ ...seSignContent, features: { ...seSignContent.features!, cards: newCards } }) }} className="w-full px-3 py-2 border rounded text-sm" rows={2} placeholder="Description" />
                      <input type="text" value={card.icon} onChange={(e) => { const newCards = [...seSignContent.features!.cards]; newCards[idx].icon = e.target.value; setSeSignContent({ ...seSignContent, features: { ...seSignContent.features!, cards: newCards } }) }} className="w-full px-3 py-2 border rounded text-xs" placeholder="Icon URL / Path" />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/sesign-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'features', features: seSignContent.features }) });
                    toast.success('Features updated!');
                  } catch { toast.error('Failed to update features'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Features
              </button>
            </div>

            {/* Work Anywhere */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Work Anywhere</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Tag</label>
                  <input type="text" value={seSignContent.workAnywhere?.tag || ''} onChange={(e) => setSeSignContent({ ...seSignContent, workAnywhere: { ...seSignContent.workAnywhere!, tag: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                  <textarea value={seSignContent.workAnywhere?.title || ''} onChange={(e) => setSeSignContent({ ...seSignContent, workAnywhere: { ...seSignContent.workAnywhere!, title: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Subtitle</label>
                  <textarea value={seSignContent.workAnywhere?.subtitle || ''} onChange={(e) => setSeSignContent({ ...seSignContent, workAnywhere: { ...seSignContent.workAnywhere!, subtitle: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" rows={2} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Hero Image</label>
                  <input type="text" value={seSignContent.workAnywhere?.heroImage || ''} onChange={(e) => setSeSignContent({ ...seSignContent, workAnywhere: { ...seSignContent.workAnywhere!, heroImage: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/sesign-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'work_anywhere', workAnywhere: seSignContent.workAnywhere }) });
                    toast.success('Work Anywhere updated!');
                  } catch { toast.error('Failed to update section'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Work Anywhere
              </button>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Testimonials</h3>
              <div className="space-y-2 mb-4">
                <input type="text" value={seSignContent.testimonials?.title || ''} onChange={(e) => setSeSignContent({ ...seSignContent, testimonials: { ...seSignContent.testimonials!, title: e.target.value } })} className="w-full px-3 py-2 border rounded" placeholder="Section Title" />
                <textarea value={seSignContent.testimonials?.subtitle || ''} onChange={(e) => setSeSignContent({ ...seSignContent, testimonials: { ...seSignContent.testimonials!, subtitle: e.target.value } })} className="w-full px-3 py-2 border rounded" rows={2} placeholder="Section Subtitle" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {seSignContent.testimonials?.items.map((item, idx) => (
                  <div key={idx} className="border p-4 rounded-lg bg-gray-50 flex flex-col gap-3">
                    <input type="text" value={item.userName} onChange={(e) => { const newItems = [...seSignContent.testimonials!.items]; newItems[idx].userName = e.target.value; setSeSignContent({ ...seSignContent, testimonials: { ...seSignContent.testimonials!, items: newItems } }) }} className="border rounded px-2 py-1" placeholder="Name" />
                    <input type="text" value={item.userLocation} onChange={(e) => { const newItems = [...seSignContent.testimonials!.items]; newItems[idx].userLocation = e.target.value; setSeSignContent({ ...seSignContent, testimonials: { ...seSignContent.testimonials!, items: newItems } }) }} className="border rounded px-2 py-1" placeholder="Location" />
                    <input type="text" value={item.userAvatar} onChange={(e) => { const newItems = [...seSignContent.testimonials!.items]; newItems[idx].userAvatar = e.target.value; setSeSignContent({ ...seSignContent, testimonials: { ...seSignContent.testimonials!, items: newItems } }) }} className="border rounded px-2 py-1 text-xs" placeholder="Avatar URL" />
                    <textarea value={item.text} onChange={(e) => { const newItems = [...seSignContent.testimonials!.items]; newItems[idx].text = e.target.value; setSeSignContent({ ...seSignContent, testimonials: { ...seSignContent.testimonials!, items: newItems } }) }} className="border rounded px-2 py-1 text-sm" rows={3} placeholder="Quote" />
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/sesign-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'testimonials', testimonials: seSignContent.testimonials }) });
                    toast.success('Testimonials updated!');
                  } catch { toast.error('Failed to update testimonials'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Testimonials
              </button>
            </div>

            {/* Integrations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Integrations</h3>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="text" value={seSignContent.integrations?.tag || ''} onChange={(e) => setSeSignContent({ ...seSignContent, integrations: { ...seSignContent.integrations!, tag: e.target.value } })} className="border rounded px-3 py-2" placeholder="Tag" />
                  <input type="text" value={seSignContent.integrations?.title || ''} onChange={(e) => setSeSignContent({ ...seSignContent, integrations: { ...seSignContent.integrations!, title: e.target.value } })} className="border rounded px-3 py-2 md:col-span-2" placeholder="Title" />
                  <textarea value={seSignContent.integrations?.subtitle || ''} onChange={(e) => setSeSignContent({ ...seSignContent, integrations: { ...seSignContent.integrations!, subtitle: e.target.value } })} className="border rounded px-3 py-2 md:col-span-3" rows={2} placeholder="Subtitle" />
                </div>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {seSignContent.integrations?.items.map((item, idx) => (
                  <div key={idx} className="border p-2 rounded-lg bg-gray-50 flex flex-col gap-2">
                    <input type="text" value={item.name} onChange={(e) => { const newItems = [...seSignContent.integrations!.items]; newItems[idx].name = e.target.value; setSeSignContent({ ...seSignContent, integrations: { ...seSignContent.integrations!, items: newItems } }) }} className="border rounded px-1 py-1 text-xs text-center" placeholder="Name" />
                    <input type="text" value={item.icon} onChange={(e) => { const newItems = [...seSignContent.integrations!.items]; newItems[idx].icon = e.target.value; setSeSignContent({ ...seSignContent, integrations: { ...seSignContent.integrations!, items: newItems } }) }} className="border rounded px-1 py-1 text-xs" placeholder="Icon" />
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/sesign-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'integrations', integrations: seSignContent.integrations }) });
                    toast.success('Integrations updated!');
                  } catch { toast.error('Failed to update integrations'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Integrations
              </button>
            </div>

            {/* Download CTA */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Download CTA</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                  <input type="text" value={seSignContent.downloadCta?.title || ''} onChange={(e) => setSeSignContent({ ...seSignContent, downloadCta: { ...seSignContent.downloadCta!, title: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Subtitle</label>
                  <textarea value={seSignContent.downloadCta?.subtitle || ''} onChange={(e) => setSeSignContent({ ...seSignContent, downloadCta: { ...seSignContent.downloadCta!, subtitle: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" rows={2} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={seSignContent.downloadCta?.appStoreUrl} onChange={(e) => setSeSignContent({ ...seSignContent, downloadCta: { ...seSignContent.downloadCta!, appStoreUrl: e.target.value } })} className="border rounded px-3 py-2" placeholder="App Store URL" />
                  <input type="text" value={seSignContent.downloadCta?.playStoreUrl} onChange={(e) => setSeSignContent({ ...seSignContent, downloadCta: { ...seSignContent.downloadCta!, playStoreUrl: e.target.value } })} className="border rounded px-3 py-2" placeholder="Play Store URL" />
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/sesign-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'download_cta', downloadCta: seSignContent.downloadCta }) });
                    toast.success('CTA updated!');
                  } catch { toast.error('Failed to update CTA'); }
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save CTA
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
