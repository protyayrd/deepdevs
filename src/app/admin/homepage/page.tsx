'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminCard from '@/app/admin/components/ui/AdminCard';
import AdminButton from '@/app/admin/components/ui/AdminButton';
import AdminInput from '@/app/admin/components/ui/AdminInput';
import ImageUploadField from '@/app/admin/components/ui/ImageUploadField';

interface HomepageContent {
    stats?: { customerCount: string; customerCountNumber: number; satisfactionRate: number };
    heroAvatars?: Array<{ src: string; alt: string }>;
    featureCards?: Array<{ image: string; title: string; description: string }>;
    appSliderItems?: Array<{
        eyebrow: string;
        title: string;
        description: string;
        phoneImage: string;
        accentColor: string;
        playStoreUrl?: string;
        appStoreUrl?: string;
    }>;
    featuredApps?: Array<{ id: string; title: string; description: string; link: string; iconUrl: string; order: number }>;
    footer?: {
        socialLinks?: { facebook?: string; instagram?: string; twitter?: string; linkedin?: string; youtube?: string };
        columns?: Array<{ title: string; links: Array<{ label: string; url: string }> }>;
    };
}

export default function HomepagePage() {
    const [content, setContent] = useState<HomepageContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/homepage-content');
                const data = await res.json();
                setContent(data);
            } catch {
                toast.error('Failed to load homepage content');
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const saveSection = async (section: string, data: any) => {
        try {
            const key = section === 'app_slider' ? 'appSliderItems' : section === 'feature_cards' ? 'featureCards' : section === 'hero_avatars' ? 'heroAvatars' : section === 'featured_apps' ? 'featuredApps' : section;
            await fetch('/api/homepage-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section, [key]: data })
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
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">🏠 Homepage Content</h1>
                <p className="text-gray-500 font-medium">Manage the main landing page and global components like the footer.</p>
            </div>

            {/* Stats Section */}
            <AdminCard
                title="📊 Homepage Stats"
                description="Animated numbers shown in the stats section."
                actions={<AdminButton size="sm" onClick={() => saveSection('stats', content.stats)}>Save Stats</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AdminInput
                        label="Customer Count (Text)"
                        value={content.stats?.customerCount || ''}
                        onChange={(e) => setContent({ ...content, stats: { ...content.stats!, customerCount: e.target.value } })}
                        placeholder="e.g. 64K+"
                    />
                    <AdminInput
                        label="Target Number"
                        type="number"
                        value={content.stats?.customerCountNumber || 0}
                        onChange={(e) => setContent({ ...content, stats: { ...content.stats!, customerCountNumber: parseInt(e.target.value) || 0 } })}
                    />
                    <AdminInput
                        label="Satisfaction Rate (%)"
                        type="number"
                        value={content.stats?.satisfactionRate || 0}
                        onChange={(e) => setContent({ ...content, stats: { ...content.stats!, satisfactionRate: parseInt(e.target.value) || 0 } })}
                    />
                </div>
            </AdminCard>

            {/* Hero Avatars Section */}
            <AdminCard
                title="👥 Satisfaction Avatars"
                description="Avatars displayed in the satisfaction card."
                actions={<AdminButton size="sm" onClick={() => saveSection('hero_avatars', content.heroAvatars)}>Save Avatars</AdminButton>}
            >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {(content.heroAvatars || []).map((avatar, index) => (
                        <div key={index} className="p-4 rounded-3xl bg-gray-50/50 border border-gray-100">
                            <ImageUploadField
                                value={avatar.src}
                                onChange={(url) => {
                                    const newAvatars = [...(content.heroAvatars || [])];
                                    newAvatars[index] = { ...newAvatars[index], src: url };
                                    setContent({ ...content, heroAvatars: newAvatars });
                                }}
                                previewSize="sm"
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Feature Cards Section */}
            <AdminCard
                title="✨ Feature Cards"
                description="Manage the 'Why Buy From Us' slidable section."
                actions={<AdminButton size="sm" onClick={() => saveSection('feature_cards', content.featureCards)}>Save Feature Cards</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(content.featureCards || []).map((card, index) => (
                        <div key={index} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white transition-all group space-y-4">
                            <ImageUploadField
                                label="Card Image"
                                value={card.image}
                                onChange={(url) => {
                                    const newCards = [...(content.featureCards || [])];
                                    newCards[index] = { ...newCards[index], image: url };
                                    setContent({ ...content, featureCards: newCards });
                                }}
                                previewSize="sm"
                            />
                            <AdminInput
                                label="Title"
                                value={card.title}
                                onChange={(e) => {
                                    const newCards = [...(content.featureCards || [])];
                                    newCards[index] = { ...newCards[index], title: e.target.value };
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
                                    newCards[index] = { ...newCards[index], description: e.target.value };
                                    setContent({ ...content, featureCards: newCards });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* App Slider Section */}
            <AdminCard
                title="📱 App Download Slider"
                description="Configure the mobile app showcase and links."
                actions={<AdminButton size="sm" onClick={() => saveSection('app_slider', content.appSliderItems)}>Save App Slider</AdminButton>}
            >
                <div className="space-y-6">
                    {(content.appSliderItems || []).map((item, index) => (
                        <div key={index} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-col lg:flex-row gap-8">
                            <div className="flex-shrink-0 flex flex-col items-center gap-4">
                                <ImageUploadField
                                    value={item.phoneImage}
                                    onChange={(url) => {
                                        const newItems = [...(content.appSliderItems || [])];
                                        newItems[index] = { ...newItems[index], phoneImage: url };
                                        setContent({ ...content, appSliderItems: newItems });
                                    }}
                                    previewSize="lg"
                                />
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Theme Color:</span>
                                    <input
                                        type="color"
                                        value={item.accentColor}
                                        onChange={(e) => {
                                            const newItems = [...(content.appSliderItems || [])];
                                            newItems[index] = { ...newItems[index], accentColor: e.target.value };
                                            setContent({ ...content, appSliderItems: newItems });
                                        }}
                                        className="w-10 h-10 rounded-full border-4 border-white shadow-sm cursor-pointer overflow-hidden p-0"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AdminInput
                                    label="Eyebrow"
                                    value={item.eyebrow}
                                    onChange={(e) => {
                                        const newItems = [...(content.appSliderItems || [])];
                                        newItems[index] = { ...newItems[index], eyebrow: e.target.value };
                                        setContent({ ...content, appSliderItems: newItems });
                                    }}
                                />
                                <AdminInput
                                    label="Title"
                                    value={item.title}
                                    onChange={(e) => {
                                        const newItems = [...(content.appSliderItems || [])];
                                        newItems[index] = { ...newItems[index], title: e.target.value };
                                        setContent({ ...content, appSliderItems: newItems });
                                    }}
                                />
                                <AdminInput
                                    label="Description"
                                    className="md:col-span-2"
                                    isTextArea
                                    rows={2}
                                    value={item.description}
                                    onChange={(e) => {
                                        const newItems = [...(content.appSliderItems || [])];
                                        newItems[index] = { ...newItems[index], description: e.target.value };
                                        setContent({ ...content, appSliderItems: newItems });
                                    }}
                                />
                                <AdminInput
                                    label="Google Play Link"
                                    value={item.playStoreUrl || ''}
                                    onChange={(e) => {
                                        const newItems = [...(content.appSliderItems || [])];
                                        newItems[index] = { ...newItems[index], playStoreUrl: e.target.value };
                                        setContent({ ...content, appSliderItems: newItems });
                                    }}
                                />
                                <AdminInput
                                    label="App Store Link"
                                    value={item.appStoreUrl || ''}
                                    onChange={(e) => {
                                        const newItems = [...(content.appSliderItems || [])];
                                        newItems[index] = { ...newItems[index], appStoreUrl: e.target.value };
                                        setContent({ ...content, appSliderItems: newItems });
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Featured Apps Section */}
            <AdminCard
                title="✨ Sidebar Apps"
                description="Quick links to other products in the ecosystem."
                actions={<AdminButton size="sm" onClick={() => saveSection('featured_apps', content.featuredApps)}>Save Featured Apps</AdminButton>}
            >
                <div className="space-y-4">
                    {content.featuredApps?.map((app, index) => (
                        <div key={app.id || index} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-col md:flex-row items-center gap-6">
                            <ImageUploadField
                                value={app.iconUrl}
                                onChange={(url) => {
                                    const newApps = [...(content.featuredApps || [])];
                                    newApps[index] = { ...app, iconUrl: url };
                                    setContent({ ...content, featuredApps: newApps });
                                }}
                                previewSize="sm"
                            />
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AdminInput
                                    label="App Title"
                                    value={app.title}
                                    onChange={(e) => {
                                        const newApps = [...(content.featuredApps || [])];
                                        newApps[index] = { ...app, title: e.target.value };
                                        setContent({ ...content, featuredApps: newApps });
                                    }}
                                />
                                <AdminInput
                                    label="Link URL"
                                    value={app.link}
                                    onChange={(e) => {
                                        const newApps = [...(content.featuredApps || [])];
                                        newApps[index] = { ...app, link: e.target.value };
                                        setContent({ ...content, featuredApps: newApps });
                                    }}
                                />
                            </div>
                            <AdminButton
                                variant="ghost"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => {
                                    const newApps = [...(content.featuredApps || [])];
                                    newApps.splice(index, 1);
                                    setContent({ ...content, featuredApps: newApps });
                                }}
                            >
                                Remove
                            </AdminButton>
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newApps = [...(content.featuredApps || [])];
                            newApps.push({
                                id: Date.now().toString(),
                                title: 'New App',
                                description: 'App description',
                                link: '#',
                                iconUrl: '/figma/app-image-1-7c0480.png',
                                order: newApps.length
                            });
                            setContent({ ...content, featuredApps: newApps });
                        }}
                        className="w-full py-6 border-4 border-dashed border-gray-100 text-gray-400 font-black rounded-3xl hover:border-indigo-100 hover:text-indigo-400 transition-all uppercase tracking-widest text-sm"
                    >
                        + Add Application
                    </button>
                </div>
            </AdminCard>
        </div>
    );
}
