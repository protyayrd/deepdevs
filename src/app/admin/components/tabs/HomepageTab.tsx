
import React from 'react';
import { toast } from 'react-hot-toast';
import { HomepageContent, FooterContent } from '../../types';
import AdminCard from '../ui/AdminCard';
import AdminButton from '../ui/AdminButton';
import AdminInput from '../ui/AdminInput';

interface HomepageTabProps {
    homepageContent: HomepageContent;
    setHomepageContent: (content: HomepageContent) => void;
}

const HomepageTab: React.FC<HomepageTabProps> = ({ homepageContent, setHomepageContent }) => {

    const handleImageUpload = (onUpload: (url: string) => void) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                try {
                    const res = await fetch('/api/upload', { method: 'POST', body: formData });
                    const data = await res.json();
                    if (data.url) {
                        onUpload(data.url);
                        toast.success('Image uploaded!');
                    }
                } catch (error) {
                    toast.error('Upload failed');
                }
            }
        };
        input.click();
    };

    const saveSection = async (section: string, data: any) => {
        try {
            await fetch('/api/homepage-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section, [section === 'app_slider' ? 'appSliderItems' : section === 'feature_cards' ? 'featureCards' : section === 'hero_avatars' ? 'heroAvatars' : section === 'featured_apps' ? 'featuredApps' : section]: data })
            });
            toast.success(`${section.replace('_', ' ')} updated!`);
        } catch {
            toast.error(`Failed to update ${section}`);
        }
    };

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
                actions={<AdminButton size="sm" onClick={() => saveSection('stats', homepageContent.stats)}>Save Stats</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AdminInput
                        label="Customer Count (Text)"
                        value={homepageContent.stats?.customerCount || ''}
                        onChange={(e) => setHomepageContent({ ...homepageContent, stats: { ...homepageContent.stats, customerCount: e.target.value } })}
                        placeholder="e.g. 64K+"
                    />
                    <AdminInput
                        label="Target Number"
                        type="number"
                        value={homepageContent.stats?.customerCountNumber || 0}
                        onChange={(e) => setHomepageContent({ ...homepageContent, stats: { ...homepageContent.stats, customerCountNumber: parseInt(e.target.value) || 0 } })}
                    />
                    <AdminInput
                        label="Satisfaction Rate (%)"
                        type="number"
                        value={homepageContent.stats?.satisfactionRate || 0}
                        onChange={(e) => setHomepageContent({ ...homepageContent, stats: { ...homepageContent.stats, satisfactionRate: parseInt(e.target.value) || 0 } })}
                    />
                </div>
            </AdminCard>

            {/* Hero Avatars Section */}
            <AdminCard
                title="👥 Satisfaction Avatars"
                description=" Avatars displayed in the satisfaction card."
                actions={<AdminButton size="sm" onClick={() => saveSection('hero_avatars', homepageContent.heroAvatars)}>Save Avatars</AdminButton>}
            >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {(homepageContent.heroAvatars || []).map((avatar, index) => (
                        <div key={index} className="p-4 rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-col items-center">
                            <div className="relative mb-4 group cursor-pointer" onClick={() => handleImageUpload((url) => {
                                const newAvatars = [...(homepageContent.heroAvatars || [])];
                                newAvatars[index] = { ...newAvatars[index], src: url };
                                setHomepageContent({ ...homepageContent, heroAvatars: newAvatars });
                            })}>
                                <img src={avatar.src} alt={avatar.alt} className="w-20 h-20 rounded-full object-cover shadow-md border-4 border-white group-hover:opacity-80 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] font-bold bg-black/50 text-white px-2 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">Edit</span>
                                </div>
                            </div>
                            <AdminInput
                                className="w-full"
                                value={avatar.src}
                                onChange={(e) => {
                                    const newAvatars = [...(homepageContent.heroAvatars || [])];
                                    newAvatars[index] = { ...newAvatars[index], src: e.target.value };
                                    setHomepageContent({ ...homepageContent, heroAvatars: newAvatars });
                                }}
                                placeholder="Image URL"
                            />
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Why Buy From Us Section */}
            <AdminCard
                title="✨ Feature Cards"
                description="Manage the 'Why Buy From Us' slidable section."
                actions={<AdminButton size="sm" onClick={() => saveSection('feature_cards', homepageContent.featureCards)}>Save Feature Cards</AdminButton>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(homepageContent.featureCards || []).map((card, index) => (
                        <div key={index} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white transition-all group">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 cursor-pointer" onClick={() => handleImageUpload((url) => {
                                    const newCards = [...(homepageContent.featureCards || [])];
                                    newCards[index] = { ...newCards[index], image: url };
                                    setHomepageContent({ ...homepageContent, featureCards: newCards });
                                })}>
                                    <img src={card.image} alt={card.title} className="w-20 h-20 object-contain rounded-2xl bg-white shadow-sm border border-gray-100 p-2 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="flex-1 space-y-3">
                                    <AdminInput
                                        value={card.title}
                                        onChange={(e) => {
                                            const newCards = [...(homepageContent.featureCards || [])];
                                            newCards[index] = { ...newCards[index], title: e.target.value };
                                            setHomepageContent({ ...homepageContent, featureCards: newCards });
                                        }}
                                        placeholder="Card Title"
                                    />
                                    <AdminInput
                                        isTextArea
                                        rows={2}
                                        value={card.description}
                                        onChange={(e) => {
                                            const newCards = [...(homepageContent.featureCards || [])];
                                            newCards[index] = { ...newCards[index], description: e.target.value };
                                            setHomepageContent({ ...homepageContent, featureCards: newCards });
                                        }}
                                        placeholder="Card Description"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* App Slider Section */}
            <AdminCard
                title="📱 App Download Slider"
                description="Configure the mobile app showcase and links."
                actions={<AdminButton size="sm" onClick={() => saveSection('app_slider', homepageContent.appSliderItems)}>Save App Slider</AdminButton>}
            >
                <div className="space-y-6">
                    {(homepageContent.appSliderItems || []).map((item, index) => (
                        <div key={index} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-col lg:flex-row gap-8">
                            <div className="flex-shrink-0 flex flex-col items-center gap-4">
                                <div className="relative group cursor-pointer" onClick={() => handleImageUpload((url) => {
                                    const newItems = [...(homepageContent.appSliderItems || [])];
                                    newItems[index] = { ...newItems[index], phoneImage: url };
                                    setHomepageContent({ ...homepageContent, appSliderItems: newItems });
                                })}>
                                    <img src={item.phoneImage} alt={item.eyebrow} className="w-32 lg:w-40 h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 rounded-3xl">
                                        <AdminButton variant="ghost" size="sm" className="bg-white/80 backdrop-blur-sm">Change Image</AdminButton>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Theme Color:</span>
                                    <input
                                        type="color"
                                        value={item.accentColor}
                                        onChange={(e) => {
                                            const newItems = [...(homepageContent.appSliderItems || [])];
                                            newItems[index] = { ...newItems[index], accentColor: e.target.value };
                                            setHomepageContent({ ...homepageContent, appSliderItems: newItems });
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
                                        const newItems = [...(homepageContent.appSliderItems || [])];
                                        newItems[index] = { ...newItems[index], eyebrow: e.target.value };
                                        setHomepageContent({ ...homepageContent, appSliderItems: newItems });
                                    }}
                                />
                                <AdminInput
                                    label="Title"
                                    value={item.title}
                                    onChange={(e) => {
                                        const newItems = [...(homepageContent.appSliderItems || [])];
                                        newItems[index] = { ...newItems[index], title: e.target.value };
                                        setHomepageContent({ ...homepageContent, appSliderItems: newItems });
                                    }}
                                />
                                <AdminInput
                                    label="Description"
                                    className="md:col-span-2"
                                    isTextArea
                                    rows={2}
                                    value={item.description}
                                    onChange={(e) => {
                                        const newItems = [...(homepageContent.appSliderItems || [])];
                                        newItems[index] = { ...newItems[index], description: e.target.value };
                                        setHomepageContent({ ...homepageContent, appSliderItems: newItems });
                                    }}
                                />
                                <AdminInput
                                    label="Google Play Link"
                                    value={item.playStoreUrl || ''}
                                    onChange={(e) => {
                                        const newItems = [...(homepageContent.appSliderItems || [])];
                                        newItems[index] = { ...newItems[index], playStoreUrl: e.target.value };
                                        setHomepageContent({ ...homepageContent, appSliderItems: newItems });
                                    }}
                                />
                                <AdminInput
                                    label="App Store Link"
                                    value={item.appStoreUrl || ''}
                                    onChange={(e) => {
                                        const newItems = [...(homepageContent.appSliderItems || [])];
                                        newItems[index] = { ...newItems[index], appStoreUrl: e.target.value };
                                        setHomepageContent({ ...homepageContent, appSliderItems: newItems });
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
                actions={<AdminButton size="sm" onClick={() => saveSection('featured_apps', homepageContent.featuredApps)}>Save Featured Apps</AdminButton>}
            >
                <div className="space-y-4">
                    {homepageContent.featuredApps?.map((app, index) => (
                        <div key={app.id || index} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex items-center justify-center">
                                <img src={app.iconUrl} className="w-12 h-12 object-contain" />
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <AdminInput
                                    label="App Title"
                                    value={app.title}
                                    onChange={(e) => {
                                        const newApps = [...(homepageContent.featuredApps || [])];
                                        newApps[index] = { ...app, title: e.target.value };
                                        setHomepageContent({ ...homepageContent, featuredApps: newApps });
                                    }}
                                />
                                <AdminInput
                                    label="Link URL"
                                    value={app.link}
                                    onChange={(e) => {
                                        const newApps = [...(homepageContent.featuredApps || [])];
                                        newApps[index] = { ...app, link: e.target.value };
                                        setHomepageContent({ ...homepageContent, featuredApps: newApps });
                                    }}
                                />
                                <AdminButton
                                    variant="ghost"
                                    className="text-red-500 hover:text-red-700 font-bold self-end"
                                    onClick={() => {
                                        const newApps = [...(homepageContent.featuredApps || [])];
                                        newApps.splice(index, 1);
                                        setHomepageContent({ ...homepageContent, featuredApps: newApps });
                                    }}
                                >
                                    Remove App
                                </AdminButton>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newApps = [...(homepageContent.featuredApps || [])];
                            newApps.push({
                                id: Date.now().toString(),
                                title: 'New App',
                                description: 'App description',
                                link: '#',
                                iconUrl: '/figma/app-image-1-7c0480.png',
                                order: newApps.length
                            });
                            setHomepageContent({ ...homepageContent, featuredApps: newApps });
                        }}
                        className="w-full py-6 border-4 border-dashed border-gray-100 text-gray-400 font-black rounded-3xl hover:border-indigo-100 hover:text-indigo-400 transition-all uppercase tracking-widest text-sm"
                    >
                        + Add Application
                    </button>
                </div>
            </AdminCard>

            {/* Footer Settings Section */}
            <AdminCard
                title="🦶 Footer Management"
                description="Global footer links and social presence."
                actions={<AdminButton size="sm" onClick={() => saveSection('footer', homepageContent.footer)}>Save Footer Settings</AdminButton>}
            >
                <div className="space-y-8">
                    {/* Social Links */}
                    <div className="p-6 rounded-3xl bg-indigo-50/50 border border-indigo-100">
                        <h3 className="text-lg font-bold text-indigo-900 mb-6 flex items-center gap-2">
                            Social Prescence
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map((platform) => (
                                <AdminInput
                                    key={platform}
                                    label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    value={homepageContent.footer?.socialLinks?.[platform as keyof typeof homepageContent.footer.socialLinks] || ''}
                                    onChange={(e) => {
                                        const newFooter = {
                                            ...homepageContent.footer,
                                            socialLinks: {
                                                ...homepageContent.footer?.socialLinks,
                                                [platform]: e.target.value
                                            }
                                        } as FooterContent;
                                        setHomepageContent({ ...homepageContent, footer: newFooter });
                                    }}
                                    placeholder={`https://${platform}.com/...`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Footer Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {homepageContent.footer?.columns?.map((column, colIndex) => (
                            <div key={colIndex} className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                                <AdminInput
                                    label="Column Title"
                                    className="mb-6 font-black"
                                    value={column.title}
                                    onChange={(e) => {
                                        const newFooter = { ...homepageContent.footer } as FooterContent;
                                        if (newFooter.columns) {
                                            newFooter.columns[colIndex].title = e.target.value;
                                            setHomepageContent({ ...homepageContent, footer: newFooter });
                                        }
                                    }}
                                />
                                <div className="space-y-3">
                                    {column.links.map((link, linkIndex) => (
                                        <div key={linkIndex} className="flex gap-2">
                                            <AdminInput
                                                className="flex-1"
                                                value={link.label}
                                                onChange={(e) => {
                                                    const newFooter = { ...homepageContent.footer } as FooterContent;
                                                    if (newFooter.columns) {
                                                        newFooter.columns[colIndex].links[linkIndex].label = e.target.value;
                                                        setHomepageContent({ ...homepageContent, footer: newFooter });
                                                    }
                                                }}
                                                placeholder="Label"
                                            />
                                            <AdminInput
                                                className="flex-1"
                                                value={link.url}
                                                onChange={(e) => {
                                                    const newFooter = { ...homepageContent.footer } as FooterContent;
                                                    if (newFooter.columns) {
                                                        newFooter.columns[colIndex].links[linkIndex].url = e.target.value;
                                                        setHomepageContent({ ...homepageContent, footer: newFooter });
                                                    }
                                                }}
                                                placeholder="URL"
                                            />
                                            <button
                                                onClick={() => {
                                                    const newFooter = { ...homepageContent.footer } as FooterContent;
                                                    if (newFooter.columns) {
                                                        newFooter.columns[colIndex].links.splice(linkIndex, 1);
                                                        setHomepageContent({ ...homepageContent, footer: newFooter });
                                                    }
                                                }}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                            > ✖ </button>
                                        </div>
                                    ))}
                                    <AdminButton
                                        variant="secondary"
                                        size="sm"
                                        className="w-full rounded-xl border-dashed"
                                        onClick={() => {
                                            const newFooter = { ...homepageContent.footer } as FooterContent;
                                            if (newFooter.columns) {
                                                newFooter.columns[colIndex].links.push({ label: 'New Link', url: '#' });
                                                setHomepageContent({ ...homepageContent, footer: newFooter });
                                            }
                                        }}
                                    >
                                        + Add Link
                                    </AdminButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AdminCard>
        </div>
    );
};

export default HomepageTab;
