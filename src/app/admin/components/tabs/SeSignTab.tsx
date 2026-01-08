
import React from 'react';
import { toast } from 'react-hot-toast';
import { SeSignContent, SeSignHero } from '../../types';
import AdminCard from '../ui/AdminCard';
import AdminButton from '../ui/AdminButton';
import AdminInput from '../ui/AdminInput';

interface SeSignTabProps {
    seSignContent: SeSignContent | null;
    setSeSignContent: (content: SeSignContent) => void;
}

const SeSignTab: React.FC<SeSignTabProps> = ({ seSignContent, setSeSignContent }) => {
    if (!seSignContent) return null;

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

    return (
        <div className="space-y-8 animate-fade-in-up is-visible pb-20">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">✍️ SeSign Content</h1>
                <p className="text-gray-500 font-medium">Customize the landing page for the SeSign digital signature app.</p>
            </div>

            {/* Hero Section */}
            <AdminCard
                title="Hero Masterpiece"
                description="The core branding, headline, and multi-image mosaic."
                actions={<AdminButton size="sm" onClick={() => saveSection('hero', seSignContent.hero)}>Save Hero</AdminButton>}
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="Promotion Tag"
                            value={seSignContent.hero?.tag || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, hero: { ...(seSignContent.hero as SeSignHero), tag: e.target.value } })}
                        />
                        <AdminInput
                            label="Main Headline"
                            value={seSignContent.hero?.title || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, hero: { ...(seSignContent.hero as SeSignHero), title: e.target.value } })}
                        />
                    </div>
                    <AdminInput
                        label="Supporting Narrative"
                        isTextArea
                        rows={2}
                        value={seSignContent.hero?.subtitle || ''}
                        onChange={(e) => setSeSignContent({ ...seSignContent, hero: { ...(seSignContent.hero as SeSignHero), subtitle: e.target.value } })}
                    />

                    <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 pl-1">Image Mosaic Grid</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(['leftImage', 'rightImage', 'bottomLeftImage', 'bottomRightImage'] as const).map((key) => (
                                <div key={key}>
                                    <AdminInput
                                        label={key.replace(/([A-Z])/g, ' $1')}
                                        value={seSignContent.hero?.[key] || ''}
                                        onChange={(e) => setSeSignContent({ ...seSignContent, hero: { ...(seSignContent.hero as SeSignHero), [key]: e.target.value } })}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-indigo-50/20 rounded-3xl border border-indigo-100/50">
                        <AdminInput
                            label="Social Proof: Client Count"
                            value={seSignContent.hero?.happyClientsCount || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, hero: { ...(seSignContent.hero as SeSignHero), happyClientsCount: e.target.value } })}
                        />
                        <AdminInput
                            label="Social Proof: Description"
                            value={seSignContent.hero?.happyClientsLabel || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, hero: { ...(seSignContent.hero as SeSignHero), happyClientsLabel: e.target.value } })}
                        />
                    </div>
                </div>
            </AdminCard>

            {/* Featured Brands */}
            <AdminCard
                title="Trusted By Brands"
                description="Logo cloud showing established partnerships."
                actions={<AdminButton size="sm" onClick={() => saveSection('featured_brands', seSignContent.featuredBrands)}>Save Brands</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {seSignContent.featuredBrands?.map((brand, idx) => (
                        <div key={idx} className="p-4 rounded-3xl bg-gray-50 border border-gray-100 space-y-3">
                            <div className="aspect-video bg-white rounded-2xl flex items-center justify-center p-3 border border-gray-100">
                                <img src={brand.logoUrl} className="max-w-full max-h-full object-contain" />
                            </div>
                            <AdminInput
                                placeholder="Logo URL"
                                value={brand.logoUrl}
                                onChange={(e) => {
                                    const newBrands = [...(seSignContent.featuredBrands || [])];
                                    newBrands[idx].logoUrl = e.target.value;
                                    setSeSignContent({ ...seSignContent, featuredBrands: newBrands });
                                }}
                            />
                            <AdminInput
                                placeholder="Company Name"
                                value={brand.name}
                                onChange={(e) => {
                                    const newBrands = [...(seSignContent.featuredBrands || [])];
                                    newBrands[idx].name = e.target.value;
                                    setSeSignContent({ ...seSignContent, featuredBrands: newBrands });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* About / Metrics */}
            <AdminCard
                title="Company Metrics"
                description="Section explaining the impact with hard data points."
                actions={<AdminButton size="sm" onClick={() => saveSection('about', seSignContent.about)}>Save Metrics</AdminButton>}
            >
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AdminInput
                            label="Eyebrow Tag"
                            value={seSignContent.about?.tag || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, about: { ...seSignContent.about!, tag: e.target.value } })}
                        />
                        <AdminInput
                            className="md:col-span-2"
                            label="Section Heading"
                            value={seSignContent.about?.title || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, about: { ...seSignContent.about!, title: e.target.value } })}
                        />
                        <AdminInput
                            className="md:col-span-3"
                            label="Section Commentary"
                            isTextArea
                            rows={2}
                            value={seSignContent.about?.subtitle || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, about: { ...seSignContent.about!, subtitle: e.target.value } })}
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {seSignContent.about?.cards.map((card, idx) => (
                            <div key={idx} className="p-6 rounded-3xl bg-indigo-50/50 border border-indigo-100 space-y-4">
                                <AdminInput
                                    label="Number"
                                    value={card.value}
                                    onChange={(e) => { const newCards = [...seSignContent.about!.cards]; newCards[idx].value = e.target.value; setSeSignContent({ ...seSignContent, about: { ...seSignContent.about!, cards: newCards } }) }}
                                />
                                <AdminInput
                                    label="Suffix"
                                    placeholder="e.g. +"
                                    value={card.suffix || ''}
                                    onChange={(e) => { const newCards = [...seSignContent.about!.cards]; newCards[idx].suffix = e.target.value; setSeSignContent({ ...seSignContent, about: { ...seSignContent.about!, cards: newCards } }) }}
                                />
                                <AdminInput
                                    label="Descriptor"
                                    value={card.label}
                                    onChange={(e) => { const newCards = [...seSignContent.about!.cards]; newCards[idx].label = e.target.value; setSeSignContent({ ...seSignContent, about: { ...seSignContent.about!, cards: newCards } }) }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </AdminCard>

            {/* Features */}
            <AdminCard
                title="Elite Capabilities"
                description="Detailed cards showing why SeSign is the best choice."
                actions={<AdminButton size="sm" onClick={() => saveSection('features', seSignContent.features)}>Save Features</AdminButton>}
            >
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AdminInput
                            label="Tag"
                            value={seSignContent.features?.tag || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, features: { ...seSignContent.features!, tag: e.target.value } })}
                        />
                        <AdminInput
                            className="md:col-span-2"
                            label="Headline"
                            value={seSignContent.features?.title || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, features: { ...seSignContent.features!, title: e.target.value } })}
                        />
                        <AdminInput
                            className="md:col-span-3"
                            label="Subtext"
                            isTextArea
                            rows={2}
                            value={seSignContent.features?.subtitle || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, features: { ...seSignContent.features!, subtitle: e.target.value } })}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {seSignContent.features?.cards.map((card, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 p-3 shadow-sm flex-shrink-0">
                                    <img src={card.icon} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <AdminInput
                                        label="Feature Name"
                                        value={card.title}
                                        onChange={(e) => { const newCards = [...seSignContent.features!.cards]; newCards[idx].title = e.target.value; setSeSignContent({ ...seSignContent, features: { ...seSignContent.features!, cards: newCards } }) }}
                                    />
                                    <AdminInput
                                        label="Capability Details"
                                        isTextArea
                                        rows={2}
                                        value={card.description}
                                        onChange={(e) => { const newCards = [...seSignContent.features!.cards]; newCards[idx].description = e.target.value; setSeSignContent({ ...seSignContent, features: { ...seSignContent.features!, cards: newCards } }) }}
                                    />
                                    <AdminInput
                                        label="Visual Asset URL"
                                        value={card.icon}
                                        onChange={(e) => { const newCards = [...seSignContent.features!.cards]; newCards[idx].icon = e.target.value; setSeSignContent({ ...seSignContent, features: { ...seSignContent.features!, cards: newCards } }) }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AdminCard>

            {/* Work Anywhere */}
            <AdminCard
                title="Mobile Freedom"
                description="Highlighting the ability to sign documents on the go."
                actions={<AdminButton size="sm" onClick={() => saveSection('work_anywhere', seSignContent.workAnywhere)}>Save Section</AdminButton>}
            >
                <div className="space-y-6">
                    <AdminInput
                        label="Eyebrow"
                        value={seSignContent.workAnywhere?.tag || ''}
                        onChange={(e) => setSeSignContent({ ...seSignContent, workAnywhere: { ...seSignContent.workAnywhere!, tag: e.target.value } })}
                    />
                    <AdminInput
                        label="Main Title"
                        isTextArea
                        rows={2}
                        value={seSignContent.workAnywhere?.title || ''}
                        onChange={(e) => setSeSignContent({ ...seSignContent, workAnywhere: { ...seSignContent.workAnywhere!, title: e.target.value } })}
                    />
                    <AdminInput
                        label="Supporting Narrative"
                        isTextArea
                        rows={2}
                        value={seSignContent.workAnywhere?.subtitle || ''}
                        onChange={(e) => setSeSignContent({ ...seSignContent, workAnywhere: { ...seSignContent.workAnywhere!, subtitle: e.target.value } })}
                    />
                    <AdminInput
                        label="Full Width Hero Image"
                        value={seSignContent.workAnywhere?.heroImage || ''}
                        onChange={(e) => setSeSignContent({ ...seSignContent, workAnywhere: { ...seSignContent.workAnywhere!, heroImage: e.target.value } })}
                    />
                </div>
            </AdminCard>

            {/* Testimonials */}
            <AdminCard
                title="User Success Stories"
                description="Direct quotes from satisfied seal-signers."
                actions={<AdminButton size="sm" onClick={() => saveSection('testimonials', seSignContent.testimonials)}>Save Stories</AdminButton>}
            >
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="Social Proof Title"
                            value={seSignContent.testimonials?.title || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, testimonials: { ...seSignContent.testimonials!, title: e.target.value } })}
                        />
                        <AdminInput
                            label="Social Proof Subtitle"
                            isTextArea
                            rows={2}
                            value={seSignContent.testimonials?.subtitle || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, testimonials: { ...seSignContent.testimonials!, subtitle: e.target.value } })}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {seSignContent.testimonials?.items.map((item, idx) => (
                            <div key={idx} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-col gap-4">
                                <AdminInput
                                    label="User Name"
                                    value={item.userName}
                                    onChange={(e) => { const newItems = [...seSignContent.testimonials!.items]; newItems[idx].userName = e.target.value; setSeSignContent({ ...seSignContent, testimonials: { ...seSignContent.testimonials!, items: newItems } }) }}
                                />
                                <AdminInput
                                    label="Company/Location"
                                    value={item.userLocation}
                                    onChange={(e) => { const newItems = [...seSignContent.testimonials!.items]; newItems[idx].userLocation = e.target.value; setSeSignContent({ ...seSignContent, testimonials: { ...seSignContent.testimonials!, items: newItems } }) }}
                                />
                                <AdminInput
                                    label="Avatar URL"
                                    value={item.userAvatar}
                                    onChange={(e) => { const newItems = [...seSignContent.testimonials!.items]; newItems[idx].userAvatar = e.target.value; setSeSignContent({ ...seSignContent, testimonials: { ...seSignContent.testimonials!, items: newItems } }) }}
                                />
                                <AdminInput
                                    label="Testimonial Quote"
                                    isTextArea
                                    rows={4}
                                    value={item.text}
                                    onChange={(e) => { const newItems = [...seSignContent.testimonials!.items]; newItems[idx].text = e.target.value; setSeSignContent({ ...seSignContent, testimonials: { ...seSignContent.testimonials!, items: newItems } }) }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </AdminCard>

            {/* Integrations */}
            <AdminCard
                title="Ecosystem Synergy"
                description="List of tools and platforms SeSign connects with."
                actions={<AdminButton size="sm" onClick={() => saveSection('integrations', seSignContent.integrations)}>Save Ecosystem</AdminButton>}
            >
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AdminInput
                            label="Context Tag"
                            value={seSignContent.integrations?.tag || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, integrations: { ...seSignContent.integrations!, tag: e.target.value } })}
                        />
                        <AdminInput
                            className="md:col-span-2"
                            label="Integration Heading"
                            value={seSignContent.integrations?.title || ''}
                            onChange={(e) => setSeSignContent({ ...seSignContent, integrations: { ...seSignContent.integrations!, title: e.target.value } })}
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {seSignContent.integrations?.items.map((item, idx) => (
                            <div key={idx} className="p-4 rounded-3xl bg-indigo-50/30 border border-indigo-100 flex flex-col gap-3">
                                <AdminInput
                                    label="Platform"
                                    value={item.name}
                                    onChange={(e) => { const newItems = [...seSignContent.integrations!.items]; newItems[idx].name = e.target.value; setSeSignContent({ ...seSignContent, integrations: { ...seSignContent.integrations!, items: newItems } }) }}
                                />
                                <AdminInput
                                    label="Icon"
                                    value={item.icon}
                                    onChange={(e) => { const newItems = [...seSignContent.integrations!.items]; newItems[idx].icon = e.target.value; setSeSignContent({ ...seSignContent, integrations: { ...seSignContent.integrations!, items: newItems } }) }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </AdminCard>

            {/* Download CTA */}
            <AdminCard
                title="SeSign Finale"
                description="Final conversion point to get users started with signatures."
                actions={<AdminButton size="sm" onClick={() => saveSection('download_cta', seSignContent.downloadCta)}>Save Promotion</AdminButton>}
            >
                <div className="space-y-6">
                    <AdminInput
                        label="Call to Action Heading"
                        value={seSignContent.downloadCta?.title || ''}
                        onChange={(e) => setSeSignContent({ ...seSignContent, downloadCta: { ...seSignContent.downloadCta!, title: e.target.value } })}
                    />
                    <AdminInput
                        label="Supporting Convincer"
                        isTextArea
                        rows={2}
                        value={seSignContent.downloadCta?.subtitle || ''}
                        onChange={(e) => setSeSignContent({ ...seSignContent, downloadCta: { ...seSignContent.downloadCta!, subtitle: e.target.value } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="App Store Link"
                            value={seSignContent.downloadCta?.appStoreUrl}
                            onChange={(e) => setSeSignContent({ ...seSignContent, downloadCta: { ...seSignContent.downloadCta!, appStoreUrl: e.target.value } })}
                        />
                        <AdminInput
                            label="Play Store Link"
                            value={seSignContent.downloadCta?.playStoreUrl}
                            onChange={(e) => setSeSignContent({ ...seSignContent, downloadCta: { ...seSignContent.downloadCta!, playStoreUrl: e.target.value } })}
                        />
                    </div>
                </div>
            </AdminCard>
        </div>
    );
};

export default SeSignTab;
