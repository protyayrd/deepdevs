'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminCard from '@/app/admin/components/ui/AdminCard';
import AdminButton from '@/app/admin/components/ui/AdminButton';
import AdminInput from '@/app/admin/components/ui/AdminInput';
import ImageUploadField from '@/app/admin/components/ui/ImageUploadField';

interface YolerContent {
    hero?: { title?: string; appStoreUrl?: string; playStoreUrl?: string; heroImage?: string; logo?: string };
    featureCards?: Array<{ id?: string; title: string; description: string; icon?: string }>;
    brands?: Array<{ id?: string; name: string; logo: string }>;
    theoryTestApp?: { title?: string; subtitle?: string; description?: string; image?: string; appStoreUrl?: string; playStoreUrl?: string };
    featuresGrid?: Array<{ id?: string; icon?: string; title: string; description: string }>;
    infoSections?: Array<{ id?: string; title: string; description: string; image: string; imagePosition?: string }>;
    downloadCta?: { title?: string; description?: string; image?: string; appStoreUrl?: string; playStoreUrl?: string };
}

export default function YolerPage() {
    const [content, setContent] = useState<YolerContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/yoler-content');
                const data = await res.json();
                setContent(data);
            } catch {
                toast.error('Failed to load Yoler content');
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const saveSection = async (section: string, data: any) => {
        try {
            await fetch('/api/yoler-content', {
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
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">🚗 Yoler Content</h1>
                <p className="text-gray-500 font-medium">Manage the landing page for the Yoler driving assistant app.</p>
            </div>

            {/* Hero Section */}
            <AdminCard
                title="Hero Layout"
                description="Primary headline and store download links."
                actions={<AdminButton size="sm" onClick={() => saveSection('hero', content.hero)}>Save Hero</AdminButton>}
            >
                <div className="space-y-6">
                    <AdminInput
                        label="Main Title"
                        isTextArea
                        rows={2}
                        value={content.hero?.title || ''}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                    />
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
                </div>
            </AdminCard>

            {/* Feature Cards */}
            <AdminCard
                title="Core Features"
                description="The main highlight cards below the hero."
                actions={<AdminButton size="sm" onClick={() => saveSection('feature_cards', content.featureCards)}>Save Features</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.featureCards?.map((card, idx) => (
                        <div key={card.id || idx} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white transition-all space-y-4">
                            <ImageUploadField
                                label="Icon"
                                value={card.icon || ''}
                                onChange={(url) => {
                                    const newCards = [...(content.featureCards || [])];
                                    newCards[idx] = { ...newCards[idx], icon: url };
                                    setContent({ ...content, featureCards: newCards });
                                }}
                                previewSize="sm"
                            />
                            <AdminInput
                                label="Title"
                                value={card.title}
                                onChange={(e) => {
                                    const newCards = [...(content.featureCards || [])];
                                    newCards[idx] = { ...newCards[idx], title: e.target.value };
                                    setContent({ ...content, featureCards: newCards });
                                }}
                            />
                            <AdminInput
                                label="Description"
                                isTextArea
                                rows={2}
                                value={card.description}
                                onChange={(e) => {
                                    const newCards = [...(content.featureCards || [])];
                                    newCards[idx] = { ...newCards[idx], description: e.target.value };
                                    setContent({ ...content, featureCards: newCards });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Brand Logos */}
            <AdminCard
                title="Brand Showcase"
                description="Partner and trust logos."
                actions={<AdminButton size="sm" onClick={() => saveSection('brands', content.brands)}>Save Brands</AdminButton>}
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {content.brands?.map((brand, idx) => (
                        <div key={brand.id || idx} className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-3">
                            <ImageUploadField
                                value={brand.logo}
                                onChange={(url) => {
                                    const newBrands = [...(content.brands || [])];
                                    newBrands[idx] = { ...newBrands[idx], logo: url };
                                    setContent({ ...content, brands: newBrands });
                                }}
                                previewSize="sm"
                            />
                            <AdminInput
                                placeholder="Brand Name"
                                value={brand.name}
                                onChange={(e) => {
                                    const newBrands = [...(content.brands || [])];
                                    newBrands[idx] = { ...newBrands[idx], name: e.target.value };
                                    setContent({ ...content, brands: newBrands });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Theory Test App Section */}
            <AdminCard
                title="Theory Test App Section"
                description="Dedicated section for the theory test app promo."
                actions={<AdminButton size="sm" onClick={() => saveSection('theory_test_app', content.theoryTestApp)}>Save Section</AdminButton>}
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="Title"
                            value={content.theoryTestApp?.title || ''}
                            onChange={(e) => setContent({ ...content, theoryTestApp: { ...content.theoryTestApp, title: e.target.value } })}
                        />
                        <AdminInput
                            label="Subtitle"
                            value={content.theoryTestApp?.subtitle || ''}
                            onChange={(e) => setContent({ ...content, theoryTestApp: { ...content.theoryTestApp, subtitle: e.target.value } })}
                        />
                    </div>
                    <AdminInput
                        label="Description"
                        isTextArea
                        rows={3}
                        value={content.theoryTestApp?.description || ''}
                        onChange={(e) => setContent({ ...content, theoryTestApp: { ...content.theoryTestApp, description: e.target.value } })}
                    />
                    <ImageUploadField
                        label="Section Image"
                        value={content.theoryTestApp?.image || ''}
                        onChange={(url) => setContent({ ...content, theoryTestApp: { ...content.theoryTestApp, image: url } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="App Store Link"
                            value={content.theoryTestApp?.appStoreUrl || ''}
                            onChange={(e) => setContent({ ...content, theoryTestApp: { ...content.theoryTestApp, appStoreUrl: e.target.value } })}
                        />
                        <AdminInput
                            label="Play Store Link"
                            value={content.theoryTestApp?.playStoreUrl || ''}
                            onChange={(e) => setContent({ ...content, theoryTestApp: { ...content.theoryTestApp, playStoreUrl: e.target.value } })}
                        />
                    </div>
                </div>
            </AdminCard>

            {/* Download CTA */}
            <AdminCard
                title="Download Call-to-Action"
                description="Final download section at the bottom of the page."
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
