'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminCard from '@/app/admin/components/ui/AdminCard';
import AdminButton from '@/app/admin/components/ui/AdminButton';
import AdminInput from '@/app/admin/components/ui/AdminInput';
import ImageUploadField from '@/app/admin/components/ui/ImageUploadField';

interface AppsHero {
    tag?: string;
    title?: string;
    description?: string;
    heroImage?: string;
    buttonText?: string;
    buttonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
}

interface AppsContent {
    hero?: AppsHero;
}

export default function AppsPageContentPage() {
    const [content, setContent] = useState<AppsContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/content?page=apps');
                const data = await res.json();
                setContent({
                    hero: Array.isArray(data) ? data.find((c: any) => c.section === 'hero')?.content : null
                });
            } catch {
                toast.error('Failed to load apps content');
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const saveHero = async () => {
        try {
            await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page: 'apps', section: 'hero', content: content?.hero })
            });
            toast.success('Hero updated!');
        } catch { toast.error('Failed to update hero'); }
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
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">✨ Apps Landing Page</h1>
                <p className="text-gray-500 font-medium">Customize the top-level section of your applications showcase.</p>
            </div>

            <AdminCard
                title="Hero Section Configuration"
                description="Control the primary messaging and visuals on the apps landing page."
                actions={
                    <AdminButton size="sm" onClick={saveHero}>
                        Save Hero Changes
                    </AdminButton>
                }
            >
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="Tagline / Eyebrow"
                            value={content?.hero?.tag || ''}
                            onChange={(e) => setContent(prev => ({ ...prev, hero: { ...prev?.hero, tag: e.target.value } }))}
                            placeholder="e.g. Innovation in every pixel"
                        />
                    </div>

                    <AdminInput
                        label="Main Heading"
                        isTextArea
                        rows={2}
                        value={content?.hero?.title || ''}
                        onChange={(e) => setContent(prev => ({ ...prev, hero: { ...prev?.hero, title: e.target.value } }))}
                        placeholder="We build the future of..."
                        helperText="HTML tags for styling are permitted."
                    />

                    <AdminInput
                        label="Supporting Narrative"
                        isTextArea
                        rows={3}
                        value={content?.hero?.description || ''}
                        onChange={(e) => setContent(prev => ({ ...prev, hero: { ...prev?.hero, description: e.target.value } }))}
                        placeholder="Detailed explanation of your offerings..."
                    />

                    <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
                        <ImageUploadField
                            label="Hero Image / Mockup"
                            value={content?.hero?.heroImage || ''}
                            onChange={(url) => setContent(prev => ({ ...prev, hero: { ...prev?.hero, heroImage: url } }))}
                            placeholder="Upload or paste hero image URL"
                            previewSize="lg"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
                        <div className="space-y-4">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Primary Interaction</h4>
                            <div className="space-y-3">
                                <AdminInput
                                    placeholder="Button Label"
                                    value={content?.hero?.buttonText || ''}
                                    onChange={(e) => setContent(prev => ({ ...prev, hero: { ...prev?.hero, buttonText: e.target.value } }))}
                                />
                                <AdminInput
                                    placeholder="Button Link URL"
                                    value={content?.hero?.buttonLink || ''}
                                    onChange={(e) => setContent(prev => ({ ...prev, hero: { ...prev?.hero, buttonLink: e.target.value } }))}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Secondary Interaction</h4>
                            <div className="space-y-3">
                                <AdminInput
                                    placeholder="Button Label"
                                    value={content?.hero?.secondaryButtonText || ''}
                                    onChange={(e) => setContent(prev => ({ ...prev, hero: { ...prev?.hero, secondaryButtonText: e.target.value } }))}
                                />
                                <AdminInput
                                    placeholder="Button Link URL"
                                    value={content?.hero?.secondaryButtonLink || ''}
                                    onChange={(e) => setContent(prev => ({ ...prev, hero: { ...prev?.hero, secondaryButtonLink: e.target.value } }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AdminCard>
        </div>
    );
}
