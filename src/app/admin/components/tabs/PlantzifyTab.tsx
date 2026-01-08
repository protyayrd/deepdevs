
import React from 'react';
import { toast } from 'react-hot-toast';
import { PlantzifyContent, PlantzifyHero, PlantzifyDownloadCta } from '../../types';
import AdminCard from '../ui/AdminCard';
import AdminButton from '../ui/AdminButton';
import AdminInput from '../ui/AdminInput';

interface PlantzifyTabProps {
    plantzifyContent: PlantzifyContent | null;
    setPlantzifyContent: (content: PlantzifyContent) => void;
}

const PlantzifyTab: React.FC<PlantzifyTabProps> = ({ plantzifyContent, setPlantzifyContent }) => {
    if (!plantzifyContent) return null;

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

    return (
        <div className="space-y-8 animate-fade-in-up is-visible pb-20">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">🌿 Plantzify Content</h1>
                <p className="text-gray-500 font-medium">Manage the landing page for the Plantzify gardening app.</p>
            </div>

            {/* Hero Section */}
            <AdminCard
                title="Lush Hero Design"
                description="The entry point of the page with brand visuals and app links."
                actions={<AdminButton size="sm" onClick={() => saveSection('hero', plantzifyContent.hero)}>Save Hero</AdminButton>}
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="Warm Welcome Text"
                            value={plantzifyContent.hero?.welcomeText || ''}
                            onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), welcomeText: e.target.value } })}
                            placeholder="e.g. GROW YOUR OWN OASIS"
                        />
                        <AdminInput
                            label="App Logo URL"
                            value={plantzifyContent.hero?.logo || ''}
                            onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), logo: e.target.value } })}
                        />
                    </div>
                    <AdminInput
                        label="Main Headline"
                        isTextArea
                        rows={2}
                        value={plantzifyContent.hero?.title || ''}
                        onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), title: e.target.value } })}
                    />
                    <AdminInput
                        label="Supporting Subtitle"
                        isTextArea
                        rows={2}
                        value={plantzifyContent.hero?.subtitle || ''}
                        onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), subtitle: e.target.value } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="App Store Link"
                            value={plantzifyContent.hero?.appStoreUrl || ''}
                            onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), appStoreUrl: e.target.value } })}
                        />
                        <AdminInput
                            label="Play Store Link"
                            value={plantzifyContent.hero?.playStoreUrl || ''}
                            onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), playStoreUrl: e.target.value } })}
                        />
                    </div>
                    <AdminInput
                        label="Hero Background Image URL"
                        value={plantzifyContent.hero?.heroImage || ''}
                        onChange={(e) => setPlantzifyContent({ ...plantzifyContent, hero: { ...(plantzifyContent.hero as PlantzifyHero), heroImage: e.target.value } })}
                    />
                </div>
            </AdminCard>

            {/* Features Section */}
            <AdminCard
                title="Green Features"
                description="Highlighting the best parts of the gardening experience."
                actions={<AdminButton size="sm" onClick={() => saveSection('features', plantzifyContent.features)}>Save Features</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plantzifyContent.features?.map((feature, idx) => (
                        <div key={feature.id || idx} className="p-6 rounded-3xl bg-emerald-50/30 border border-emerald-100 hover:bg-white transition-all group">
                            <div className="space-y-4">
                                <AdminInput
                                    label={`Feature ${idx + 1} Name`}
                                    value={feature.title}
                                    onChange={(e) => {
                                        const newFeatures = [...(plantzifyContent.features || [])];
                                        newFeatures[idx].title = e.target.value;
                                        setPlantzifyContent({ ...plantzifyContent, features: newFeatures });
                                    }}
                                />
                                <AdminInput
                                    label="Description"
                                    isTextArea
                                    rows={2}
                                    value={feature.description}
                                    onChange={(e) => {
                                        const newFeatures = [...(plantzifyContent.features || [])];
                                        newFeatures[idx].description = e.target.value;
                                        setPlantzifyContent({ ...plantzifyContent, features: newFeatures });
                                    }}
                                />
                                <AdminInput
                                    label="Icon/Illustration URL"
                                    value={feature.icon}
                                    onChange={(e) => {
                                        const newFeatures = [...(plantzifyContent.features || [])];
                                        newFeatures[idx].icon = e.target.value;
                                        setPlantzifyContent({ ...plantzifyContent, features: newFeatures });
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Problem/Solution Info Sections */}
            <AdminCard
                title="Case Study Sections"
                description="Narrative flow showing how the app solves gardening woes."
                actions={<AdminButton size="sm" onClick={() => saveSection('problem_solution', plantzifyContent.problemSolution)}>Save Case Studies</AdminButton>}
            >
                <div className="space-y-8">
                    {plantzifyContent.problemSolution?.map((item, idx) => (
                        <div key={item.id} className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100 relative group">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-4">
                                    <AdminInput
                                        label="Heading"
                                        value={item.title}
                                        onChange={(e) => {
                                            const newItems = [...(plantzifyContent.problemSolution || [])];
                                            newItems[idx].title = e.target.value;
                                            setPlantzifyContent({ ...plantzifyContent, problemSolution: newItems });
                                        }}
                                    />
                                    <AdminInput
                                        label="Narrative Description"
                                        isTextArea
                                        rows={4}
                                        value={item.description}
                                        onChange={(e) => {
                                            const newItems = [...(plantzifyContent.problemSolution || [])];
                                            newItems[idx].description = e.target.value;
                                            setPlantzifyContent({ ...plantzifyContent, problemSolution: newItems });
                                        }}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div className="aspect-video bg-white rounded-2xl border border-gray-100 overflow-hidden flex items-center justify-center p-4">
                                        <img src={item.image} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <AdminInput
                                        label="Asset URL"
                                        value={item.image}
                                        onChange={(e) => {
                                            const newItems = [...(plantzifyContent.problemSolution || [])];
                                            newItems[idx].image = e.target.value;
                                            setPlantzifyContent({ ...plantzifyContent, problemSolution: newItems });
                                        }}
                                    />
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-semibold text-gray-700 ml-1">Composition</label>
                                        <select
                                            value={item.imagePosition}
                                            onChange={(e) => {
                                                const newItems = [...(plantzifyContent.problemSolution || [])];
                                                newItems[idx].imagePosition = e.target.value as 'left' | 'right';
                                                setPlantzifyContent({ ...plantzifyContent, problemSolution: newItems });
                                            }}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-gray-700"
                                        >
                                            <option value="left">🖼️ Image Left, Text Right</option>
                                            <option value="right">📝 Text Left, Image Right</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Gallery */}
            <AdminCard
                title="Lush Plant Gallery"
                description="Visual inspiration showcasing various plant species."
                actions={<AdminButton size="sm" onClick={() => saveSection('gallery', plantzifyContent.gallery)}>Save Gallery</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plantzifyContent.gallery?.map((img, idx) => (
                        <div key={img.id || idx} className="p-4 rounded-3xl bg-gray-50/50 border border-gray-100 group">
                            <div className="aspect-[4/3] bg-white rounded-2xl mb-4 overflow-hidden shadow-sm ring-1 ring-gray-100">
                                <img src={img.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="preview" />
                            </div>
                            <div className="space-y-3">
                                <AdminInput
                                    placeholder="Image URL"
                                    value={img.imageUrl}
                                    onChange={(e) => {
                                        const newGallery = [...(plantzifyContent.gallery || [])];
                                        newGallery[idx].imageUrl = e.target.value;
                                        setPlantzifyContent({ ...plantzifyContent, gallery: newGallery });
                                    }}
                                />
                                <AdminInput
                                    placeholder="Alt Text (SEO)"
                                    value={img.altText}
                                    onChange={(e) => {
                                        const newGallery = [...(plantzifyContent.gallery || [])];
                                        newGallery[idx].altText = e.target.value;
                                        setPlantzifyContent({ ...plantzifyContent, gallery: newGallery });
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Blog Section */}
            <AdminCard
                title="Gardening Wisdom (Blog)"
                description="Latest articles and tips for plant parents."
                actions={<AdminButton size="sm" onClick={() => saveSection('blog', plantzifyContent.blog)}>Save Blog Posts</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plantzifyContent.blog?.map((post, idx) => (
                        <div key={post.id || idx} className="p-6 rounded-3xl bg-indigo-50/30 border border-indigo-100 group">
                            <div className="aspect-video bg-white rounded-2xl mb-4 overflow-hidden border border-indigo-100">
                                <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="space-y-4">
                                <AdminInput
                                    label="Article Title"
                                    value={post.title}
                                    onChange={(e) => {
                                        const newBlog = [...(plantzifyContent.blog || [])];
                                        newBlog[idx].title = e.target.value;
                                        setPlantzifyContent({ ...plantzifyContent, blog: newBlog });
                                    }}
                                />
                                <AdminInput
                                    label="Snippet"
                                    isTextArea
                                    rows={2}
                                    value={post.description}
                                    onChange={(e) => {
                                        const newBlog = [...(plantzifyContent.blog || [])];
                                        newBlog[idx].description = e.target.value;
                                        setPlantzifyContent({ ...plantzifyContent, blog: newBlog });
                                    }}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <AdminInput
                                        label="Date"
                                        placeholder="oct 24, 2023"
                                        value={post.date}
                                        onChange={(e) => {
                                            const newBlog = [...(plantzifyContent.blog || [])];
                                            newBlog[idx].date = e.target.value;
                                            setPlantzifyContent({ ...plantzifyContent, blog: newBlog });
                                        }}
                                    />
                                    <AdminInput
                                        label="Read Time"
                                        placeholder="5 min"
                                        value={post.readTime}
                                        onChange={(e) => {
                                            const newBlog = [...(plantzifyContent.blog || [])];
                                            newBlog[idx].readTime = e.target.value;
                                            setPlantzifyContent({ ...plantzifyContent, blog: newBlog });
                                        }}
                                    />
                                </div>
                                <AdminInput
                                    label="Cover Image"
                                    value={post.image}
                                    onChange={(e) => {
                                        const newBlog = [...(plantzifyContent.blog || [])];
                                        newBlog[idx].image = e.target.value;
                                        setPlantzifyContent({ ...plantzifyContent, blog: newBlog });
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Testimonials */}
            <AdminCard
                title="Happy Gardeners"
                description="What users are saying about Plantzify."
                actions={<AdminButton size="sm" onClick={() => saveSection('testimonials', plantzifyContent.testimonials)}>Save Stories</AdminButton>}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {plantzifyContent.testimonials?.map((t, idx) => (
                        <div key={idx} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col md:flex-row gap-6">
                            <div className="flex-shrink-0">
                                {t.avatar ? (
                                    <img src={t.avatar} className="w-14 h-14 rounded-2xl object-cover shadow-sm ring-4 ring-white" />
                                ) : (
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-lg font-black uppercase">
                                        {t.name[0]}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <AdminInput
                                        label="Name"
                                        value={t.name}
                                        onChange={(e) => {
                                            const newTestimonials = [...(plantzifyContent.testimonials || [])];
                                            newTestimonials[idx].name = e.target.value;
                                            setPlantzifyContent({ ...plantzifyContent, testimonials: newTestimonials });
                                        }}
                                    />
                                    <AdminInput
                                        label="Score"
                                        type="number"
                                        step="0.5"
                                        value={t.rating}
                                        onChange={(e) => {
                                            const newTestimonials = [...(plantzifyContent.testimonials || [])];
                                            newTestimonials[idx].rating = parseFloat(e.target.value);
                                            setPlantzifyContent({ ...plantzifyContent, testimonials: newTestimonials });
                                        }}
                                    />
                                </div>
                                <AdminInput
                                    label="Review Content"
                                    isTextArea
                                    rows={2}
                                    value={t.text}
                                    onChange={(e) => {
                                        const newTestimonials = [...(plantzifyContent.testimonials || [])];
                                        newTestimonials[idx].text = e.target.value;
                                        setPlantzifyContent({ ...plantzifyContent, testimonials: newTestimonials });
                                    }}
                                />
                                <AdminInput
                                    label="User Image"
                                    value={t.avatar}
                                    onChange={(e) => {
                                        const newTestimonials = [...(plantzifyContent.testimonials || [])];
                                        newTestimonials[idx].avatar = e.target.value;
                                        setPlantzifyContent({ ...plantzifyContent, testimonials: newTestimonials });
                                    }}
                                />
                                <AdminButton
                                    variant="ghost"
                                    size="sm"
                                    className="text-rose-500 font-bold self-end"
                                    onClick={() => {
                                        const newTestimonials = [...(plantzifyContent.testimonials || [])];
                                        newTestimonials.splice(idx, 1);
                                        setPlantzifyContent({ ...plantzifyContent, testimonials: newTestimonials });
                                    }}
                                >
                                    Delete
                                </AdminButton>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newTestimonials = [...(plantzifyContent.testimonials || []), { text: 'New Review', name: 'New User', avatar: '', rating: 5 }];
                            setPlantzifyContent({ ...plantzifyContent, testimonials: newTestimonials });
                        }}
                        className="col-span-full py-6 border-4 border-dashed border-emerald-50 text-emerald-300 font-black rounded-3xl hover:border-emerald-100 hover:text-emerald-500 transition-all uppercase tracking-widest text-sm"
                    >
                        + NEW TESTIMONIAL
                    </button>
                </div>
            </AdminCard>

            {/* Download CTA */}
            <AdminCard
                title="Concluding App Promo"
                description="Final nudge for users to download the app."
                actions={<AdminButton size="sm" onClick={() => saveSection('download_cta', plantzifyContent.downloadCta)}>Save Promotion</AdminButton>}
            >
                <div className="space-y-6">
                    <AdminInput
                        label="CTA Heading"
                        value={plantzifyContent.downloadCta?.title || ''}
                        onChange={(e) => setPlantzifyContent({ ...plantzifyContent, downloadCta: { ...(plantzifyContent.downloadCta as PlantzifyDownloadCta), title: e.target.value } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="App Store Redirect"
                            value={plantzifyContent.downloadCta?.appStoreUrl || ''}
                            onChange={(e) => setPlantzifyContent({ ...plantzifyContent, downloadCta: { ...(plantzifyContent.downloadCta as PlantzifyDownloadCta), appStoreUrl: e.target.value } })}
                        />
                        <AdminInput
                            label="Play Store Redirect"
                            value={plantzifyContent.downloadCta?.playStoreUrl || ''}
                            onChange={(e) => setPlantzifyContent({ ...plantzifyContent, downloadCta: { ...(plantzifyContent.downloadCta as PlantzifyDownloadCta), playStoreUrl: e.target.value } })}
                        />
                    </div>
                    <AdminInput
                        label="Floating Phone Image"
                        value={plantzifyContent.downloadCta?.phoneImage || ''}
                        onChange={(e) => setPlantzifyContent({ ...plantzifyContent, downloadCta: { ...(plantzifyContent.downloadCta as PlantzifyDownloadCta), phoneImage: e.target.value } })}
                    />
                </div>
            </AdminCard>
        </div>
    );
};

export default PlantzifyTab;
