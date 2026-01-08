
import React from 'react';
import { toast } from 'react-hot-toast';
import { YolerContent, YolerHero, YolerTheoryTestApp, YolerDownloadCta } from '../../types';
import AdminCard from '../ui/AdminCard';
import AdminButton from '../ui/AdminButton';
import AdminInput from '../ui/AdminInput';

interface YolerTabProps {
    yolerContent: YolerContent | null;
    setYolerContent: (content: YolerContent) => void;
}

const YolerTab: React.FC<YolerTabProps> = ({ yolerContent, setYolerContent }) => {
    if (!yolerContent) return null;

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
                actions={<AdminButton size="sm" onClick={() => saveSection('hero', yolerContent.hero)}>Save Hero</AdminButton>}
            >
                <div className="space-y-6">
                    <AdminInput
                        label="Main Title"
                        isTextArea
                        rows={2}
                        value={yolerContent.hero?.title || ''}
                        onChange={(e) => setYolerContent({ ...yolerContent, hero: { ...(yolerContent.hero as YolerHero), title: e.target.value } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="App Store Link"
                            value={yolerContent.hero?.appStoreUrl || ''}
                            onChange={(e) => setYolerContent({ ...yolerContent, hero: { ...(yolerContent.hero as YolerHero), appStoreUrl: e.target.value } })}
                        />
                        <AdminInput
                            label="Play Store Link"
                            value={yolerContent.hero?.playStoreUrl || ''}
                            onChange={(e) => setYolerContent({ ...yolerContent, hero: { ...(yolerContent.hero as YolerHero), playStoreUrl: e.target.value } })}
                        />
                        <AdminInput
                            label="Hero Image URL"
                            value={yolerContent.hero?.heroImage || ''}
                            onChange={(e) => setYolerContent({ ...yolerContent, hero: { ...(yolerContent.hero as YolerHero), heroImage: e.target.value } })}
                        />
                        <AdminInput
                            label="App Logo URL"
                            value={yolerContent.hero?.logo || ''}
                            onChange={(e) => setYolerContent({ ...yolerContent, hero: { ...(yolerContent.hero as YolerHero), logo: e.target.value } })}
                        />
                    </div>
                </div>
            </AdminCard>

            {/* Feature Cards */}
            <AdminCard
                title="Core Features (Elevated)"
                description="The three main highlight cards below the hero."
                actions={<AdminButton size="sm" onClick={() => saveSection('feature_cards', yolerContent.featureCards)}>Save Features</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {yolerContent.featureCards?.map((card, idx) => (
                        <div key={card.id || idx} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white transition-all group">
                            <div className="space-y-4">
                                <AdminInput
                                    label={`Feature ${idx + 1} Title`}
                                    value={card.title}
                                    onChange={(e) => {
                                        const newCards = [...(yolerContent.featureCards || [])];
                                        newCards[idx].title = e.target.value;
                                        setYolerContent({ ...yolerContent, featureCards: newCards });
                                    }}
                                />
                                <AdminInput
                                    label="Description"
                                    isTextArea
                                    rows={2}
                                    value={card.description}
                                    onChange={(e) => {
                                        const newCards = [...(yolerContent.featureCards || [])];
                                        newCards[idx].description = e.target.value;
                                        setYolerContent({ ...yolerContent, featureCards: newCards });
                                    }}
                                />
                                <AdminInput
                                    label="Icon/Illustration URL"
                                    value={card.icon}
                                    onChange={(e) => {
                                        const newCards = [...(yolerContent.featureCards || [])];
                                        newCards[idx].icon = e.target.value;
                                        setYolerContent({ ...yolerContent, featureCards: newCards });
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Featured Brands */}
            <AdminCard
                title="Partners & Brands"
                description="Scrolling logo cloud for trusted partners."
                actions={<AdminButton size="sm" onClick={() => saveSection('featured_brands', yolerContent.featuredBrands)}>Save Brands</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {yolerContent.featuredBrands?.map((brand, idx) => (
                        <div key={brand.id || idx} className="flex gap-4 items-end p-4 rounded-3xl bg-gray-50 border border-gray-100">
                            <div className="w-20 h-12 bg-white rounded-xl border border-gray-200 flex items-center justify-center p-2 flex-shrink-0">
                                <img src={brand.logoUrl} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-2">
                                <AdminInput
                                    placeholder="Name"
                                    value={brand.name}
                                    onChange={(e) => {
                                        const newBrands = [...(yolerContent.featuredBrands || [])];
                                        newBrands[idx].name = e.target.value;
                                        setYolerContent({ ...yolerContent, featuredBrands: newBrands });
                                    }}
                                />
                                <AdminInput
                                    placeholder="Logo URL"
                                    value={brand.logoUrl}
                                    onChange={(e) => {
                                        const newBrands = [...(yolerContent.featuredBrands || [])];
                                        newBrands[idx].logoUrl = e.target.value;
                                        setYolerContent({ ...yolerContent, featuredBrands: newBrands });
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Theory Test App */}
            <AdminCard
                title="Theory Test Module"
                description="Highlight for the integrated theory test feature."
                actions={<AdminButton size="sm" onClick={() => saveSection('theory_test_app', yolerContent.theoryTestApp)}>Save Module</AdminButton>}
            >
                <div className="space-y-6">
                    <AdminInput
                        label="Module Heading"
                        value={yolerContent.theoryTestApp?.title || ''}
                        onChange={(e) => setYolerContent({ ...yolerContent, theoryTestApp: { ...(yolerContent.theoryTestApp as YolerTheoryTestApp), title: e.target.value } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="Primary Column Text"
                            isTextArea
                            rows={3}
                            value={yolerContent.theoryTestApp?.description1 || ''}
                            onChange={(e) => setYolerContent({ ...yolerContent, theoryTestApp: { ...(yolerContent.theoryTestApp as YolerTheoryTestApp), description1: e.target.value } })}
                        />
                        <AdminInput
                            label="Secondary Column Text"
                            isTextArea
                            rows={3}
                            value={yolerContent.theoryTestApp?.description2 || ''}
                            onChange={(e) => setYolerContent({ ...yolerContent, theoryTestApp: { ...(yolerContent.theoryTestApp as YolerTheoryTestApp), description2: e.target.value } })}
                        />
                        <AdminInput
                            label="Phone Preview Image"
                            className="md:col-span-2"
                            value={yolerContent.theoryTestApp?.phoneImage || ''}
                            onChange={(e) => setYolerContent({ ...yolerContent, theoryTestApp: { ...(yolerContent.theoryTestApp as YolerTheoryTestApp), phoneImage: e.target.value } })}
                        />
                    </div>
                </div>
            </AdminCard>

            {/* Features Grid */}
            <AdminCard
                title="Deep Dive Features"
                description="6-column grid detailing specific app capabilities."
                actions={<AdminButton size="sm" onClick={() => saveSection('features_grid', yolerContent.featuresGrid)}>Save Grid</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {yolerContent.featuresGrid?.map((item, idx) => (
                        <div key={item.id || idx} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-200">
                            <div className="flex justify-between gap-4 mb-4">
                                <div className="flex-1">
                                    <AdminInput
                                        label="Feature Label"
                                        value={item.title}
                                        onChange={(e) => {
                                            const newGrid = [...(yolerContent.featuresGrid || [])];
                                            newGrid[idx].title = e.target.value;
                                            setYolerContent({ ...yolerContent, featuresGrid: newGrid });
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-widest">Color</span>
                                    <input
                                        type="color"
                                        value={item.backgroundColor}
                                        onChange={(e) => {
                                            const newGrid = [...(yolerContent.featuresGrid || [])];
                                            newGrid[idx].backgroundColor = e.target.value;
                                            setYolerContent({ ...yolerContent, featuresGrid: newGrid });
                                        }}
                                        className="w-10 h-10 rounded-full border-4 border-white shadow-sm cursor-pointer overflow-hidden p-0"
                                    />
                                </div>
                            </div>
                            <AdminInput
                                label="Icon URL"
                                className="mb-4"
                                value={item.icon}
                                onChange={(e) => {
                                    const newGrid = [...(yolerContent.featuresGrid || [])];
                                    newGrid[idx].icon = e.target.value;
                                    setYolerContent({ ...yolerContent, featuresGrid: newGrid });
                                }}
                            />
                            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 mb-4">
                                <input
                                    type="checkbox"
                                    checked={item.isList}
                                    onChange={(e) => {
                                        const newGrid = [...(yolerContent.featuresGrid || [])];
                                        newGrid[idx].isList = e.target.checked;
                                        setYolerContent({ ...yolerContent, featuresGrid: newGrid });
                                    }}
                                    className="w-5 h-5 accent-indigo-600"
                                />
                                <span className="text-sm font-bold text-gray-700">Display as Bullets</span>
                            </div>
                            {item.isList && (
                                <AdminInput
                                    label="List Elements"
                                    isTextArea
                                    rows={3}
                                    helperText="Each line is a new bullet point"
                                    value={item.listItems?.join('\n')}
                                    onChange={(e) => {
                                        const newGrid = [...(yolerContent.featuresGrid || [])];
                                        newGrid[idx].listItems = e.target.value.split('\n');
                                        setYolerContent({ ...yolerContent, featuresGrid: newGrid });
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Info Sections */}
            <AdminCard
                title="Narrative Sections"
                description="Alternate layout content sections with text and images."
                actions={<AdminButton size="sm" onClick={() => saveSection('info_sections', yolerContent.infoSections)}>Save Sections</AdminButton>}
            >
                <div className="space-y-8">
                    {yolerContent.infoSections?.map((section, idx) => (
                        <div key={section.id} className="p-8 rounded-3xl bg-indigo-50/30 border border-indigo-100 relative group">
                            <h4 className="absolute -top-3 left-6 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-indigo-200">
                                {section.id.replace('_', ' ')}
                            </h4>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-4">
                                    <AdminInput
                                        label="Section Title"
                                        value={section.title}
                                        onChange={(e) => {
                                            const newInfos = [...(yolerContent.infoSections || [])];
                                            newInfos[idx].title = e.target.value;
                                            setYolerContent({ ...yolerContent, infoSections: newInfos });
                                        }}
                                    />
                                    <AdminInput
                                        label="Content Paragraphs"
                                        isTextArea
                                        rows={5}
                                        helperText="Use TWO new lines to separate into paragraphs"
                                        value={section.description.join('\n\n')}
                                        onChange={(e) => {
                                            const newInfos = [...(yolerContent.infoSections || [])];
                                            newInfos[idx].description = e.target.value.split('\n\n');
                                            setYolerContent({ ...yolerContent, infoSections: newInfos });
                                        }}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div className="relative group cursor-pointer aspect-video bg-white rounded-2xl border border-gray-200 overflow-hidden flex items-center justify-center p-4">
                                        <img src={section.image} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <AdminInput
                                        label="Image Endpoint"
                                        value={section.image}
                                        onChange={(e) => {
                                            const newInfos = [...(yolerContent.infoSections || [])];
                                            newInfos[idx].image = e.target.value;
                                            setYolerContent({ ...yolerContent, infoSections: newInfos });
                                        }}
                                    />
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-semibold text-gray-700 ml-1">Visual Alignment</label>
                                        <select
                                            value={section.imagePosition}
                                            onChange={(e) => {
                                                const newInfos = [...(yolerContent.infoSections || [])];
                                                newInfos[idx].imagePosition = e.target.value as 'left' | 'right';
                                                setYolerContent({ ...yolerContent, infoSections: newInfos });
                                            }}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-bold text-gray-700"
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

            {/* Bottom CTA */}
            <AdminCard
                title="Closing Call-to-Action"
                description="Final download prompt at the bottom of the page."
                actions={<AdminButton size="sm" onClick={() => saveSection('download_cta', yolerContent.downloadCta)}>Save CTA</AdminButton>}
            >
                <div className="space-y-6">
                    <AdminInput
                        label="Headline Text"
                        value={yolerContent.downloadCta?.title || ''}
                        onChange={(e) => setYolerContent({ ...yolerContent, downloadCta: { ...(yolerContent.downloadCta as YolerDownloadCta), title: e.target.value } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="Final App Store Link"
                            value={yolerContent.downloadCta?.appStoreUrl || ''}
                            onChange={(e) => setYolerContent({ ...yolerContent, downloadCta: { ...(yolerContent.downloadCta as YolerDownloadCta), appStoreUrl: e.target.value } })}
                        />
                        <AdminInput
                            label="Final Play Store Link"
                            value={yolerContent.downloadCta?.playStoreUrl || ''}
                            onChange={(e) => setYolerContent({ ...yolerContent, downloadCta: { ...(yolerContent.downloadCta as YolerDownloadCta), playStoreUrl: e.target.value } })}
                        />
                    </div>
                </div>
            </AdminCard>
        </div>
    );
};

export default YolerTab;
