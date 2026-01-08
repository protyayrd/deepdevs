
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { PageContent } from '../../types';
import AdminCard from '../ui/AdminCard';
import AdminButton from '../ui/AdminButton';
import AdminInput from '../ui/AdminInput';

interface PagesTabProps {
    pages: PageContent[];
    onRefresh: () => void;
}

const PagesTab: React.FC<PagesTabProps> = ({ pages, onRefresh }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<PageContent | null>(null);
    const [pageForm, setPageForm] = useState({
        slug: '', title: '', content: '', metaDescription: '', isPublished: true
    });

    const resetForm = () => {
        setShowForm(false);
        setEditingItem(null);
        setPageForm({ slug: '', title: '', content: '', metaDescription: '', isPublished: true });
    };

    const handlePageSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingItem ? 'PUT' : 'POST';
            const body = editingItem ? { id: editingItem.id, ...pageForm } : pageForm;
            const res = await fetch('/api/pages', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
            if (res.ok) {
                toast.success(editingItem ? 'Page refined' : 'New page published');
                onRefresh();
                resetForm();
            }
        } catch { toast.error('Error saving the page'); }
    };

    const handleDeletePage = async (id: string) => {
        if (!confirm('This will permanently delete the page. Proceed?')) return;
        try {
            await fetch(`/api/pages?id=${id}`, { method: 'DELETE' });
            toast.success('Page removed');
            onRefresh();
        } catch { toast.error('Failed to remove page'); }
    };

    return (
        <div className="space-y-8 animate-fade-in-up is-visible pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">📄 Custom Pages</h1>
                    <p className="text-gray-500 font-medium">Create and manage independent landing pages or legal documents.</p>
                </div>
                <AdminButton
                    onClick={() => setShowForm(true)}
                    className="shadow-lg shadow-indigo-100"
                >
                    + Create New Page
                </AdminButton>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-4xl w-full p-8 lg:p-12 max-h-[90vh] overflow-y-auto relative border border-gray-100">
                        <div className="mb-8 border-b border-gray-100 pb-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                                    {editingItem ? 'Refine Page Content' : 'Draft New Page'}
                                </h3>
                                <p className="text-gray-500 text-sm font-medium mt-1">Configure your page structure and meta details.</p>
                            </div>
                            <button onClick={resetForm} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
                                ✖
                            </button>
                        </div>

                        <form onSubmit={handlePageSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AdminInput
                                    label="URL Slug"
                                    placeholder="e.g. privacy-policy"
                                    value={pageForm.slug}
                                    onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value })}
                                    required
                                />
                                <AdminInput
                                    label="Page Title"
                                    placeholder="e.g. Our Private Privacy Policy"
                                    value={pageForm.title}
                                    onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                                    required
                                />
                            </div>

                            <AdminInput
                                label="Meta Description (SEO)"
                                placeholder="A brief summary for search engines..."
                                value={pageForm.metaDescription}
                                onChange={(e) => setPageForm({ ...pageForm, metaDescription: e.target.value })}
                            />

                            <div className="space-y-3">
                                <label className="block text-sm font-black text-gray-900 uppercase tracking-widest pl-1">Page Architecture (HTML Content)</label>
                                <textarea
                                    value={pageForm.content}
                                    onChange={(e) => setPageForm({ ...pageForm, content: e.target.value })}
                                    rows={12}
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-3xl font-mono text-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all placeholder:text-gray-300"
                                    placeholder="<h1>Welcome</h1><p>Luxury awaits...</p>"
                                />
                                <p className="text-xs text-gray-400 font-medium pl-1 italic flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Advanced HTML and inline CSS is supported for complex layouts.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 w-fit">
                                <input
                                    type="checkbox"
                                    id="isPublished"
                                    checked={pageForm.isPublished}
                                    onChange={(e) => setPageForm({ ...pageForm, isPublished: e.target.checked })}
                                    className="w-5 h-5 rounded-md border-indigo-200 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="isPublished" className="text-sm font-bold text-indigo-900 cursor-pointer">Live / Published Status</label>
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-gray-100">
                                <AdminButton type="submit">
                                    {editingItem ? 'Update Live Page' : 'Publish Page'}
                                </AdminButton>
                                <AdminButton type="button" variant="secondary" onClick={resetForm}>
                                    Discard Changes
                                </AdminButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.length === 0 ? (
                    <div className="col-span-full py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-4">
                        <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <p className="font-bold uppercase tracking-widest text-sm italic">The archive is empty</p>
                    </div>
                ) : pages.map(p => (
                    <div key={p.id} className="group p-6 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col justify-between overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className={`w-3 h-3 rounded-full ${p.isPublished ? 'bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.5)]' : 'bg-gray-300'}`} />
                        </div>

                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xl">
                                {p.title.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{p.title}</h3>
                                <p className="text-indigo-500 text-xs font-black uppercase tracking-widest mt-1">/{p.slug}</p>
                            </div>
                            <p className="text-gray-500 text-sm line-clamp-2 min-h-[2.5rem]">
                                {p.metaDescription || 'No description provided for SEO engines.'}
                            </p>
                        </div>

                        <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingItem(p);
                                        setPageForm({ slug: p.slug, title: p.title, content: p.content, metaDescription: p.metaDescription || '', isPublished: p.isPublished });
                                        setShowForm(true);
                                    }}
                                    className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors tooltip"
                                    title="Edit Content"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 012.828 0L21 21m-2.122-2.122l-1.414 1.414" /></svg>
                                </button>
                                <button
                                    onClick={() => handleDeletePage(p.id)}
                                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    title="Delete Page"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${p.isPublished ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                {p.isPublished ? 'Published' : 'Draft'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PagesTab;
