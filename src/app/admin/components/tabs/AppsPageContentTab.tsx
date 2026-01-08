
import React from 'react';
import { toast } from 'react-hot-toast';
import { AppsContent } from '../../types';
import AdminCard from '../ui/AdminCard';
import AdminButton from '../ui/AdminButton';
import AdminInput from '../ui/AdminInput';
import ImageUploadField from '../ui/ImageUploadField';

interface AppsPageContentTabProps {
    appsContent: AppsContent | null;
    setAppsContent: React.Dispatch<React.SetStateAction<AppsContent | null>>;
}

const AppsPageContentTab: React.FC<AppsPageContentTabProps> = ({ appsContent, setAppsContent }) => {
    return (
        <div className="space-y-8 animate-fade-in-up is-visible pb-20">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">✨ Apps Landing Page</h1>
                <p className="text-gray-500 font-medium">Customize the top-level section of your applications showcase.</p>
            </div>

            {/* Hero Section */}
            <AdminCard
                title="Hero Section Configuration"
                description="Control the primary messaging and visuals on the apps landing page."
                actions={
                    <AdminButton
                        size="sm"
                        onClick={async () => {
                            try {
                                await fetch('/api/content', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ page: 'apps', section: 'hero', content: appsContent?.hero })
                                });
                                toast.success('Hero updated!');
                            } catch { toast.error('Failed to update hero'); }
                        }}
                    >
                        Save Hero Changes
                    </AdminButton>
                }
            >
                <div className="space-y-8">
                    {/* Text Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AdminInput
                            label="Tagline / Eyebrow"
                            value={appsContent?.hero?.tag || ''}
                            onChange={(e) => setAppsContent(prev => ({ ...prev, hero: { ...prev?.hero, tag: e.target.value } } as AppsContent))}
                            placeholder="e.g. Innovation in every pixel"
                        />
                    </div>

                    <AdminInput
                        label="Main Heading"
                        isTextArea
                        rows={2}
                        value={appsContent?.hero?.title || ''}
                        onChange={(e) => setAppsContent(prev => ({ ...prev, hero: { ...prev?.hero, title: e.target.value } } as AppsContent))}
                        placeholder="We build the future of..."
                        helperText="HTML tags for styling are permitted."
                    />

                    <AdminInput
                        label="Supporting Narrative"
                        isTextArea
                        rows={3}
                        value={appsContent?.hero?.description || ''}
                        onChange={(e) => setAppsContent(prev => ({ ...prev, hero: { ...prev?.hero, description: e.target.value } } as AppsContent))}
                        placeholder="Detailed explanation of your offerings..."
                    />

                    {/* Hero Image Upload */}
                    <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
                        <ImageUploadField
                            label="Hero Image / Mockup"
                            value={appsContent?.hero?.heroImage || ''}
                            onChange={(url) => setAppsContent(prev => ({ ...prev, hero: { ...prev?.hero, heroImage: url } } as AppsContent))}
                            placeholder="Upload or paste hero image URL"
                            previewSize="lg"
                        />
                    </div>

                    {/* Buttons Configuration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
                        <div className="space-y-4">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Primary Interaction</h4>
                            <div className="space-y-3">
                                <AdminInput
                                    placeholder="Button Label"
                                    value={appsContent?.hero?.buttonText || ''}
                                    onChange={(e) => setAppsContent(prev => ({ ...prev, hero: { ...prev?.hero, buttonText: e.target.value } } as AppsContent))}
                                />
                                <AdminInput
                                    placeholder="Button Link URL"
                                    value={appsContent?.hero?.buttonLink || ''}
                                    onChange={(e) => setAppsContent(prev => ({ ...prev, hero: { ...prev?.hero, buttonLink: e.target.value } } as AppsContent))}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Secondary Interaction</h4>
                            <div className="space-y-3">
                                <AdminInput
                                    placeholder="Button Label"
                                    value={appsContent?.hero?.secondaryButtonText || ''}
                                    onChange={(e) => setAppsContent(prev => ({ ...prev, hero: { ...prev?.hero, secondaryButtonText: e.target.value } } as AppsContent))}
                                />
                                <AdminInput
                                    placeholder="Button Link URL"
                                    value={appsContent?.hero?.secondaryButtonLink || ''}
                                    onChange={(e) => setAppsContent(prev => ({ ...prev, hero: { ...prev?.hero, secondaryButtonLink: e.target.value } } as AppsContent))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AdminCard>
        </div>
    );
};

export default AppsPageContentTab;
