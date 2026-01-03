'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { Toaster, toast } from 'react-hot-toast';

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

const PAGE_OPTIONS = [
  { value: 'homepage', label: 'Homepage' },
  { value: 'yoler', label: 'Yoler' },
  { value: 'plantzify', label: 'Plantzify' },
  { value: 'sesign', label: 'SeSign' },
  { value: 'deep-study-ai', label: 'Deep Study AI' },
  { value: 'ztax', label: 'Ztax' },
];

const TABS = [
  { id: 'faqs', label: 'FAQs', icon: '❓' },
  { id: 'contacts', label: 'Contacts', icon: '📧' },
  { id: 'testimonials', label: 'Testimonials', icon: '💬' },
  { id: 'app-links', label: 'App Links', icon: '📱' },
  { id: 'pages', label: 'Pages', icon: '📄' },
];

type TabType = 'faqs' | 'contacts' | 'testimonials' | 'app-links' | 'pages';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('faqs');
  const [selectedPage, setSelectedPage] = useState<string>('homepage');
  const [loading, setLoading] = useState(true);

  // Data states
  const [allFAQs, setAllFAQs] = useState<FAQ[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [appLinks, setAppLinks] = useState<AppLink[]>([]);
  const [pages, setPages] = useState<PageContent[]>([]);

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
      const [faqsRes, contactsRes, testimonialsRes, appLinksRes, pagesRes] = await Promise.all([
        fetch('/api/faqs'),
        fetch('/api/contacts'),
        fetch('/api/testimonials'),
        fetch('/api/app-links'),
        fetch('/api/pages'),
      ]);

      setAllFAQs(await faqsRes.json());
      setContacts(await contactsRes.json());
      setTestimonials(await testimonialsRes.json());
      setAppLinks(await appLinksRes.json());
      setPages(await pagesRes.json());
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
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center"><Logo /></Link>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

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
      </div>
    </div>
  );
}
