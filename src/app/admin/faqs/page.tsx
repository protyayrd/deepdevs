'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminCard from '@/app/admin/components/ui/AdminCard';
import AdminButton from '@/app/admin/components/ui/AdminButton';
import AdminInput from '@/app/admin/components/ui/AdminInput';

const PAGE_OPTIONS = [
    { value: 'homepage', label: 'Homepage' },
    { value: 'yoler', label: 'Yoler' },
    { value: 'plantzify', label: 'Plantzify' },
    { value: 'sesign', label: 'SeSign' },
    { value: 'deep-study-ai', label: 'Deep Study AI' },
    { value: 'ztax', label: 'Ztax' },
];

interface FAQ {
    id: string;
    page: string;
    question: string;
    answer: string;
}

export default function FaqsPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [selectedPage, setSelectedPage] = useState('homepage');
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<FAQ | null>(null);
    const [faqForm, setFaqForm] = useState({ page: 'homepage', question: '', answer: '' });

    const fetchFaqs = async () => {
        try {
            const res = await fetch('/api/faqs');
            const data = await res.json();
            setFaqs(data);
        } catch {
            toast.error('Failed to load FAQs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const filteredFaqs = faqs.filter(faq => faq.page === selectedPage);

    const resetForm = () => {
        setShowForm(false);
        setEditingItem(null);
        setFaqForm({ page: selectedPage, question: '', answer: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingItem ? 'PUT' : 'POST';
            const body = editingItem ? { id: editingItem.id, ...faqForm } : faqForm;
            const res = await fetch('/api/faqs', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
            if (res.ok) {
                toast.success(editingItem ? 'FAQ updated' : 'FAQ created');
                fetchFaqs();
                resetForm();
            }
        } catch { toast.error('Failed to save FAQ'); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this FAQ?')) return;
        try {
            await fetch(`/api/faqs?id=${id}`, { method: 'DELETE' });
            toast.success('FAQ deleted');
            fetchFaqs();
        } catch { toast.error('Failed to delete'); }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in-up is-visible pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">❓ Manage FAQs</h1>
                    <p className="text-gray-500 font-medium">Answer common questions for each page.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Filter:</span>
                    <select
                        value={selectedPage}
                        onChange={(e) => setSelectedPage(e.target.value)}
                        className="px-4 py-2 bg-gray-50 border-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500/20"
                    >
                        {PAGE_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                    <AdminButton onClick={() => { setShowForm(true); setFaqForm({ ...faqForm, page: selectedPage }); }}>+ Add FAQ</AdminButton>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <AdminCard
                        className="max-w-2xl w-full shadow-2xl"
                        title={editingItem ? 'Edit FAQ Entry' : 'Create New FAQ'}
                        description="This question will appear on the selected page's FAQ section."
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-gray-700 ml-1">Assign to Page</label>
                                <select
                                    value={faqForm.page}
                                    onChange={(e) => setFaqForm({ ...faqForm, page: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                                >
                                    {PAGE_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                                </select>
                            </div>
                            <AdminInput
                                label="Question"
                                placeholder="e.g. How do I reset my password?"
                                value={faqForm.question}
                                onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                                required
                            />
                            <AdminInput
                                label="Detailed Answer"
                                isTextArea
                                rows={4}
                                placeholder="Provide a helpful and concise answer..."
                                value={faqForm.answer}
                                onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                                required
                            />
                            <div className="flex gap-3 pt-4 border-t border-gray-50">
                                <AdminButton type="submit" className="flex-1">{editingItem ? 'Update FAQ' : 'Create FAQ'}</AdminButton>
                                <AdminButton type="button" variant="secondary" onClick={resetForm}>Cancel</AdminButton>
                            </div>
                        </form>
                    </AdminCard>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredFaqs.length === 0 ? (
                    <div className="col-span-full py-20 bg-white rounded-3xl border-4 border-dashed border-gray-50 flex flex-col items-center justify-center text-center">
                        <span className="text-6xl mb-4">😶</span>
                        <h3 className="text-xl font-bold text-gray-900">No FAQs Found</h3>
                        <p className="text-gray-400 max-w-xs mt-2">There are no FAQ entries for this page yet. Click 'Add FAQ' to create one.</p>
                    </div>
                ) : (
                    filteredFaqs.map(faq => (
                        <div key={faq.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-2 flex-1">
                                    <h3 className="font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">{faq.question}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed font-normal">{faq.answer}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => { setEditingItem(faq); setFaqForm({ page: faq.page, question: faq.question, answer: faq.answer }); setShowForm(true); }}
                                        className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl transition-colors shadow-sm bg-white"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDelete(faq.id)}
                                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors shadow-sm bg-white"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
