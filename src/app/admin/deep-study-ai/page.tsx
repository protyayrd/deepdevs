'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminCard from '@/app/admin/components/ui/AdminCard';
import AdminButton from '@/app/admin/components/ui/AdminButton';
import AdminInput from '@/app/admin/components/ui/AdminInput';
import ImageUploadField from '@/app/admin/components/ui/ImageUploadField';

interface DeepStudyContent {
    hero?: { title?: string; subtitle?: string; heroImage?: string; ctaText?: string; ctaLink?: string };
    stats?: Array<{ id?: string; value: string; label: string; icon?: string }>;
    features?: Array<{ id?: string; icon?: string; title: string; description: string }>;
    processSteps?: Array<{ id?: string; number?: number; title: string; description: string; image?: string }>;
    blogPosts?: Array<{ id?: string; title: string; excerpt: string; image?: string; link?: string }>;
}

export default function DeepStudyAIPage() {
    const [content, setContent] = useState<DeepStudyContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/deep-study-content');
                const data = await res.json();
                setContent(data);
            } catch {
                toast.error('Failed to load Deep Study AI content');
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const saveSection = async (section: string, payload: any) => {
        try {
            await fetch('/api/deep-study-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section, ...payload })
            });
            toast.success(`${section.replace('_', ' ')} updated!`);
        } catch {
            toast.error(`Error updating ${section}`);
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
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">🎓 Deep Study AI Content</h1>
                <p className="text-gray-500 font-medium">Manage the landing page for the AI-powered study platform.</p>
            </div>

            {/* Hero Section */}
            <AdminCard
                title="Academic Hero Layout"
                description="Headline, subtext, and educational platform links."
                actions={<AdminButton size="sm" onClick={() => saveSection('hero', { hero: content.hero })}>Save Hero</AdminButton>}
            >
                <div className="space-y-6">
                    <AdminInput
                        label="Inspirational Title"
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
                    <ImageUploadField
                        label="Hero Image"
                        value={content.hero?.heroImage || ''}
                        onChange={(url) => setContent({ ...content, hero: { ...content.hero, heroImage: url } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="CTA Button Text"
                            value={content.hero?.ctaText || ''}
                            onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaText: e.target.value } })}
                        />
                        <AdminInput
                            label="CTA Button Link"
                            value={content.hero?.ctaLink || ''}
                            onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaLink: e.target.value } })}
                        />
                    </div>
                </div>
            </AdminCard>

            {/* Stats Section */}
            <AdminCard
                title="Impact Statistics"
                description="Key numbers that showcase platform success."
                actions={<AdminButton size="sm" onClick={() => saveSection('stats', { stats: content.stats })}>Save Stats</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {content.stats?.map((stat, idx) => (
                        <div key={stat.id || idx} className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-3">
                            <ImageUploadField
                                value={stat.icon || ''}
                                onChange={(url) => {
                                    const newStats = [...(content.stats || [])];
                                    newStats[idx] = { ...newStats[idx], icon: url };
                                    setContent({ ...content, stats: newStats });
                                }}
                                previewSize="sm"
                            />
                            <AdminInput
                                placeholder="Value (e.g. 10K+)"
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
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Features Section */}
            <AdminCard
                title="Platform Features"
                description="Key capabilities of the learning system."
                actions={<AdminButton size="sm" onClick={() => saveSection('features', { features: content.features })}>Save Features</AdminButton>}
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

            {/* Process Steps */}
            <AdminCard
                title="Learning Process Steps"
                description="Step-by-step guide for users."
                actions={<AdminButton size="sm" onClick={() => saveSection('process_steps', { processSteps: content.processSteps })}>Save Steps</AdminButton>}
            >
                <div className="space-y-6">
                    {content.processSteps?.map((step, idx) => (
                        <div key={step.id || idx} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-col lg:flex-row gap-6">
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-black">
                                {idx + 1}
                            </div>
                            <div className="flex-1 space-y-4">
                                <AdminInput
                                    label="Step Title"
                                    value={step.title}
                                    onChange={(e) => {
                                        const newSteps = [...(content.processSteps || [])];
                                        newSteps[idx] = { ...newSteps[idx], title: e.target.value };
                                        setContent({ ...content, processSteps: newSteps });
                                    }}
                                />
                                <AdminInput
                                    label="Description"
                                    isTextArea
                                    rows={2}
                                    value={step.description}
                                    onChange={(e) => {
                                        const newSteps = [...(content.processSteps || [])];
                                        newSteps[idx] = { ...newSteps[idx], description: e.target.value };
                                        setContent({ ...content, processSteps: newSteps });
                                    }}
                                />
                            </div>
                            <ImageUploadField
                                label="Step Image"
                                value={step.image || ''}
                                onChange={(url) => {
                                    const newSteps = [...(content.processSteps || [])];
                                    newSteps[idx] = { ...newSteps[idx], image: url };
                                    setContent({ ...content, processSteps: newSteps });
                                }}
                                previewSize="sm"
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Blog Posts */}
            <AdminCard
                title="Featured Articles"
                description="Blog posts and educational content."
                actions={<AdminButton size="sm" onClick={() => saveSection('blog_posts', { blogPosts: content.blogPosts })}>Save Articles</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.blogPosts?.map((post, idx) => (
                        <div key={post.id || idx} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 space-y-4">
                            <ImageUploadField
                                label="Post Image"
                                value={post.image || ''}
                                onChange={(url) => {
                                    const newPosts = [...(content.blogPosts || [])];
                                    newPosts[idx] = { ...newPosts[idx], image: url };
                                    setContent({ ...content, blogPosts: newPosts });
                                }}
                            />
                            <AdminInput
                                label="Title"
                                value={post.title}
                                onChange={(e) => {
                                    const newPosts = [...(content.blogPosts || [])];
                                    newPosts[idx] = { ...newPosts[idx], title: e.target.value };
                                    setContent({ ...content, blogPosts: newPosts });
                                }}
                            />
                            <AdminInput
                                label="Excerpt"
                                isTextArea
                                rows={2}
                                value={post.excerpt}
                                onChange={(e) => {
                                    const newPosts = [...(content.blogPosts || [])];
                                    newPosts[idx] = { ...newPosts[idx], excerpt: e.target.value };
                                    setContent({ ...content, blogPosts: newPosts });
                                }}
                            />
                            <AdminInput
                                label="Link URL"
                                value={post.link || ''}
                                onChange={(e) => {
                                    const newPosts = [...(content.blogPosts || [])];
                                    newPosts[idx] = { ...newPosts[idx], link: e.target.value };
                                    setContent({ ...content, blogPosts: newPosts });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>
        </div>
    );
}
