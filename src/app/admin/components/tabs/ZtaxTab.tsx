
import React from 'react';
import { toast } from 'react-hot-toast';
import { ZtaxContent, ZtaxHero, ZtaxPowerfulFeatures, ZtaxPricing } from '../../types';
import AdminCard from '../ui/AdminCard';
import AdminButton from '../ui/AdminButton';
import AdminInput from '../ui/AdminInput';

interface ZtaxTabProps {
    ztaxContent: ZtaxContent | null;
    setZtaxContent: (content: ZtaxContent) => void;
}

const ZtaxTab: React.FC<ZtaxTabProps> = ({ ztaxContent, setZtaxContent }) => {
    if (!ztaxContent) return null;

    const saveSection = async (section: string, data: any) => {
        try {
            await fetch('/api/ztax-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section, [section]: data })
            });
            toast.success(`${section.replace('_', ' ')} updated!`);
        } catch {
            toast.error(`Error saving ${section}`);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up is-visible pb-20">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">💰 Ztax Management</h1>
                <p className="text-gray-500 font-medium">Control the content for the Ztax financial app landing page.</p>
            </div>

            {/* Hero Section */}
            <AdminCard
                title="Financial Hero Layout"
                description="Headline, subtext, and store links for the Ztax app."
                actions={<AdminButton size="sm" onClick={() => saveSection('hero', ztaxContent.hero)}>Save Hero</AdminButton>}
            >
                <div className="space-y-6">
                    <AdminInput
                        label="Main Title"
                        value={ztaxContent.hero?.title || ''}
                        onChange={(e) => setZtaxContent({ ...ztaxContent, hero: { ...(ztaxContent.hero as ZtaxHero), title: e.target.value } })}
                    />
                    <AdminInput
                        label="Subtitle / Value Prop"
                        isTextArea
                        rows={2}
                        value={ztaxContent.hero?.subtitle || ''}
                        onChange={(e) => setZtaxContent({ ...ztaxContent, hero: { ...(ztaxContent.hero as ZtaxHero), subtitle: e.target.value } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="App Store Link"
                            value={ztaxContent.hero?.appStoreUrl || ''}
                            onChange={(e) => setZtaxContent({ ...ztaxContent, hero: { ...(ztaxContent.hero as ZtaxHero), appStoreUrl: e.target.value } })}
                        />
                        <AdminInput
                            label="Play Store Link"
                            value={ztaxContent.hero?.playStoreUrl || ''}
                            onChange={(e) => setZtaxContent({ ...ztaxContent, hero: { ...(ztaxContent.hero as ZtaxHero), playStoreUrl: e.target.value } })}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="Perspective Device Image"
                            value={ztaxContent.hero?.heroImage || ''}
                            onChange={(e) => setZtaxContent({ ...ztaxContent, hero: { ...(ztaxContent.hero as ZtaxHero), heroImage: e.target.value } })}
                        />
                        <AdminInput
                            label="Brand Logo"
                            value={ztaxContent.hero?.logo || ''}
                            onChange={(e) => setZtaxContent({ ...ztaxContent, hero: { ...(ztaxContent.hero as ZtaxHero), logo: e.target.value } })}
                        />
                    </div>
                </div>
            </AdminCard>

            {/* Stats Section */}
            <AdminCard
                title="Impact Statistics"
                description="Numerical data points showing app success."
                actions={<AdminButton size="sm" onClick={() => saveSection('stats', ztaxContent.stats)}>Save Stats</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ztaxContent.stats?.map((stat, idx) => (
                        <div key={stat.id || idx} style={{ backgroundColor: stat.backgroundColor + '10', borderColor: stat.backgroundColor + '30' }} className="p-6 rounded-3xl border space-y-4">
                            <AdminInput
                                label="Metric Number"
                                value={stat.number}
                                onChange={(e) => {
                                    const newStats = [...(ztaxContent.stats || [])];
                                    newStats[idx].number = e.target.value;
                                    setZtaxContent({ ...ztaxContent, stats: newStats });
                                }}
                            />
                            <AdminInput
                                label="Description"
                                value={stat.text}
                                onChange={(e) => {
                                    const newStats = [...(ztaxContent.stats || [])];
                                    newStats[idx].text = e.target.value;
                                    setZtaxContent({ ...ztaxContent, stats: newStats });
                                }}
                            />
                            <AdminInput
                                label="Theme Color (HEX)"
                                value={stat.backgroundColor}
                                onChange={(e) => {
                                    const newStats = [...(ztaxContent.stats || [])];
                                    newStats[idx].backgroundColor = e.target.value;
                                    setZtaxContent({ ...ztaxContent, stats: newStats });
                                }}
                                placeholder="#92C9E6"
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Features Section */}
            <AdminCard
                title="Feature Showcase"
                description="Detailed grid of the Ztax app advantages."
                actions={<AdminButton size="sm" onClick={() => saveSection('features', ztaxContent.features)}>Save Features</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ztaxContent.features?.map((feature, idx) => (
                        <div key={feature.id || idx} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 space-y-4">
                            <AdminInput
                                label="Feature Header"
                                value={feature.title}
                                onChange={(e) => {
                                    const newFeatures = [...(ztaxContent.features || [])];
                                    newFeatures[idx].title = e.target.value;
                                    setZtaxContent({ ...ztaxContent, features: newFeatures });
                                }}
                            />
                            <AdminInput
                                label="In-depth Explanation"
                                isTextArea
                                rows={2}
                                value={feature.description}
                                onChange={(e) => {
                                    const newFeatures = [...(ztaxContent.features || [])];
                                    newFeatures[idx].description = e.target.value;
                                    setZtaxContent({ ...ztaxContent, features: newFeatures });
                                }}
                            />
                            <AdminInput
                                label="Icon Resource URL"
                                value={feature.icon}
                                onChange={(e) => {
                                    const newFeatures = [...(ztaxContent.features || [])];
                                    newFeatures[idx].icon = e.target.value;
                                    setZtaxContent({ ...ztaxContent, features: newFeatures });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Powerful Features Section */}
            <AdminCard
                title="The Powerful Timeline"
                description="Animated step-by-step feature progression."
                actions={<AdminButton size="sm" onClick={() => saveSection('powerful_features', ztaxContent.powerfulFeatures)}>Save Timeline</AdminButton>}
            >
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl bg-indigo-50/30 border border-indigo-100">
                        <AdminInput
                            label="Section Heading"
                            value={ztaxContent.powerfulFeatures?.title || ''}
                            onChange={(e) => setZtaxContent({ ...ztaxContent, powerfulFeatures: { ...(ztaxContent.powerfulFeatures as ZtaxPowerfulFeatures), title: e.target.value } })}
                        />
                        <AdminInput
                            label="Phone Image URL"
                            value={ztaxContent.powerfulFeatures?.phoneImage || ''}
                            onChange={(e) => setZtaxContent({ ...ztaxContent, powerfulFeatures: { ...(ztaxContent.powerfulFeatures as ZtaxPowerfulFeatures), phoneImage: e.target.value } })}
                        />
                        <AdminInput
                            className="md:col-span-2"
                            label="Section Tagline"
                            isTextArea
                            rows={2}
                            value={ztaxContent.powerfulFeatures?.subtitle || ''}
                            onChange={(e) => setZtaxContent({ ...ztaxContent, powerfulFeatures: { ...(ztaxContent.powerfulFeatures as ZtaxPowerfulFeatures), subtitle: e.target.value } })}
                        />
                    </div>
                    <div className="space-y-6">
                        {ztaxContent.powerfulFeatures?.steps?.map((step, idx) => (
                            <div key={step.id || idx} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 relative overflow-hidden group">
                                <span className="absolute -top-4 -right-4 text-8xl font-black text-gray-200/30 group-hover:text-indigo-200/50 transition-colors pointer-events-none">
                                    0{idx + 1}
                                </span>
                                <div className="relative space-y-4">
                                    <AdminInput
                                        label={`Step ${idx + 1}: Action Title`}
                                        value={step.title}
                                        onChange={(e) => {
                                            const newSteps = [...(ztaxContent.powerfulFeatures?.steps || [])];
                                            newSteps[idx].title = e.target.value;
                                            setZtaxContent({ ...ztaxContent, powerfulFeatures: { ...(ztaxContent.powerfulFeatures as ZtaxPowerfulFeatures), steps: newSteps } });
                                        }}
                                    />
                                    <AdminInput
                                        label="Action Narrative"
                                        isTextArea
                                        rows={2}
                                        value={step.description}
                                        onChange={(e) => {
                                            const newSteps = [...(ztaxContent.powerfulFeatures?.steps || [])];
                                            newSteps[idx].description = e.target.value;
                                            setZtaxContent({ ...ztaxContent, powerfulFeatures: { ...(ztaxContent.powerfulFeatures as ZtaxPowerfulFeatures), steps: newSteps } });
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AdminCard>

            {/* Testimonials */}
            <AdminCard
                title="Wealth Narratives"
                description="What users are saying about Ztax."
                actions={<AdminButton size="sm" onClick={() => saveSection('testimonials', ztaxContent.testimonials)}>Save Feedback</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ztaxContent.testimonials?.map((t, idx) => (
                        <div key={t.id || idx} className="p-8 rounded-[2rem] bg-indigo-50/20 border border-indigo-100 flex flex-col gap-6">
                            <AdminInput
                                label="Full Name"
                                value={t.authorName}
                                onChange={(e) => {
                                    const newTestimonials = [...(ztaxContent.testimonials || [])];
                                    newTestimonials[idx].authorName = e.target.value;
                                    setZtaxContent({ ...ztaxContent, testimonials: newTestimonials });
                                }}
                            />
                            <AdminInput
                                label="Designation / Role"
                                value={t.authorRole}
                                onChange={(e) => {
                                    const newTestimonials = [...(ztaxContent.testimonials || [])];
                                    newTestimonials[idx].authorRole = e.target.value;
                                    setZtaxContent({ ...ztaxContent, testimonials: newTestimonials });
                                }}
                            />
                            <AdminInput
                                label="Pro-User Avatar URL"
                                value={t.avatar}
                                onChange={(e) => {
                                    const newTestimonials = [...(ztaxContent.testimonials || [])];
                                    newTestimonials[idx].avatar = e.target.value;
                                    setZtaxContent({ ...ztaxContent, testimonials: newTestimonials });
                                }}
                            />
                            <AdminInput
                                label="User Advocacy Quote"
                                isTextArea
                                rows={3}
                                value={t.quote}
                                onChange={(e) => {
                                    const newTestimonials = [...(ztaxContent.testimonials || [])];
                                    newTestimonials[idx].quote = e.target.value;
                                    setZtaxContent({ ...ztaxContent, testimonials: newTestimonials });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Pricing */}
            <AdminCard
                title="Investment Plans"
                description="Configure the pricing tiers for Ztax users."
                actions={<AdminButton size="sm" onClick={() => saveSection('pricing', ztaxContent.pricing)}>Save Pricing</AdminButton>}
            >
                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl bg-gray-50 border border-gray-100">
                        <AdminInput
                            label="Tiered Pricing Heading"
                            value={ztaxContent.pricing?.title || ''}
                            onChange={(e) => setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), title: e.target.value } })}
                        />
                        <AdminInput
                            label="Tagline"
                            value={ztaxContent.pricing?.subtitle || ''}
                            onChange={(e) => setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), subtitle: e.target.value } })}
                        />
                        <AdminInput
                            className="md:col-span-2"
                            label="Introductory Description"
                            isTextArea
                            rows={2}
                            value={ztaxContent.pricing?.description || ''}
                            onChange={(e) => setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), description: e.target.value } })}
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {ztaxContent.pricing?.plans?.map((plan, idx) => (
                            <div key={plan.id || idx} className="p-8 rounded-[2rem] bg-indigo-600 text-white shadow-xl shadow-indigo-200 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <AdminInput
                                        label="Plan Label"
                                        labelClassName="text-indigo-100"
                                        className="bg-indigo-500/30 border-indigo-400 focus:ring-white placeholder-indigo-300"
                                        value={plan.name}
                                        onChange={(e) => {
                                            const newPlans = [...(ztaxContent.pricing?.plans || [])];
                                            newPlans[idx].name = e.target.value;
                                            setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), plans: newPlans } });
                                        }}
                                    />
                                    <AdminInput
                                        label="Currency & Cost"
                                        labelClassName="text-indigo-100"
                                        className="bg-indigo-500/30 border-indigo-400 focus:ring-white placeholder-indigo-300"
                                        value={plan.price}
                                        onChange={(e) => {
                                            const newPlans = [...(ztaxContent.pricing?.plans || [])];
                                            newPlans[idx].price = e.target.value;
                                            setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), plans: newPlans } });
                                        }}
                                    />
                                    <AdminInput
                                        label="Billing Interval"
                                        labelClassName="text-indigo-100"
                                        className="bg-indigo-500/30 border-indigo-400 focus:ring-white placeholder-indigo-300"
                                        value={plan.period}
                                        onChange={(e) => {
                                            const newPlans = [...(ztaxContent.pricing?.plans || [])];
                                            newPlans[idx].period = e.target.value;
                                            setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), plans: newPlans } });
                                        }}
                                    />
                                    <AdminInput
                                        label="Brief Highlight"
                                        labelClassName="text-indigo-100"
                                        className="bg-indigo-500/30 border-indigo-400 focus:ring-white placeholder-indigo-300"
                                        value={plan.description}
                                        onChange={(e) => {
                                            const newPlans = [...(ztaxContent.pricing?.plans || [])];
                                            newPlans[idx].description = e.target.value;
                                            setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), plans: newPlans } });
                                        }}
                                    />
                                </div>
                                <div className="space-y-4 pt-4 border-t border-indigo-500">
                                    <label className="text-xs font-black text-indigo-200 uppercase tracking-widest pl-1">Exclusives & Inclusions (Comma Separated)</label>
                                    <AdminInput
                                        isTextArea
                                        rows={4}
                                        className="bg-indigo-500/30 border-indigo-400 focus:ring-white placeholder-indigo-300"
                                        value={plan.features?.join(', ') || ''}
                                        onChange={(e) => {
                                            const newPlans = [...(ztaxContent.pricing?.plans || [])];
                                            newPlans[idx].features = e.target.value.split(',').map(s => s.trim());
                                            setZtaxContent({ ...ztaxContent, pricing: { ...(ztaxContent.pricing as ZtaxPricing), plans: newPlans } });
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AdminCard>
        </div>
    );
};

export default ZtaxTab;
