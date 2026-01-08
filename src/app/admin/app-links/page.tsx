'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminCard from '@/app/admin/components/ui/AdminCard';
import AdminButton from '@/app/admin/components/ui/AdminButton';
import AdminInput from '@/app/admin/components/ui/AdminInput';
import ImageUploadField from '@/app/admin/components/ui/ImageUploadField';

interface AppLink {
    id: string;
    appName: string;
    appDisplayName: string;
    websiteUrl?: string;
    appStoreUrl: string;
    playStoreUrl: string;
    appIcon: string;
    mockupImage?: string;
    qrCode?: string;
    appDescription: string;
    features?: string[];
    platforms?: string[];
    order?: number;
}

export default function AppLinksPage() {
    const [appLinks, setAppLinks] = useState<AppLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<AppLink | null>(null);
    const [form, setForm] = useState({
        appName: '', appDisplayName: '', websiteUrl: '', appStoreUrl: '', playStoreUrl: '',
        appIcon: '', mockupImage: '', qrCode: '', appDescription: '',
        features: '', platforms: '', order: 0
    });

    const fetchData = async () => {
        try {
            const res = await fetch('/api/app-links');
            const data = await res.json();
            setAppLinks(data);
        } catch {
            toast.error('Failed to load app links');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setShowForm(false);
        setEditingItem(null);
        setForm({
            appName: '', appDisplayName: '', websiteUrl: '', appStoreUrl: '', playStoreUrl: '',
            appIcon: '', mockupImage: '', qrCode: '', appDescription: '',
            features: '', platforms: '', order: 0
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formattedBody = {
                ...form,
                features: form.features.split(',').map(s => s.trim()).filter(Boolean),
                platforms: form.platforms.split(',').map(s => s.trim()).filter(Boolean),
                isActive: true
            };
            const method = editingItem ? 'PUT' : 'POST';
            const body = editingItem ? { id: editingItem.id, ...formattedBody } : formattedBody;
            const res = await fetch('/api/app-links', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
            if (res.ok) {
                toast.success(editingItem ? 'App link updated' : 'App link created');
                fetchData();
                resetForm();
            }
        } catch { toast.error('Failed to save app link'); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this app link?')) return;
        try {
            await fetch(`/api/app-links?id=${id}`, { method: 'DELETE' });
            toast.success('App link deleted');
            fetchData();
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
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">📱 App Integrations</h1>
                    <p className="text-gray-500 font-medium">Configure store links and metadata for each application.</p>
                </div>
                <AdminButton onClick={() => setShowForm(true)}>+ Register New App</AdminButton>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <AdminCard
                        className="max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                        title={editingItem ? 'Edit Application Details' : 'Register New Application'}
                        description="Define the store presence and technical details for this app."
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AdminInput
                                    label="Internal Slug"
                                    placeholder="e.g. yoler"
                                    value={form.appName}
                                    onChange={(e) => setForm({ ...form, appName: e.target.value })}
                                    required
                                />
                                <AdminInput
                                    label="Public Display Name"
                                    placeholder="e.g. Yoler - Drive Safe"
                                    value={form.appDisplayName}
                                    onChange={(e) => setForm({ ...form, appDisplayName: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <ImageUploadField
                                    label="App Icon"
                                    value={form.appIcon}
                                    onChange={(url) => setForm({ ...form, appIcon: url })}
                                    previewSize="sm"
                                />
                                <ImageUploadField
                                    label="Mockup Image"
                                    value={form.mockupImage}
                                    onChange={(url) => setForm({ ...form, mockupImage: url })}
                                    previewSize="sm"
                                />
                                <ImageUploadField
                                    label="QR Code"
                                    value={form.qrCode}
                                    onChange={(url) => setForm({ ...form, qrCode: url })}
                                    previewSize="sm"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <AdminInput
                                    label="Website URL"
                                    type="url"
                                    value={form.websiteUrl}
                                    onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                                />
                                <AdminInput
                                    label="App Store Link"
                                    type="url"
                                    value={form.appStoreUrl}
                                    onChange={(e) => setForm({ ...form, appStoreUrl: e.target.value })}
                                />
                                <AdminInput
                                    label="Play Store Link"
                                    type="url"
                                    value={form.playStoreUrl}
                                    onChange={(e) => setForm({ ...form, playStoreUrl: e.target.value })}
                                />
                            </div>

                            <AdminInput
                                label="Pitch / Description"
                                isTextArea
                                rows={2}
                                value={form.appDescription}
                                onChange={(e) => setForm({ ...form, appDescription: e.target.value })}
                            />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <AdminInput
                                    label="Core Features"
                                    helperText="Separate by commas"
                                    value={form.features}
                                    onChange={(e) => setForm({ ...form, features: e.target.value })}
                                />
                                <AdminInput
                                    label="Supported Platforms"
                                    placeholder="iOS, Android, Web"
                                    value={form.platforms}
                                    onChange={(e) => setForm({ ...form, platforms: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-3 pt-6 border-t border-gray-50">
                                <AdminButton type="submit" className="flex-1">Save Configuration</AdminButton>
                                <AdminButton type="button" variant="secondary" onClick={resetForm}>Cancel</AdminButton>
                            </div>
                        </form>
                    </AdminCard>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {appLinks.length === 0 ? (
                    <div className="py-20 bg-white rounded-3xl border-4 border-dashed border-gray-50 flex flex-col items-center justify-center text-center">
                        <span className="text-6xl mb-4">🛸</span>
                        <h3 className="text-xl font-bold text-gray-900">No Apps Registered</h3>
                        <p className="text-gray-400 max-w-xs mt-2">Connect your first mobile application to the platform.</p>
                    </div>
                ) : (
                    appLinks.map(a => (
                        <div key={a.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6 group">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-3xl bg-gray-50 border border-gray-100 p-3 shadow-inner flex items-center justify-center group-hover:bg-white transition-colors">
                                    <img src={a.appIcon} className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-extrabold text-gray-900 text-lg uppercase tracking-tight">{a.appDisplayName}</h3>
                                    <span className="text-[10px] font-black bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full tracking-widest">{a.appName}</span>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-1">{a.appDescription}</p>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {a.appStoreUrl && <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">App Store</span>}
                                    {a.playStoreUrl && <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">Play Store</span>}
                                    {a.websiteUrl && <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">Website</span>}
                                </div>
                            </div>
                            <div className="flex gap-2 min-w-max">
                                <AdminButton
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-2xl"
                                    onClick={() => {
                                        setEditingItem(a);
                                        setForm({
                                            appName: a.appName,
                                            appDisplayName: a.appDisplayName,
                                            websiteUrl: a.websiteUrl || '',
                                            appStoreUrl: a.appStoreUrl,
                                            playStoreUrl: a.playStoreUrl,
                                            appIcon: a.appIcon,
                                            mockupImage: a.mockupImage || '',
                                            qrCode: a.qrCode || '',
                                            appDescription: a.appDescription,
                                            features: a.features?.join(', ') || '',
                                            platforms: a.platforms?.join(', ') || '',
                                            order: a.order || 0
                                        });
                                        setShowForm(true);
                                    }}
                                >
                                    ✏️ Configure
                                </AdminButton>
                                <AdminButton
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-2xl text-rose-500 hover:text-rose-600"
                                    onClick={() => handleDelete(a.id)}
                                >
                                    🗑️
                                </AdminButton>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
