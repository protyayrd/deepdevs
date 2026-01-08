'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminCard from '@/app/admin/components/ui/AdminCard';
import AdminButton from '@/app/admin/components/ui/AdminButton';
import AdminInput from '@/app/admin/components/ui/AdminInput';
import ImageUploadField from '@/app/admin/components/ui/ImageUploadField';

interface SeSignContent {
    hero?: { tag?: string; title?: string; description?: string; heroImages?: string[]; ctaText?: string; ctaLink?: string };
    featuredBrands?: Array<{ id?: string; name: string; logo: string }>;
    about?: { title?: string; description?: string; metrics?: Array<{ value: string; label: string }> };
    features?: Array<{ id?: string; icon?: string; title: string; description: string }>;
    workAnywhere?: { title?: string; description?: string; image?: string };
    testimonials?: Array<{ id?: string; content: string; author: string; role?: string; avatar?: string }>;
    downloadCta?: { title?: string; description?: string; image?: string; appStoreUrl?: string; playStoreUrl?: string };
}

export default function SeSignPage() {
    const [content, setContent] = useState<SeSignContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/sesign-content');
                const data = await res.json();
                setContent(data);
            } catch {
                toast.error('Failed to load SeSign content');
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const saveSection = async (section: string, data: any) => {
        try {
            await fetch('/api/sesign-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section, [section]: data })
            });
            toast.success(`${section.replace('_', ' ')} updated!`);
        } catch {
            toast.error(`Error saving ${section}`);
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
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">✍️ SeSign Content</h1>
                <p className="text-gray-500 font-medium">Manage the landing page for the digital signature app.</p>
            </div>

            {/* Hero Section */}
            <AdminCard
                title="Hero Masterpiece"
                description="The core branding, headline, and multi-image mosaic."
                actions={<AdminButton size="sm" onClick={() => saveSection('hero', content.hero)}>Save Hero</AdminButton>}
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="Promotion Tag"
                            value={content.hero?.tag || ''}
                            onChange={(e) => setContent({ ...content, hero: { ...content.hero, tag: e.target.value } })}
                        />
                        <AdminInput
                            label="CTA Button Text"
                            value={content.hero?.ctaText || ''}
                            onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaText: e.target.value } })}
                        />
                    </div>
                    <AdminInput
                        label="Main Title"
                        isTextArea
                        rows={2}
                        value={content.hero?.title || ''}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                    />
                    <AdminInput
                        label="Description"
                        isTextArea
                        rows={3}
                        value={content.hero?.description || ''}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })}
                    />
                    <div className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Hero Image Mosaic</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(content.hero?.heroImages || ['', '', '', '']).map((img, idx) => (
                                <ImageUploadField
                                    key={idx}
                                    value={img}
                                    onChange={(url) => {
                                        const newImages = [...(content.hero?.heroImages || ['', '', '', ''])];
                                        newImages[idx] = url;
                                        setContent({ ...content, hero: { ...content.hero, heroImages: newImages } });
                                    }}
                                    previewSize="sm"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </AdminCard>

            {/* Featured Brands */}
            <AdminCard
                title="Featured Brands"
                description="Trust logos and partner showcases."
                actions={<AdminButton size="sm" onClick={() => saveSection('featured_brands', content.featuredBrands)}>Save Brands</AdminButton>}
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {content.featuredBrands?.map((brand, idx) => (
                        <div key={brand.id || idx} className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-3">
                            <ImageUploadField
                                value={brand.logo}
                                onChange={(url) => {
                                    const newBrands = [...(content.featuredBrands || [])];
                                    newBrands[idx] = { ...newBrands[idx], logo: url };
                                    setContent({ ...content, featuredBrands: newBrands });
                                }}
                                previewSize="sm"
                            />
                            <AdminInput
                                placeholder="Brand Name"
                                value={brand.name}
                                onChange={(e) => {
                                    const newBrands = [...(content.featuredBrands || [])];
                                    newBrands[idx] = { ...newBrands[idx], name: e.target.value };
                                    setContent({ ...content, featuredBrands: newBrands });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Features Section */}
            <AdminCard
                title="App Features"
                description="Key capabilities of the signing platform."
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

            {/* Work Anywhere Section */}
            <AdminCard
                title="Work Anywhere Section"
                description="Cross-platform messaging."
                actions={<AdminButton size="sm" onClick={() => saveSection('work_anywhere', content.workAnywhere)}>Save Section</AdminButton>}
            >
                <div className="space-y-6">
                    <AdminInput
                        label="Title"
                        value={content.workAnywhere?.title || ''}
                        onChange={(e) => setContent({ ...content, workAnywhere: { ...content.workAnywhere, title: e.target.value } })}
                    />
                    <AdminInput
                        label="Description"
                        isTextArea
                        rows={3}
                        value={content.workAnywhere?.description || ''}
                        onChange={(e) => setContent({ ...content, workAnywhere: { ...content.workAnywhere, description: e.target.value } })}
                    />
                    <ImageUploadField
                        label="Section Image"
                        value={content.workAnywhere?.image || ''}
                        onChange={(url) => setContent({ ...content, workAnywhere: { ...content.workAnywhere, image: url } })}
                    />
                </div>
            </AdminCard>

            {/* Download CTA */}
            <AdminCard
                title="Download Call-to-Action"
                description="Final app download section."
                actions={<AdminButton size="sm" onClick={() => saveSection('download_cta', content.downloadCta)}>Save CTA</AdminButton>}
            >
                <div className="space-y-6">
                    <AdminInput
                        label="Title"
                        value={content.downloadCta?.title || ''}
                        onChange={(e) => setContent({ ...content, downloadCta: { ...content.downloadCta, title: e.target.value } })}
                    />
                    <AdminInput
                        label="Description"
                        isTextArea
                        rows={2}
                        value={content.downloadCta?.description || ''}
                        onChange={(e) => setContent({ ...content, downloadCta: { ...content.downloadCta, description: e.target.value } })}
                    />
                    <ImageUploadField
                        label="CTA Image"
                        value={content.downloadCta?.image || ''}
                        onChange={(url) => setContent({ ...content, downloadCta: { ...content.downloadCta, image: url } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="App Store Link"
                            value={content.downloadCta?.appStoreUrl || ''}
                            onChange={(e) => setContent({ ...content, downloadCta: { ...content.downloadCta, appStoreUrl: e.target.value } })}
                        />
                        <AdminInput
                            label="Play Store Link"
                            value={content.downloadCta?.playStoreUrl || ''}
                            onChange={(e) => setContent({ ...content, downloadCta: { ...content.downloadCta, playStoreUrl: e.target.value } })}
                        />
                    </div>
                </div>
            </AdminCard>
        </div>
    );
}
