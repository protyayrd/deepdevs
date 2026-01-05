import mongoose, { Schema, Document, Model } from 'mongoose';

// --- Interfaces ---

export interface IZtaxHero {
    title: string;
    subtitle: string;
    appStoreUrl: string;
    playStoreUrl: string;
    heroImage: string;
    logo: string;
}

export interface IZtaxStat {
    id: string;
    number: string;
    text: string;
    backgroundColor: string;
    icon: string; // URL to icon image (or keeping SVG if we decide to store SVG string, but URL is safer for CMS)
    order: number;
}

export interface IZtaxFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
}

export interface IZtaxPowerfulFeatureStep {
    id: string;
    title: string;
    description: string;
    order: number;
}

export interface IZtaxPowerfulFeatures {
    title: string;
    subtitle: string;
    steps: IZtaxPowerfulFeatureStep[];
    phoneImage: string;
}

export interface IZtaxTestimonial {
    id: string;
    quote: string;
    authorName: string;
    authorRole: string;
    avatar: string;
    order: number;
}

export interface IZtaxPlan {
    id: string;
    name: string;
    price: string;
    period: string; // e.g. "/ month"
    description: string;
    features: string[];
    isPopular?: boolean;
    order: number;
}

export interface IZtaxPricing {
    title: string;
    subtitle: string;
    description: string;
    plans: IZtaxPlan[];
}

export interface IZtaxContent extends Document {
    section: 'hero' | 'stats' | 'features' | 'powerful_features' | 'testimonials' | 'pricing';
    hero?: IZtaxHero;
    stats?: IZtaxStat[];
    features?: IZtaxFeature[];
    powerfulFeatures?: IZtaxPowerfulFeatures;
    testimonials?: IZtaxTestimonial[];
    pricing?: IZtaxPricing;
    updatedAt?: Date;
}

// --- Schema ---

const ZtaxContentSchema: Schema = new Schema(
    {
        section: {
            type: String,
            required: true,
            unique: true,
            enum: ['hero', 'stats', 'features', 'powerful_features', 'testimonials', 'pricing'],
        },
        hero: {
            title: { type: String, default: 'Simplify Your Tax Management with Z Tax' },
            subtitle: { type: String, default: 'Track income, expenses, and invoices all in one place' },
            appStoreUrl: { type: String, default: '#' },
            playStoreUrl: { type: String, default: '#' },
            heroImage: { type: String, default: '/figma/ztax/Group1000004452.png' },
            logo: { type: String, default: '/figma/ztax/ztax-logo.png' },
        },
        stats: [{
            id: { type: String, required: true },
            number: { type: String, required: true },
            text: { type: String, required: true },
            backgroundColor: { type: String, default: '#92C9E6' },
            // For simplicity in this migration, we might stick to a default icon or expect a URL
            // The current SVGs are complex, maybe we can just expect an image URL and user will upload one if they want to change it.
            icon: { type: String, default: '' },
            order: { type: Number, default: 0 },
        }],
        features: [{
            id: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            icon: { type: String, required: true },
            order: { type: Number, default: 0 },
        }],
        powerfulFeatures: {
            title: { type: String, default: 'Powerful Features to Simplify Your Tax Management' },
            subtitle: { type: String, default: 'Track your income, manage expenses, generate reports, and file taxes—all from one app' },
            steps: [{
                id: { type: String, required: true },
                title: { type: String, required: true },
                description: { type: String, required: true },
                order: { type: Number, default: 0 },
            }],
            phoneImage: { type: String, default: '/figma/ztax/phone-mockup.png' },
        },
        testimonials: [{
            id: { type: String, required: true },
            quote: { type: String, required: true },
            authorName: { type: String, required: true },
            authorRole: { type: String, default: 'Customer' },
            avatar: { type: String, default: '/figma/ztax/testimonial-image.png' },
            order: { type: Number, default: 0 },
        }],
        pricing: {
            title: { type: String, default: 'Our Range of Service Level Options' },
            subtitle: { type: String, default: 'Pricing Table' },
            description: { type: String, default: 'Ideal for individuals and small businesses...' },
            plans: [{
                id: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: String, required: true },
                period: { type: String, default: '/ month' },
                description: { type: String, required: true },
                features: { type: [String], default: [] },
                isPopular: { type: Boolean, default: false },
                order: { type: Number, default: 0 },
            }]
        },
    },
    {
        timestamps: true,
    }
);

// Index for quick lookup
ZtaxContentSchema.index({ section: 1 });

const ZtaxContent: Model<IZtaxContent> = mongoose.models.ZtaxContent || mongoose.model<IZtaxContent>('ZtaxContent', ZtaxContentSchema);

export default ZtaxContent;
