import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HomepageContent, { IHomepageContent } from '@/models/HomepageContent';

// Default data for initial setup
const defaultStats = {
    customerCount: '64K+',
    customerCountNumber: 64000,
    satisfactionRate: 92,
};

const defaultHeroAvatars = [
    { src: '/figma/avatar-1-191d0a.png', alt: 'Customer avatar 1', order: 0 },
    { src: '/figma/avatar-2-4b233a.png', alt: 'Customer avatar 2', order: 1 },
    { src: '/figma/avatar-3-4b233a.png', alt: 'Customer avatar 3', order: 2 },
    { src: '/figma/avatar-4-4b233a.png', alt: 'Customer avatar 4', order: 3 },
];

const defaultFeatureCards = [
    {
        title: 'Learn With Love',
        description: 'Track your writing, manage projects, and stay in control all from one intuitive hub.',
        image: '/figma/mobile-app-features2-1-9b9924.webp',
        order: 0,
    },
    {
        title: 'Fast & Speedy',
        description: 'Get started in seconds. Create your Piku account with just a few taps—no paperwork.',
        image: '/figma/mobile-app-features1-1-1d877e.webp',
        order: 1,
    },
    {
        title: 'Expert support',
        description: 'Need help? Our team of specialists is here 24/7 to guide you every step of the way.',
        image: '/figma/mobile-app-features3-337bed.webp',
        order: 2,
    },
];

const defaultAppSliderItems = [
    {
        appId: 'yoler',
        eyebrow: 'Yoler',
        title: 'Pass your Theory Test First Time',
        description: 'Practice the latest 2025 DVSA theory test questions with smart study modes and real-time scoring.',
        accentColor: '#E2603A',
        phoneImage: '/figma/yoler-app-image.png',
        playStoreUrl: 'https://play.google.com/store/apps',
        appStoreUrl: 'https://www.apple.com/app-store/',
        order: 0,
    },
    {
        appId: 'sesign',
        eyebrow: 'SeSign',
        title: 'Secure, Sign, Store All In One Platform',
        description: 'Digitize paperwork, sign with confidence, and keep every document synced across your workspace.',
        accentColor: '#1C54FF',
        phoneImage: '/figma/sesign-app-image.png',
        playStoreUrl: 'https://play.google.com/store/apps',
        appStoreUrl: 'https://www.apple.com/app-store/',
        order: 1,
    },
    {
        appId: 'deep-tattoo',
        eyebrow: 'Deep Tattoo',
        title: 'Download The App & Design Your Tattoo Today!',
        description: 'Turn portraits into custom tattoo art with AI-assisted sketching tools and pro artist templates.',
        accentColor: '#F26D21',
        phoneImage: '/figma/deep-tattoo-app-image.png',
        playStoreUrl: 'https://play.google.com/store/apps',
        appStoreUrl: 'https://www.apple.com/app-store/',
        order: 2,
    },
    {
        appId: 'plantzify',
        eyebrow: 'Plantzify',
        title: "Download and unlock nature's secrets",
        description: 'Diagnose plant issues, track watering schedules, and revive your garden with AI-powered insights.',
        accentColor: '#2E8E5A',
        phoneImage: '/figma/plantzify-app-image.png',
        playStoreUrl: 'https://play.google.com/store/apps',
        appStoreUrl: 'https://www.apple.com/app-store/',
        order: 3,
    },
    {
        appId: 'ztax',
        eyebrow: 'Ztax',
        title: 'Manage your finances with confidence',
        description: 'Track income, send invoices, and automate tax prep with intuitive dashboards built for growth.',
        accentColor: '#0A84FF',
        phoneImage: '/figma/ztax-app-image.png',
        playStoreUrl: 'https://play.google.com/store/apps',
        appStoreUrl: 'https://www.apple.com/app-store/',
        order: 4,
    },
    {
        appId: 'deep-study-ai',
        eyebrow: 'Deep Study AI',
        title: 'Study Smarter with AI-Powered Learning',
        description: 'Personalized study plans, AI tutoring, and intelligent flashcards to accelerate your learning.',
        accentColor: '#6366F1',
        phoneImage: '/figma/deep-study-ai-app-image.png',
        playStoreUrl: 'https://play.google.com/store/apps',
        appStoreUrl: 'https://www.apple.com/app-store/',
        order: 5,
    },
];

const defaultStoreBadges = {
    playStoreBadge: '/figma/shared/google-play-badge.png',
    appStoreBadge: '/figma/shared/appstore-badge.png',
    defaultPlayStoreUrl: 'https://play.google.com/store/apps',
    defaultAppStoreUrl: 'https://www.apple.com/app-store/',
};

const defaultFeaturedApps = [
    { id: '1', title: 'Yoler', description: 'Practice the latest 2025 DVSA Theory Test Questions', link: '/apps/yoler', iconUrl: '/figma/app-image-1-7c0480.png', order: 0 },
    { id: '2', title: 'Deep tattoo', description: 'Deep Tattoo helps you explore powerful designs that carry...', link: '/apps/deep-tattoo', iconUrl: '/figma/app-image-2-7c4c7a.png', order: 1 },
    { id: '3', title: 'Plantzify', description: 'Take multiple photos of your plant and let us work our magic', link: '/apps/plantzify', iconUrl: '/figma/app-image-3-468f35.png', order: 2 },
    { id: '4', title: 'Deep Study Ai', description: 'Sign any document from your smartphone no printing...', link: '/apps/deep-study-ai', iconUrl: '/figma/app-image-1-7c0480.png', order: 3 },
    { id: '5', title: 'SeSign', description: 'Sign any document from your smartphone no printing...', link: '/apps/sesign', iconUrl: '/figma/app-image-2-7c4c7a.png', order: 4 },
    { id: '6', title: 'Ztax', description: 'Experience the Future of Tax Filing: Effortless...', link: '/apps/ztax', iconUrl: '/figma/app-image-3-468f35.png', order: 5 },
];

const defaultFooter = {
    socialLinks: {
        facebook: '#',
        instagram: '#',
        twitter: '#',
        linkedin: '#',
        youtube: '#'
    },
    columns: [
        {
            title: 'Our Apps',
            links: [
                { label: 'Yoler', url: '/apps/yoler' },
                { label: 'Deep tattoo', url: '/apps/deep-tattoo' },
                { label: 'Plantzify', url: '/apps/plantzify' },
                { label: 'SeSign', url: '/apps/sesign' },
                { label: 'Deep Study Ai', url: '/apps/deep-study-ai' },
                { label: 'Ztax', url: '/apps/ztax' },
            ]
        },
        {
            title: 'Our Plugins',
            links: [
                { label: 'Deep Plugin', url: '#' },
                { label: 'Deep Plugin', url: '#' },
                { label: 'Deep Plugin', url: '#' },
                { label: 'Deep Plugin', url: '#' },
                { label: 'Deep Plugin', url: '#' },
            ]
        },
        {
            title: 'Quick Links',
            links: [
                { label: 'About Us', url: '/about-us' },
                { label: 'Faq', url: '#' },
                { label: 'Contact us', url: '/contact-us' },
                { label: 'Support', url: '#' },
                { label: 'More inf.', url: '#' },
            ]
        }
    ],
    copyrightText: 'All Rights Reserved.'
};

// Helper to transform MongoDB document to plain object
function transformContent(doc: IHomepageContent) {
    const obj = doc.toObject();
    return {
        id: obj._id.toString(),
        section: obj.section,
        stats: obj.stats,
        heroAvatars: obj.heroAvatars,
        featureCards: obj.featureCards,
        appSliderItems: obj.appSliderItems,
        testimonialsConfig: obj.testimonialsConfig,
        storeBadges: obj.storeBadges,
        featuredApps: obj.featuredApps,
        footer: obj.footer,
        isActive: obj.isActive,
        updatedAt: obj.updatedAt?.toISOString(),
    };
}

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const section = searchParams.get('section');

        let query = {};
        if (section) {
            query = { section };
        }

        const contents = await HomepageContent.find(query);

        // If no content exists, return defaults
        if (contents.length === 0) {
            return NextResponse.json({
                stats: defaultStats,
                heroAvatars: defaultHeroAvatars,
                featureCards: defaultFeatureCards,
                appSliderItems: defaultAppSliderItems,
                testimonialsConfig: {
                    sectionTitle: 'Experiences Shared by Our Clients',
                    sectionSubtitle: 'Testimonial',
                    sectionDescription: 'The team at WDK AI Toolkit provided unparalleled support throughout our project.',
                },
                storeBadges: defaultStoreBadges,
                featuredApps: defaultFeaturedApps,
                footer: defaultFooter,
            });
        }

        // Combine all sections into one response object
        const result: Record<string, unknown> = {};
        for (const content of contents) {
            const transformed = transformContent(content);
            if (content.section === 'stats' && content.stats) {
                result.stats = content.stats;
            } else if (content.section === 'hero_avatars' && content.heroAvatars) {
                result.heroAvatars = content.heroAvatars;
            } else if (content.section === 'feature_cards' && content.featureCards) {
                result.featureCards = content.featureCards;
            } else if (content.section === 'app_slider' && content.appSliderItems) {
                result.appSliderItems = content.appSliderItems;
            } else if (content.section === 'testimonials_config' && content.testimonialsConfig) {
                result.testimonialsConfig = content.testimonialsConfig;
            } else if (content.section === 'store_badges' && content.storeBadges) {
                result.storeBadges = content.storeBadges;
            } else if (content.section === 'featured_apps' && content.featuredApps) {
                result.featuredApps = content.featuredApps;
            } else if (content.section === 'footer' && content.footer) {
                result.footer = content.footer;
            }
            result[`${content.section}_id`] = transformed.id;
        }

        // Fill in defaults for missing sections
        if (!result.stats) result.stats = defaultStats;
        if (!result.heroAvatars) result.heroAvatars = defaultHeroAvatars;
        if (!result.featureCards) result.featureCards = defaultFeatureCards;
        if (!result.appSliderItems) result.appSliderItems = defaultAppSliderItems;
        if (!result.testimonialsConfig) {
            result.testimonialsConfig = {
                sectionTitle: 'Experiences Shared by Our Clients',
                sectionSubtitle: 'Testimonial',
                sectionDescription: 'The team at WDK AI Toolkit provided unparalleled support throughout our project.',
            };
        }
        if (!result.storeBadges) result.storeBadges = defaultStoreBadges;
        if (!result.featuredApps) result.featuredApps = defaultFeaturedApps;
        if (!result.footer) result.footer = defaultFooter;

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in GET /api/homepage-content:', error);
        return NextResponse.json(
            { error: 'Failed to fetch homepage content' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { section, ...data } = body;

        if (!section) {
            return NextResponse.json(
                { error: 'Section is required' },
                { status: 400 }
            );
        }

        // Upsert the content for the section
        const updateData: Record<string, unknown> = { section, isActive: true };

        switch (section) {
            case 'stats':
                updateData.stats = data.stats || data;
                break;
            case 'hero_avatars':
                updateData.heroAvatars = data.heroAvatars || data.avatars || data;
                break;
            case 'feature_cards':
                updateData.featureCards = data.featureCards || data.cards || data;
                break;
            case 'app_slider':
                updateData.appSliderItems = data.appSliderItems || data.items || data;
                break;
            case 'testimonials_config':
                updateData.testimonialsConfig = data.testimonialsConfig || data;
                break;
            case 'store_badges':
                updateData.storeBadges = data.storeBadges || data;
                break;
            case 'featured_apps':
                updateData.featuredApps = data.featuredApps || data;
                break;
            case 'footer':
                updateData.footer = data.footer || data;
                break;
            default:
                return NextResponse.json(
                    { error: 'Invalid section' },
                    { status: 400 }
                );
        }

        const result = await HomepageContent.findOneAndUpdate(
            { section },
            { $set: updateData },
            { upsert: true, new: true }
        );

        return NextResponse.json(transformContent(result), { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/homepage-content:', error);
        return NextResponse.json(
            { error: 'Failed to save homepage content' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { id, section, ...data } = body;

        if (!id && !section) {
            return NextResponse.json(
                { error: 'ID or section is required' },
                { status: 400 }
            );
        }

        const query = id ? { _id: id } : { section };

        const updateData: Record<string, unknown> = {};

        if (data.stats) updateData.stats = data.stats;
        if (data.heroAvatars) updateData.heroAvatars = data.heroAvatars;
        if (data.featureCards) updateData.featureCards = data.featureCards;
        if (data.appSliderItems) updateData.appSliderItems = data.appSliderItems;
        if (data.testimonialsConfig) updateData.testimonialsConfig = data.testimonialsConfig;
        if (data.storeBadges) updateData.storeBadges = data.storeBadges;
        if (data.featuredApps) updateData.featuredApps = data.featuredApps;
        if (data.footer) updateData.footer = data.footer;
        if (typeof data.isActive === 'boolean') updateData.isActive = data.isActive;

        const result = await HomepageContent.findOneAndUpdate(
            query,
            { $set: updateData },
            { new: true }
        );

        if (!result) {
            return NextResponse.json(
                { error: 'Content not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(transformContent(result));
    } catch (error) {
        console.error('Error in PUT /api/homepage-content:', error);
        return NextResponse.json(
            { error: 'Failed to update homepage content' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const section = searchParams.get('section');

        if (!id && !section) {
            return NextResponse.json(
                { error: 'ID or section is required' },
                { status: 400 }
            );
        }

        const query = id ? { _id: id } : { section };
        const result = await HomepageContent.findOneAndDelete(query);

        if (!result) {
            return NextResponse.json(
                { error: 'Content not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in DELETE /api/homepage-content:', error);
        return NextResponse.json(
            { error: 'Failed to delete homepage content' },
            { status: 500 }
        );
    }
}
