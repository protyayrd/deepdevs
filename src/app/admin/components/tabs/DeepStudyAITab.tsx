
import React from 'react';
import { toast } from 'react-hot-toast';
import { DeepStudyContent, DeepStudyHero } from '../../types';
import AdminCard from '../ui/AdminCard';
import AdminButton from '../ui/AdminButton';
import AdminInput from '../ui/AdminInput';

interface DeepStudyAITabProps {
    deepStudyContent: DeepStudyContent | null;
    setDeepStudyContent: (content: DeepStudyContent) => void;
}

const DeepStudyAITab: React.FC<DeepStudyAITabProps> = ({ deepStudyContent, setDeepStudyContent }) => {
    if (!deepStudyContent) return null;

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

    return (
        <div className="space-y-8 animate-fade-in-up is-visible pb-20">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">🎓 Deep Study AI</h1>
                <p className="text-gray-500 font-medium">Configure the educational AI platform landing page.</p>
            </div>

            {/* Hero Section */}
            <AdminCard
                title="Academic Hero Layout"
                description="Headline, subtext, and educational platform links."
                actions={<AdminButton size="sm" onClick={() => saveSection('hero', { hero: deepStudyContent.hero })}>Save Hero</AdminButton>}
            >
                <div className="space-y-6">
                    <AdminInput
                        label="Inspirational Title"
                        value={deepStudyContent.hero?.title || ''}
                        onChange={(e) => setDeepStudyContent({ ...deepStudyContent, hero: { ...(deepStudyContent.hero as DeepStudyHero), title: e.target.value } })}
                    />
                    <AdminInput
                        label="Supporting Narrative"
                        isTextArea
                        rows={3}
                        value={deepStudyContent.hero?.subtitle || ''}
                        onChange={(e) => setDeepStudyContent({ ...deepStudyContent, hero: { ...(deepStudyContent.hero as DeepStudyHero), subtitle: e.target.value } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="App Store Link"
                            value={deepStudyContent.hero?.appStoreUrl || ''}
                            onChange={(e) => setDeepStudyContent({ ...deepStudyContent, hero: { ...(deepStudyContent.hero as DeepStudyHero), appStoreUrl: e.target.value } })}
                        />
                        <AdminInput
                            label="Play Store Link"
                            value={deepStudyContent.hero?.playStoreUrl || ''}
                            onChange={(e) => setDeepStudyContent({ ...deepStudyContent, hero: { ...(deepStudyContent.hero as DeepStudyHero), playStoreUrl: e.target.value } })}
                        />
                    </div>
                    <AdminInput
                        label="Hero Perspective Image"
                        value={deepStudyContent.hero?.heroImage || ''}
                        onChange={(e) => setDeepStudyContent({ ...deepStudyContent, hero: { ...(deepStudyContent.hero as DeepStudyHero), heroImage: e.target.value } })}
                    />
                </div>
            </AdminCard>

            {/* Stats Section */}
            <AdminCard
                title="Platform Metrics"
                description="Social proof stats like user count or success rates."
                actions={<AdminButton size="sm" onClick={() => saveSection('stats', { stats: deepStudyContent.stats })}>Save Metrics</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {deepStudyContent.stats?.map((stat, idx) => (
                        <div key={stat.id || idx} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white transition-all group">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <AdminInput
                                        label="Display Value"
                                        placeholder="e.g. 50k+"
                                        value={stat.value}
                                        onChange={(e) => {
                                            const newStats = [...(deepStudyContent.stats || [])];
                                            newStats[idx].value = e.target.value;
                                            setDeepStudyContent({ ...deepStudyContent, stats: newStats });
                                        }}
                                    />
                                    <AdminInput
                                        label="Descriptor"
                                        placeholder="Active Students"
                                        value={stat.label}
                                        onChange={(e) => {
                                            const newStats = [...(deepStudyContent.stats || [])];
                                            newStats[idx].label = e.target.value;
                                            setDeepStudyContent({ ...deepStudyContent, stats: newStats });
                                        }}
                                    />
                                </div>
                                <AdminInput
                                    label="Icon/Illustration (SVG/URL)"
                                    isTextArea
                                    rows={3}
                                    value={stat.icon}
                                    onChange={(e) => {
                                        const newStats = [...(deepStudyContent.stats || [])];
                                        newStats[idx].icon = e.target.value;
                                        setDeepStudyContent({ ...deepStudyContent, stats: newStats });
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Features Section */}
            <AdminCard
                title="AI Powered Capabilities"
                description="Breakdown of how the AI helps students learn faster."
                actions={
                    <AdminButton
                        size="sm"
                        onClick={() => saveSection('features', {
                            features: deepStudyContent.features,
                            featuresHeader: deepStudyContent.featuresHeader
                        })}
                    >
                        Save Features
                    </AdminButton>
                }
            >
                <div className="space-y-8">
                    <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="Section Title"
                            value={deepStudyContent.featuresHeader?.title || ''}
                            onChange={(e) => setDeepStudyContent({ ...deepStudyContent, featuresHeader: { ...deepStudyContent.featuresHeader!, title: e.target.value } })}
                        />
                        <AdminInput
                            label="Section Subtitle"
                            value={deepStudyContent.featuresHeader?.subtitle || ''}
                            onChange={(e) => setDeepStudyContent({ ...deepStudyContent, featuresHeader: { ...deepStudyContent.featuresHeader!, subtitle: e.target.value } })}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deepStudyContent.features?.map((feature, idx) => (
                            <div key={feature.id || idx} className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4">
                                <AdminInput
                                    label="Feature Title"
                                    value={feature.title}
                                    onChange={(e) => {
                                        const newFeatures = [...(deepStudyContent.features || [])];
                                        newFeatures[idx].title = e.target.value;
                                        setDeepStudyContent({ ...deepStudyContent, features: newFeatures });
                                    }}
                                />
                                <AdminInput
                                    label="Insightful Description"
                                    isTextArea
                                    rows={3}
                                    value={feature.description}
                                    onChange={(e) => {
                                        const newFeatures = [...(deepStudyContent.features || [])];
                                        newFeatures[idx].description = e.target.value;
                                        setDeepStudyContent({ ...deepStudyContent, features: newFeatures });
                                    }}
                                />
                                <AdminInput
                                    label="Visual Icon Link"
                                    value={feature.icon}
                                    onChange={(e) => {
                                        const newFeatures = [...(deepStudyContent.features || [])];
                                        newFeatures[idx].icon = e.target.value;
                                        setDeepStudyContent({ ...deepStudyContent, features: newFeatures });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </AdminCard>

            {/* Process Steps */}
            <AdminCard
                title="Learning Journey"
                description="Step-by-step process of using the platform."
                actions={
                    <AdminButton
                        size="sm"
                        onClick={() => saveSection('process_steps', {
                            processSteps: deepStudyContent.processSteps,
                            processHeader: deepStudyContent.processHeader
                        })}
                    >
                        Save Journey
                    </AdminButton>
                }
            >
                <div className="space-y-8">
                    <div className="p-6 rounded-3xl bg-purple-50 border border-purple-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="Process Heading"
                            value={deepStudyContent.processHeader?.title || ''}
                            onChange={(e) => setDeepStudyContent({ ...deepStudyContent, processHeader: { ...deepStudyContent.processHeader!, title: e.target.value } })}
                        />
                        <AdminInput
                            label="Process Tagline"
                            value={deepStudyContent.processHeader?.subtitle || ''}
                            onChange={(e) => setDeepStudyContent({ ...deepStudyContent, processHeader: { ...deepStudyContent.processHeader!, subtitle: e.target.value } })}
                        />
                    </div>
                    <div className="space-y-6">
                        {deepStudyContent.processSteps?.map((step, idx) => (
                            <div key={step.id || idx} className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100 relative overflow-hidden">
                                <span className="absolute -top-4 -right-4 text-9xl font-black text-gray-100/50 select-none">
                                    {idx + 1}
                                </span>
                                <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-4">
                                        <AdminInput
                                            label={`Step ${idx + 1} Label`}
                                            value={step.title}
                                            onChange={(e) => {
                                                const newSteps = [...(deepStudyContent.processSteps || [])];
                                                newSteps[idx].title = e.target.value;
                                                setDeepStudyContent({ ...deepStudyContent, processSteps: newSteps });
                                            }}
                                        />
                                        <AdminInput
                                            label="Step Commentary"
                                            isTextArea
                                            rows={3}
                                            value={step.description}
                                            onChange={(e) => {
                                                const newSteps = [...(deepStudyContent.processSteps || [])];
                                                newSteps[idx].description = e.target.value;
                                                setDeepStudyContent({ ...deepStudyContent, processSteps: newSteps });
                                            }}
                                        />
                                        <AdminInput
                                            label="Action Button Text"
                                            value={step.buttonText}
                                            onChange={(e) => {
                                                const newSteps = [...(deepStudyContent.processSteps || [])];
                                                newSteps[idx].buttonText = e.target.value;
                                                setDeepStudyContent({ ...deepStudyContent, processSteps: newSteps });
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <AdminInput
                                            label="Primary Asset"
                                            value={step.image}
                                            onChange={(e) => {
                                                const newSteps = [...(deepStudyContent.processSteps || [])];
                                                newSteps[idx].image = e.target.value;
                                                setDeepStudyContent({ ...deepStudyContent, processSteps: newSteps });
                                            }}
                                        />
                                        {idx === 2 && (
                                            <AdminInput
                                                label="Floating Overlay"
                                                value={step.overlayImage || ''}
                                                onChange={(e) => {
                                                    const newSteps = [...(deepStudyContent.processSteps || [])];
                                                    newSteps[idx].overlayImage = e.target.value;
                                                    setDeepStudyContent({ ...deepStudyContent, processSteps: newSteps });
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AdminCard>

            {/* Blog Section */}
            <AdminCard
                title="Academic Journal (Blog)"
                description="Showcase insightful articles for your learner community."
                actions={
                    <AdminButton
                        size="sm"
                        onClick={() => saveSection('blog_cards', {
                            blogCards: deepStudyContent.blogCards,
                            blogHeader: deepStudyContent.blogHeader
                        })}
                    >
                        Save Journal
                    </AdminButton>
                }
            >
                <div className="space-y-8">
                    <AdminInput
                        label="Journal Explorer Heading"
                        value={deepStudyContent.blogHeader?.title || ''}
                        onChange={(e) => setDeepStudyContent({ ...deepStudyContent, blogHeader: { ...deepStudyContent.blogHeader!, title: e.target.value } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {deepStudyContent.blogCards?.map((card, idx) => (
                            <div key={card.id || idx} className="p-6 rounded-3xl bg-indigo-50/30 border border-indigo-100 space-y-4">
                                <AdminInput
                                    label="Article Heading"
                                    value={card.title}
                                    onChange={(e) => {
                                        const newBlogs = [...(deepStudyContent.blogCards || [])];
                                        newBlogs[idx].title = e.target.value;
                                        setDeepStudyContent({ ...deepStudyContent, blogCards: newBlogs });
                                    }}
                                />
                                <AdminInput
                                    label="Excerpt"
                                    isTextArea
                                    rows={3}
                                    value={card.description}
                                    onChange={(e) => {
                                        const newBlogs = [...(deepStudyContent.blogCards || [])];
                                        newBlogs[idx].description = e.target.value;
                                        setDeepStudyContent({ ...deepStudyContent, blogCards: newBlogs });
                                    }}
                                />
                                <AdminInput
                                    label="Preview Image URL"
                                    value={card.image}
                                    onChange={(e) => {
                                        const newBlogs = [...(deepStudyContent.blogCards || [])];
                                        newBlogs[idx].image = e.target.value;
                                        setDeepStudyContent({ ...deepStudyContent, blogCards: newBlogs });
                                    }}
                                />
                                <AdminInput
                                    label="Direct Link"
                                    value={card.link}
                                    onChange={(e) => {
                                        const newBlogs = [...(deepStudyContent.blogCards || [])];
                                        newBlogs[idx].link = e.target.value;
                                        setDeepStudyContent({ ...deepStudyContent, blogCards: newBlogs });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </AdminCard>
        </div>
    );
};

export default DeepStudyAITab;
