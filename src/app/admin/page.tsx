'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
interface FAQ {
  id: string;
  page: string;
  question: string;
  answer: string;
}

const PAGE_OPTIONS = [
  { value: 'homepage', label: 'Homepage' },
  { value: 'yoler', label: 'Yoler' },
  { value: 'plantzify', label: 'Plantzify' },
  { value: 'sesign', label: 'SeSign' },
  { value: 'deep-study-ai', label: 'Deep Study AI' },
  { value: 'ztax', label: 'Ztax' },
];

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

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'faqs' | 'contacts'>('faqs');
  const [selectedPage, setSelectedPage] = useState<string>('homepage');
  const [allFAQs, setAllFAQs] = useState<FAQ[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [showFAQForm, setShowFAQForm] = useState(false);
  const [faqForm, setFaqForm] = useState({ page: 'homepage', question: '', answer: '' });

  // Filter FAQs by selected page
  const faqs = allFAQs.filter(faq => faq.page === selectedPage);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [faqsRes, contactsRes] = await Promise.all([
        fetch('/api/faqs'),
        fetch('/api/contacts'),
      ]);

      const faqsData = await faqsRes.json();
      const contactsData = await contactsRes.json();

      setAllFAQs(faqsData);
      setContacts(contactsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    router.push('/admin/login');
  };

  const handleFAQSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingFAQ ? '/api/faqs' : '/api/faqs';
      const method = editingFAQ ? 'PUT' : 'POST';
      const body = editingFAQ
        ? { id: editingFAQ.id, ...faqForm }
        : faqForm;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await fetchData();
        setShowFAQForm(false);
        setEditingFAQ(null);
        setFaqForm({ page: selectedPage, question: '', answer: '' });
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const response = await fetch(`/api/faqs?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const handleEditFAQ = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFaqForm({ page: faq.page, question: faq.question, answer: faq.answer });
    setShowFAQForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[1.2rem]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center">
                <Logo />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('faqs')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'faqs'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                FAQs ({faqs.length})
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'contacts'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Contact Submissions ({contacts.length})
              </button>
            </nav>
          </div>
        </div>

        {/* FAQs Tab */}
        {activeTab === 'faqs' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Manage FAQs</h2>
                <select
                  value={selectedPage}
                  onChange={(e) => {
                    setSelectedPage(e.target.value);
                    setFaqForm({ ...faqForm, page: e.target.value });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {PAGE_OPTIONS.map((page) => (
                    <option key={page.value} value={page.value}>
                      {page.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => {
                  setShowFAQForm(true);
                  setEditingFAQ(null);
                  setFaqForm({ page: selectedPage, question: '', answer: '' });
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add New FAQ
              </button>
            </div>

            {/* FAQ Form Modal */}
            {showFAQForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-bold mb-4">
                    {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
                  </h3>
                  <form onSubmit={handleFAQSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Page
                      </label>
                      <select
                        value={faqForm.page}
                        onChange={(e) => setFaqForm({ ...faqForm, page: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        {PAGE_OPTIONS.map((page) => (
                          <option key={page.value} value={page.value}>
                            {page.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question
                      </label>
                      <input
                        type="text"
                        value={faqForm.question}
                        onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Answer
                      </label>
                      <textarea
                        value={faqForm.answer}
                        onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        {editingFAQ ? 'Update' : 'Create'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowFAQForm(false);
                          setEditingFAQ(null);
                          setFaqForm({ page: selectedPage, question: '', answer: '' });
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* FAQs List */}
            <div className="space-y-4">
              {faqs.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No FAQs yet. Add your first FAQ!</p>
              ) : (
                faqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditFAQ(faq)}
                          className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 border border-indigo-300 rounded hover:bg-indigo-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteFAQ(faq.id)}
                          className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-300 rounded hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Submissions</h2>
            
            {contacts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No contact submissions yet.</p>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium text-gray-900">
                          {contact.firstName} {contact.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">{contact.emailAddress}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">{contact.phoneNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Submitted At</p>
                        <p className="font-medium text-gray-900">
                          {new Date(contact.submittedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500">Subject</p>
                        <p className="font-medium text-gray-900">{contact.subject}</p>
                      </div>
                      {contact.message && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Message</p>
                          <p className="text-gray-900">{contact.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

