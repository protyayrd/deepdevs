'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminCard from '@/app/admin/components/ui/AdminCard';
import AdminButton from '@/app/admin/components/ui/AdminButton';
import AdminInput from '@/app/admin/components/ui/AdminInput';
import ImageUploadField from '@/app/admin/components/ui/ImageUploadField';

const PAGE_OPTIONS = [
    { value: 'homepage', label: 'Homepage' },
    { value: 'yoler', label: 'Yoler' },
    { value: 'plantzify', label: 'Plantzify' },
    { value: 'sesign', label: 'SeSign' },
    { value: 'deep-study-ai', label: 'Deep Study AI' },
    { value: 'ztax', label: 'Ztax' },
];

interface Testimonial {
    id: string;
    page: string;
    customerName: string;
    location: string;
    avatar?: string;
    content: string;
    rating?: number;
    order: number;
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [selectedPage, setSelectedPage] = useState('homepage');
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
    const [form, setForm] = useState({
        page: 'homepage', customerName: '', location: '', avatar: '', content: '', rating: 5, order: 0
    });

    const fetchTestimonials = async () => {
        try {
            const res = await fetch('/api/testimonials');
            const data = await res.json();
            setTestimonials(data);
        } catch {
            toast.error('Failed to load testimonials');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const filteredTestimonials = testimonials.filter(t => t.page === selectedPage);

    const resetForm = () => {
        setShowForm(false);
        setEditingItem(null);
        setForm({ page: selectedPage, customerName: '', location: '', avatar: '', content: '', rating: 5, order: 0 });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingItem ? 'PUT' : 'POST';
            const body = editingItem ? { id: editingItem.id, ...form, isActive: true } : { ...form, isActive: true };
            const res = await fetch('/api/testimonials', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
            if (res.ok) {
                toast.success(editingItem ? 'Testimonial updated' : 'Testimonial created');
                fetchTestimonials();
                resetForm();
            }
        } catch { toast.error('Failed to save testimonial'); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this testimonial?')) return;
        try {
            await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
            toast.success('Testimonial deleted');
            fetchTestimonials();
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
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">💬 Testimonials</h1>
                    <p className="text-gray-500 font-medium">Customer stories and social proof for your platform.</p>
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
                    <AdminButton onClick={() => { setShowForm(true); setForm({ ...form, page: selectedPage }); }}>+ Add Review</AdminButton>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <AdminCard
                        className="max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                        title={editingItem ? 'Edit Testimonial' : 'New Testimonial'}
                        description="Customer feedback will be displayed in the testimonials slider on the front-end."
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-gray-700 ml-1">Page Assignment</label>
                                    <select
                                        value={form.page}
                                        onChange={(e) => setForm({ ...form, page: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                                    >
                                        {PAGE_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                                    </select>
                                </div>
                                <AdminInput
                                    label="Customer Name"
                                    value={form.customerName}
                                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                                    required
                                />
                                <AdminInput
                                    label="Location / Role"
                                    value={form.location}
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    placeholder="e.g. London, UK or Senior Dev"
                                    required
                                />
                                <div className="md:col-span-2">
                                    <ImageUploadField
                                        label="Avatar (Optional)"
                                        value={form.avatar}
                                        onChange={(url) => setForm({ ...form, avatar: url })}
                                        previewSize="sm"
                                    />
                                </div>
                            </div>
                            <AdminInput
                                label="Testimonial Content"
                                isTextArea
                                rows={4}
                                value={form.content}
                                onChange={(e) => setForm({ ...form, content: e.target.value })}
                                required
                            />
                            <div className="grid grid-cols-2 gap-6">
                                <AdminInput
                                    label="Star Rating (1-5)"
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={form.rating}
                                    onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })}
                                />
                                <AdminInput
                                    label="Display Weight"
                                    type="number"
                                    value={form.order}
                                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                                    helperText="Higher numbers appear later"
                                />
                            </div>
                            <div className="flex gap-3 pt-6 border-t border-gray-50">
                                <AdminButton type="submit" className="flex-1">{editingItem ? 'Update Story' : 'Publish Story'}</AdminButton>
                                <AdminButton type="button" variant="secondary" onClick={resetForm}>Cancel</AdminButton>
                            </div>
                        </form>
                    </AdminCard>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                {filteredTestimonials.length === 0 ? (
                    <div className="py-20 bg-white rounded-3xl border-4 border-dashed border-gray-50 flex flex-col items-center justify-center text-center">
                        <span className="text-6xl mb-4">😿</span>
                        <h3 className="text-xl font-bold text-gray-900">No Stories Shared</h3>
                        <p className="text-gray-400 max-w-xs mt-2">No testimonials match your filter. Start by adding a positive customer review!</p>
                    </div>
                ) : (
                    filteredTestimonials.map(t => (
                        <div key={t.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row gap-6">
                            <div className="flex-shrink-0">
                                {t.avatar ? (
                                    <img src={t.avatar} className="w-16 h-16 rounded-2xl object-cover shadow-sm ring-4 ring-gray-50" />
                                ) : (
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-black uppercase">
                                        {t.customerName[0]}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{t.customerName}</h3>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.location}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                                        <span className="text-xs font-black text-amber-600 mt-0.5">{t.rating || 5}</span>
                                        <span className="text-[10px]">⭐</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-50 relative">
                                    <span className="absolute -top-3 -left-2 text-4xl text-indigo-200 pointer-events-none opacity-50">&ldquo;</span>
                                    <p className="text-gray-600 text-sm leading-relaxed italic">{t.content}</p>
                                    <span className="absolute -bottom-6 -right-2 text-4xl text-indigo-200 pointer-events-none opacity-50">&rdquo;</span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Weight: {t.order}</span>
                                    <div className="flex gap-2">
                                        <AdminButton
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => { setEditingItem(t); setForm({ page: t.page, customerName: t.customerName, location: t.location, avatar: t.avatar || '', content: t.content, rating: t.rating || 5, order: t.order }); setShowForm(true); }}
                                        >
                                            Edit
                                        </AdminButton>
                                        <AdminButton
                                            variant="ghost"
                                            size="sm"
                                            className="text-rose-500 hover:text-rose-600"
                                            onClick={() => handleDelete(t.id)}
                                        >
                                            Delete
                                        </AdminButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
