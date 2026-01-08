import mongoose, { Schema, Document, Model } from 'mongoose';

// --- Interfaces ---

export interface IYolerHero {
    title: string;
    appStoreUrl: string;
    playStoreUrl: string;
    heroImage: string;
    logo: string;
}

export interface IYolerFeatureCard {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
}

export interface IYolerBrand {
    id: string;
    name: string;
    logoUrl: string;
    order: number;
}

export interface IYolerTheoryTestApp {
    title: string;
    description1: string;
    description2: string;
    phoneImage: string;
}

export interface IYolerFeatureGridItem {
    id: string;
    title: string;
    isList: boolean;
    listItems?: string[];
    icon: string;
    backgroundColor: string; // e.g. '#cdeafc'
    order: number;
}

export interface IYolerInfoSection {
    id: string; // 'example_questions' or 'quick_tips'
    title: string;
    description: string[]; // Paragraphs
    image: string;
    imagePosition: 'left' | 'right';
}

export interface IYolerDownloadCta {
    title: string;
    appStoreUrl: string;
    playStoreUrl: string;
}

export interface IYolerContent extends Document {
    section: 'hero' | 'feature_cards' | 'featured_brands' | 'theory_test_app' | 'features_grid' | 'info_sections' | 'download_cta';
    hero?: IYolerHero;
    featureCards?: IYolerFeatureCard[];
    featuredBrands?: IYolerBrand[];
    theoryTestApp?: IYolerTheoryTestApp;
    featuresGrid?: IYolerFeatureGridItem[];
    infoSections?: IYolerInfoSection[];
    downloadCta?: IYolerDownloadCta;
    updatedAt?: Date;
}

// --- Schema ---

const YolerContentSchema: Schema = new Schema(
    {
        section: {
            type: String,
            required: true,
            unique: true,
            enum: ['hero', 'feature_cards', 'featured_brands', 'theory_test_app', 'features_grid', 'info_sections', 'download_cta'],
        },
        hero: {
            title: { type: String, default: 'Pass your Theory Test\nFirst Time' },
            appStoreUrl: { type: String, default: '#' },
            playStoreUrl: { type: String, default: '#' },
            heroImage: { type: String, default: '/figma/yoler/hero-background.jpg' },
            logo: { type: String, default: '/figma/yoler/logo.png' },
        },
        featureCards: [{
            id: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            icon: { type: String, required: true },
            order: { type: Number, default: 0 },
        }],
        featuredBrands: [{
            id: { type: String, required: true },
            name: { type: String, required: true },
            logoUrl: { type: String, required: true },
            order: { type: Number, default: 0 },
        }],
        theoryTestApp: {
            title: { type: String, default: 'Theory Test App' },
            description1: { type: String, default: 'Study from a bank of 2500+ DVSA theory test revision questions, up-to-date for 2026. Take full-length tests and track your progress.' },
            description2: { type: String, default: 'Practice on any of these devices at any time and as much as you like' },
            phoneImage: { type: String, default: '/figma/yoler/yoler-test-app.png' },
        },
        featuresGrid: [{
            id: { type: String, required: true },
            title: { type: String, required: true },
            isList: { type: Boolean, default: false },
            listItems: { type: [String], default: [] },
            icon: { type: String, required: true },
            backgroundColor: { type: String, default: '#FFFFFF' },
            order: { type: Number, default: 0 },
        }],
        infoSections: [{
            id: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: [String], required: true },
            image: { type: String, required: true },
            imagePosition: { type: String, enum: ['left', 'right'], default: 'left' },
        }],
        downloadCta: {
            title: { type: String, default: 'Download and unlock the road to success' },
            appStoreUrl: { type: String, default: '#' },
            playStoreUrl: { type: String, default: '#' },
        },
    },
    {
        timestamps: true,
    }
);

// Index for quick lookup
YolerContentSchema.index({ section: 1 });

const YolerContent: Model<IYolerContent> = mongoose.models.YolerContent || mongoose.model<IYolerContent>('YolerContent', YolerContentSchema);

export default YolerContent;
