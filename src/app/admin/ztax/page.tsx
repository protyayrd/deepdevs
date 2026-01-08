'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminCard from '@/app/admin/components/ui/AdminCard';
import AdminButton from '@/app/admin/components/ui/AdminButton';
import AdminInput from '@/app/admin/components/ui/AdminInput';
import ImageUploadField from '@/app/admin/components/ui/ImageUploadField';

interface ZtaxContent {
    hero?: { title?: string; subtitle?: string; heroImage?: string; logo?: string; ctaText?: string; ctaLink?: string; appStoreUrl?: string; playStoreUrl?: string };
    stats?: Array<{ id?: string; value: string; label: string; color?: string }>;
    features?: Array<{ id?: string; icon?: string; title: string; description: string }>;
    powerfulFeatures?: Array<{ id?: string; number?: number; title: string; description: string; image?: string }>;
    testimonials?: Array<{ id?: string; content: string; author: string; role?: string; avatar?: string }>;
    pricing?: Array<{ id?: string; name: string; price: string; period?: string; features: string[]; isPopular?: boolean }>;
}

export default function ZtaxPage() {
    const [content, setContent] = useState<ZtaxContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/ztax-content');
                const data = await res.json();
                setContent(data);
            } catch {
                toast.error('Failed to load Ztax content');
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const saveSection = async (section: string, data: any) => {
        try {
            await fetch('/api/ztax-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section, [section]: data })
            });
            toast.success(`${section.replace('_', ' ')} updated!`);
        } catch {
            toast.error(`Failed to update ${section}`);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!content) return null;

    return (
        <div className="space-y-8 animate-fade-in-up is-visible pb-20">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">💰 Ztax Content</h1>
                <p className="text-gray-500 font-medium">Manage the landing page for the Ztax financial platform.</p>
            </div>

            {/* Hero Section */}
            <AdminCard
                title="Hero Section"
                description="Main headline, visuals, and download links."
                actions={<AdminButton size="sm" onClick={() => saveSection('hero', content.hero)}>Save Hero</AdminButton>}
            >
                <div className="space-y-6">
                    <AdminInput
                        label="Title"
                        isTextArea
                        rows={2}
                        value={content.hero?.title || ''}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                    />
                    <AdminInput
                        label="Subtitle"
                        isTextArea
                        rows={2}
                        value={content.hero?.subtitle || ''}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ImageUploadField
                            label="Hero Image"
                            value={content.hero?.heroImage || ''}
                            onChange={(url) => setContent({ ...content, hero: { ...content.hero, heroImage: url } })}
                        />
                        <ImageUploadField
                            label="App Logo"
                            value={content.hero?.logo || ''}
                            onChange={(url) => setContent({ ...content, hero: { ...content.hero, logo: url } })}
                            previewSize="sm"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="App Store Link"
                            value={content.hero?.appStoreUrl || ''}
                            onChange={(e) => setContent({ ...content, hero: { ...content.hero, appStoreUrl: e.target.value } })}
                        />
                        <AdminInput
                            label="Play Store Link"
                            value={content.hero?.playStoreUrl || ''}
                            onChange={(e) => setContent({ ...content, hero: { ...content.hero, playStoreUrl: e.target.value } })}
                        />
                    </div>
                </div>
            </AdminCard>

            {/* Stats Section */}
            <AdminCard
                title="Impact Statistics"
                description="Key numbers that showcase platform success."
                actions={<AdminButton size="sm" onClick={() => saveSection('stats', content.stats)}>Save Stats</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {content.stats?.map((stat, idx) => (
                        <div key={stat.id || idx} className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-3">
                            <AdminInput
                                placeholder="Value (e.g. $10M+)"
                                value={stat.value}
                                onChange={(e) => {
                                    const newStats = [...(content.stats || [])];
                                    newStats[idx] = { ...newStats[idx], value: e.target.value };
                                    setContent({ ...content, stats: newStats });
                                }}
                            />
                            <AdminInput
                                placeholder="Label"
                                value={stat.label}
                                onChange={(e) => {
                                    const newStats = [...(content.stats || [])];
                                    newStats[idx] = { ...newStats[idx], label: e.target.value };
                                    setContent({ ...content, stats: newStats });
                                }}
                            />
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-400">Color:</span>
                                <input
                                    type="color"
                                    value={stat.color || '#4f46e5'}
                                    onChange={(e) => {
                                        const newStats = [...(content.stats || [])];
                                        newStats[idx] = { ...newStats[idx], color: e.target.value };
                                        setContent({ ...content, stats: newStats });
                                    }}
                                    className="w-8 h-8 rounded-lg border-2 border-white shadow-sm cursor-pointer"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Features Section */}
            <AdminCard
                title="Platform Features"
                description="Key capabilities of the financial platform."
                actions={<AdminButton size="sm" onClick={() => saveSection('features', content.features)}>Save Features</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.features?.map((feature, idx) => (
                        <div key={feature.id || idx} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 space-y-4">
                            <ImageUploadField
                                label="Icon"
                                value={feature.icon || ''}
                                onChange={(url) => {
                                    const newFeatures = [...(content.features || [])];
                                    newFeatures[idx] = { ...newFeatures[idx], icon: url };
                                    setContent({ ...content, features: newFeatures });
                                }}
                                previewSize="sm"
                            />
                            <AdminInput
                                label="Title"
                                value={feature.title}
                                onChange={(e) => {
                                    const newFeatures = [...(content.features || [])];
                                    newFeatures[idx] = { ...newFeatures[idx], title: e.target.value };
                                    setContent({ ...content, features: newFeatures });
                                }}
                            />
                            <AdminInput
                                label="Description"
                                isTextArea
                                rows={2}
                                value={feature.description}
                                onChange={(e) => {
                                    const newFeatures = [...(content.features || [])];
                                    newFeatures[idx] = { ...newFeatures[idx], description: e.target.value };
                                    setContent({ ...content, features: newFeatures });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Powerful Features Timeline */}
            <AdminCard
                title="Powerful Features Timeline"
                description="Step-by-step feature showcase."
                actions={<AdminButton size="sm" onClick={() => saveSection('powerful_features', content.powerfulFeatures)}>Save Timeline</AdminButton>}
            >
                <div className="space-y-6">
                    {content.powerfulFeatures?.map((step, idx) => (
                        <div key={step.id || idx} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-col lg:flex-row gap-6">
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-yellow-500 text-white flex items-center justify-center text-2xl font-black">
                                {idx + 1}
                            </div>
                            <div className="flex-1 space-y-4">
                                <AdminInput
                                    label="Feature Title"
                                    value={step.title}
                                    onChange={(e) => {
                                        const newSteps = [...(content.powerfulFeatures || [])];
                                        newSteps[idx] = { ...newSteps[idx], title: e.target.value };
                                        setContent({ ...content, powerfulFeatures: newSteps });
                                    }}
                                />
                                <AdminInput
                                    label="Description"
                                    isTextArea
                                    rows={2}
                                    value={step.description}
                                    onChange={(e) => {
                                        const newSteps = [...(content.powerfulFeatures || [])];
                                        newSteps[idx] = { ...newSteps[idx], description: e.target.value };
                                        setContent({ ...content, powerfulFeatures: newSteps });
                                    }}
                                />
                            </div>
                            <ImageUploadField
                                label="Feature Image"
                                value={step.image || ''}
                                onChange={(url) => {
                                    const newSteps = [...(content.powerfulFeatures || [])];
                                    newSteps[idx] = { ...newSteps[idx], image: url };
                                    setContent({ ...content, powerfulFeatures: newSteps });
                                }}
                                previewSize="sm"
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Pricing Section */}
            <AdminCard
                title="Investment Plans (Pricing)"
                description="Subscription tiers and features."
                actions={<AdminButton size="sm" onClick={() => saveSection('pricing', content.pricing)}>Save Pricing</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {content.pricing?.map((plan, idx) => (
                        <div key={plan.id || idx} className={`p-6 rounded-3xl border-2 space-y-4 ${plan.isPopular ? 'border-yellow-400 bg-yellow-50/30' : 'border-gray-100 bg-gray-50/50'}`}>
                            <div className="flex items-center justify-between">
                                <AdminInput
                                    placeholder="Plan Name"
                                    value={plan.name}
                                    onChange={(e) => {
                                        const newPlans = [...(content.pricing || [])];
                                        newPlans[idx] = { ...newPlans[idx], name: e.target.value };
                                        setContent({ ...content, pricing: newPlans });
                                    }}
                                />
                                <label className="flex items-center gap-2 text-xs font-bold text-gray-500 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={plan.isPopular || false}
                                        onChange={(e) => {
                                            const newPlans = [...(content.pricing || [])];
                                            newPlans[idx] = { ...newPlans[idx], isPopular: e.target.checked };
                                            setContent({ ...content, pricing: newPlans });
                                        }}
                                        className="rounded"
                                    />
                                    Popular
                                </label>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <AdminInput
                                    placeholder="$99"
                                    value={plan.price}
                                    onChange={(e) => {
                                        const newPlans = [...(content.pricing || [])];
                                        newPlans[idx] = { ...newPlans[idx], price: e.target.value };
                                        setContent({ ...content, pricing: newPlans });
                                    }}
                                />
                                <AdminInput
                                    placeholder="/month"
                                    value={plan.period || ''}
                                    onChange={(e) => {
                                        const newPlans = [...(content.pricing || [])];
                                        newPlans[idx] = { ...newPlans[idx], period: e.target.value };
                                        setContent({ ...content, pricing: newPlans });
                                    }}
                                />
                            </div>
                            <AdminInput
                                label="Features (comma-separated)"
                                isTextArea
                                rows={3}
                                value={plan.features?.join(', ') || ''}
                                onChange={(e) => {
                                    const newPlans = [...(content.pricing || [])];
                                    newPlans[idx] = { ...newPlans[idx], features: e.target.value.split(',').map(f => f.trim()).filter(Boolean) };
                                    setContent({ ...content, pricing: newPlans });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>
        </div>
    );
}
