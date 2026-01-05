import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHomepageStats {
    customerCount: string;  // e.g., "64K+"
    customerCountNumber: number;  // e.g., 64000 for animation
    satisfactionRate: number;  // e.g., 92 for percentage
}

export interface IHeroAvatar {
    src: string;
    alt: string;
    order: number;
}

export interface IFeatureCard {
    title: string;
    description: string;
    image: string;
    order: number;
}

export interface IAppSliderItem {
    appId: string;
    eyebrow: string;
    title: string;
    description: string;
    accentColor: string;
    phoneImage: string;
    playStoreUrl: string;
    appStoreUrl: string;
    order: number;
}

export interface IStoreBadges {
    playStoreBadge: string;
    appStoreBadge: string;
    defaultPlayStoreUrl: string;
    defaultAppStoreUrl: string;
}

export interface IFeaturedApp {
    id: string;
    title: string;
    description: string;
    link: string;
    iconUrl: string;
    order: number;
}

export interface IFooterLink {
    label: string;
    url: string;
}

export interface IFooterColumn {
    title: string;
    links: IFooterLink[];
}

export interface IFooterContent {
    socialLinks: {
        facebook: string;
        instagram: string;
        twitter?: string;
        linkedin?: string;
        youtube?: string;
    };
    columns: IFooterColumn[];
    copyrightText: string;
}

export interface IHomepageContent extends Document {
    section: 'stats' | 'hero_avatars' | 'feature_cards' | 'app_slider' | 'testimonials_config' | 'store_badges' | 'featured_apps' | 'footer';
    stats?: IHomepageStats;
    heroAvatars?: IHeroAvatar[];
    featureCards?: IFeatureCard[];
    appSliderItems?: IAppSliderItem[];
    testimonialsConfig?: {
        sectionTitle: string;
        sectionSubtitle: string;
        sectionDescription: string;
    };
    storeBadges?: IStoreBadges;
    featuredApps?: IFeaturedApp[];
    footer?: IFooterContent;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const HomepageContentSchema: Schema = new Schema(
    {
        section: {
            type: String,
            required: true,
            unique: true,
            enum: ['stats', 'hero_avatars', 'feature_cards', 'app_slider', 'testimonials_config', 'store_badges', 'featured_apps', 'footer'],
        },
        stats: {
            customerCount: { type: String, default: '64K+' },
            customerCountNumber: { type: Number, default: 64000 },
            satisfactionRate: { type: Number, default: 92 },
        },
        heroAvatars: [{
            src: { type: String, required: true },
            alt: { type: String, default: 'Customer avatar' },
            order: { type: Number, default: 0 },
        }],
        featureCards: [{
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String, required: true },
            order: { type: Number, default: 0 },
        }],
        appSliderItems: [{
            appId: { type: String, required: true },
            eyebrow: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            accentColor: { type: String, default: '#E2603A' },
            phoneImage: { type: String, required: true },
            playStoreUrl: { type: String, default: 'https://play.google.com/store/apps' },
            appStoreUrl: { type: String, default: 'https://www.apple.com/app-store/' },
            order: { type: Number, default: 0 },
        }],
        testimonialsConfig: {
            sectionTitle: { type: String, default: 'Experiences Shared by Our Clients' },
            sectionSubtitle: { type: String, default: 'Testimonial' },
            sectionDescription: { type: String, default: 'The team at WDK AI Toolkit provided unparalleled support throughout our project.' },
        },
        storeBadges: {
            playStoreBadge: { type: String, default: '/figma/shared/google-play-badge.png' },
            appStoreBadge: { type: String, default: '/figma/shared/appstore-badge.png' },
            defaultPlayStoreUrl: { type: String, default: 'https://play.google.com/store/apps' },
            defaultAppStoreUrl: { type: String, default: 'https://www.apple.com/app-store/' },
        },
        featuredApps: [{
            id: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            link: { type: String, required: true },
            iconUrl: { type: String, required: true },
            order: { type: Number, default: 0 },
        }],
        footer: {
            socialLinks: {
                facebook: { type: String, default: '#' },
                instagram: { type: String, default: '#' },
                twitter: { type: String, default: '#' },
                linkedin: { type: String, default: '#' },
                youtube: { type: String, default: '#' },
            },
            columns: [{
                title: { type: String, required: true },
                links: [{
                    label: { type: String, required: true },
                    url: { type: String, required: true },
                }],
            }],
            copyrightText: { type: String, default: 'All Rights Reserved.' },
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for quick lookup
HomepageContentSchema.index({ section: 1 });

const HomepageContent: Model<IHomepageContent> = mongoose.models.HomepageContent || mongoose.model<IHomepageContent>('HomepageContent', HomepageContentSchema);

export default HomepageContent;

