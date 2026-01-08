
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Testimonial, PAGE_OPTIONS } from '../../types';
import AdminCard from '../ui/AdminCard';
import AdminButton from '../ui/AdminButton';
import AdminInput from '../ui/AdminInput';

interface TestimonialsTabProps {
    testimonials: Testimonial[];
    selectedPage: string;
    setSelectedPage: (page: string) => void;
    onRefresh: () => void;
}

const TestimonialsTab: React.FC<TestimonialsTabProps> = ({ testimonials, selectedPage, setSelectedPage, onRefresh }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
    const [testimonialForm, setTestimonialForm] = useState({
        page: selectedPage, customerName: '', location: '', avatar: '', content: '', rating: 5, order: 0
    });

    const resetForm = () => {
        setShowForm(false);
        setEditingItem(null);
        setTestimonialForm({ page: selectedPage, customerName: '', location: '', avatar: '', content: '', rating: 5, order: 0 });
    };

    const handleTestimonialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingItem ? 'PUT' : 'POST';
            const body = editingItem ? { id: editingItem.id, ...testimonialForm, isActive: true } : { ...testimonialForm, isActive: true };
            const res = await fetch('/api/testimonials', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
            if (res.ok) {
                toast.success(editingItem ? 'Testimonial updated' : 'Testimonial created');
                onRefresh();
                resetForm();
            }
        } catch { toast.error('Failed to save testimonial'); }
    };

    const handleDeleteTestimonial = async (id: string) => {
        if (!confirm('Delete this testimonial?')) return;
        try {
            await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
            toast.success('Testimonial deleted');
            onRefresh();
        } catch { toast.error('Failed to delete'); }
    };

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
                    <AdminButton onClick={() => { setShowForm(true); setTestimonialForm({ ...testimonialForm, page: selectedPage }); }}>+ Add Review</AdminButton>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <AdminCard
                        className="max-w-2xl w-full shadow-2xl animate-scale-up"
                        title={editingItem ? 'Edit Testimonial' : 'New Testimonial'}
                        description="Customer feedback will be displayed in the testimonials slider on the front-end."
                    >
                        <form onSubmit={handleTestimonialSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-gray-700 ml-1">Page Assignment</label>
                                    <select
                                        value={testimonialForm.page}
                                        onChange={(e) => setTestimonialForm({ ...testimonialForm, page: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                                    >
                                        {PAGE_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                                    </select>
                                </div>
                                <AdminInput
                                    label="Customer Name"
                                    value={testimonialForm.customerName}
                                    onChange={(e) => setTestimonialForm({ ...testimonialForm, customerName: e.target.value })}
                                    required
                                />
                                <AdminInput
                                    label="Location / Role"
                                    value={testimonialForm.location}
                                    onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                                    placeholder="e.g. London, UK or Senior Dev"
                                    required
                                />
                                <AdminInput
                                    label="Avatar URL (Optional)"
                                    value={testimonialForm.avatar}
                                    onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <AdminInput
                                label="Testimonial Content"
                                isTextArea
                                rows={4}
                                value={testimonialForm.content}
                                onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                                required
                            />
                            <div className="grid grid-cols-2 gap-6">
                                <AdminInput
                                    label="Star Rating (1-5)"
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={testimonialForm.rating}
                                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) || 5 })}
                                />
                                <AdminInput
                                    label="Display Weight (Order)"
                                    type="number"
                                    value={testimonialForm.order}
                                    onChange={(e) => setTestimonialForm({ ...testimonialForm, order: parseInt(e.target.value) || 0 })}
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
                {testimonials.length === 0 ? (
                    <div className="py-20 bg-white rounded-3xl border-4 border-dashed border-gray-50 flex flex-col items-center justify-center text-center">
                        <span className="text-6xl mb-4">😿</span>
                        <h3 className="text-xl font-bold text-gray-900">No Stories Shared</h3>
                        <p className="text-gray-400 max-w-xs mt-2">No testimonials match your filter. Start by adding a positive customer review!</p>
                    </div>
                ) : (
                    testimonials.map(t => (
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
                                            onClick={() => { setEditingItem(t); setTestimonialForm({ page: t.page, customerName: t.customerName, location: t.location, avatar: t.avatar || '', content: t.content, rating: t.rating || 5, order: t.order }); setShowForm(true); }}
                                        >
                                            Edit
                                        </AdminButton>
                                        <AdminButton
                                            variant="ghost"
                                            size="sm"
                                            className="text-rose-500 hover:text-rose-600"
                                            onClick={() => handleDeleteTestimonial(t.id)}
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
};

export default TestimonialsTab;
