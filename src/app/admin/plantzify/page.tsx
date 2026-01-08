'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminCard from '@/app/admin/components/ui/AdminCard';
import AdminButton from '@/app/admin/components/ui/AdminButton';
import AdminInput from '@/app/admin/components/ui/AdminInput';
import ImageUploadField from '@/app/admin/components/ui/ImageUploadField';

interface PlantzifyContent {
    hero?: { welcomeText?: string; title?: string; description?: string; heroImage?: string; appStoreUrl?: string; playStoreUrl?: string };
    features?: Array<{ id?: string; icon?: string; title: string; description: string }>;
    problemSolution?: { problemTitle?: string; problemDescription?: string; problemImage?: string; solutionTitle?: string; solutionDescription?: string; solutionImage?: string };
    gallery?: Array<{ id?: string; image: string; caption?: string }>;
    testimonials?: Array<{ id?: string; content: string; author: string; role?: string; avatar?: string }>;
    downloadCta?: { title?: string; description?: string; image?: string; appStoreUrl?: string; playStoreUrl?: string };
}

export default function PlantzifyPage() {
    const [content, setContent] = useState<PlantzifyContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/plantzify-content');
                const data = await res.json();
                setContent(data);
            } catch {
                toast.error('Failed to load Plantzify content');
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const saveSection = async (section: string, data: any) => {
        try {
            await fetch('/api/plantzify-content', {
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
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">🌿 Plantzify Content</h1>
                <p className="text-gray-500 font-medium">Manage the landing page for the Plantzify plant care app.</p>
            </div>

            {/* Hero Section */}
            <AdminCard
                title="Lush Hero Design"
                description="The entry point of the page with brand visuals and app links."
                actions={<AdminButton size="sm" onClick={() => saveSection('hero', content.hero)}>Save Hero</AdminButton>}
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="Welcome Text"
                            value={content.hero?.welcomeText || ''}
                            onChange={(e) => setContent({ ...content, hero: { ...content.hero, welcomeText: e.target.value } })}
                        />
                        <AdminInput
                            label="Main Title"
                            value={content.hero?.title || ''}
                            onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                        />
                    </div>
                    <AdminInput
                        label="Description"
                        isTextArea
                        rows={3}
                        value={content.hero?.description || ''}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })}
                    />
                    <ImageUploadField
                        label="Hero Image"
                        value={content.hero?.heroImage || ''}
                        onChange={(url) => setContent({ ...content, hero: { ...content.hero, heroImage: url } })}
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
                </div>
            </AdminCard>

            {/* Features Section */}
            <AdminCard
                title="Key Features"
                description="Highlight the main capabilities of the app."
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

            {/* Problem/Solution Section */}
            <AdminCard
                title="Problem & Solution"
                description="Before/after narrative for user conversion."
                actions={<AdminButton size="sm" onClick={() => saveSection('problem_solution', content.problemSolution)}>Save Section</AdminButton>}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4 p-6 rounded-3xl bg-red-50/30 border border-red-100">
                        <h4 className="font-bold text-red-600 uppercase tracking-widest text-xs">The Problem</h4>
                        <AdminInput
                            label="Title"
                            value={content.problemSolution?.problemTitle || ''}
                            onChange={(e) => setContent({ ...content, problemSolution: { ...content.problemSolution, problemTitle: e.target.value } })}
                        />
                        <AdminInput
                            label="Description"
                            isTextArea
                            rows={3}
                            value={content.problemSolution?.problemDescription || ''}
                            onChange={(e) => setContent({ ...content, problemSolution: { ...content.problemSolution, problemDescription: e.target.value } })}
                        />
                        <ImageUploadField
                            label="Image"
                            value={content.problemSolution?.problemImage || ''}
                            onChange={(url) => setContent({ ...content, problemSolution: { ...content.problemSolution, problemImage: url } })}
                        />
                    </div>
                    <div className="space-y-4 p-6 rounded-3xl bg-green-50/30 border border-green-100">
                        <h4 className="font-bold text-green-600 uppercase tracking-widest text-xs">The Solution</h4>
                        <AdminInput
                            label="Title"
                            value={content.problemSolution?.solutionTitle || ''}
                            onChange={(e) => setContent({ ...content, problemSolution: { ...content.problemSolution, solutionTitle: e.target.value } })}
                        />
                        <AdminInput
                            label="Description"
                            isTextArea
                            rows={3}
                            value={content.problemSolution?.solutionDescription || ''}
                            onChange={(e) => setContent({ ...content, problemSolution: { ...content.problemSolution, solutionDescription: e.target.value } })}
                        />
                        <ImageUploadField
                            label="Image"
                            value={content.problemSolution?.solutionImage || ''}
                            onChange={(url) => setContent({ ...content, problemSolution: { ...content.problemSolution, solutionImage: url } })}
                        />
                    </div>
                </div>
            </AdminCard>

            {/* Download CTA */}
            <AdminCard
                title="Download Call-to-Action"
                description="Final download section."
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
                </div>
            </AdminCard>
        </div>
    );
}
