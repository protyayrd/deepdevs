import mongoose, { Schema, Document, Model } from 'mongoose';

// --- Interfaces ---

export interface IDeepStudyHero {
    title: string;
    subtitle: string;
    appStoreUrl: string;
    playStoreUrl: string;
    heroImage: string;
}

export interface IDeepStudyStat {
    id: string;
    value: string; // e.g. "5", "4.8", "10k"
    label: string;
    icon: string; // SVG content or URL
    order: number;
}

export interface IDeepStudyFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
}

export interface IDeepStudyProcessStep {
    id: string;
    title: string;
    description: string;
    image: string;
    overlayImage?: string; // For the 3rd step
    buttonText: string;
    order: number;
}

export interface IDeepStudyBlogCard {
    id: string;
    title: string;
    description: string;
    image: string; // Fallback or background color
    link: string;
    order: number;
}

export interface IDeepStudyContent extends Document {
    section: 'hero' | 'stats' | 'features' | 'process_steps' | 'blog_cards';
    hero?: IDeepStudyHero;
    stats?: IDeepStudyStat[];
    featuresHeader?: { title: string; subtitle: string }; // Special case for features header
    features?: IDeepStudyFeature[];
    processHeader?: { title: string; subtitle: string }; // Special case for process header
    processSteps?: IDeepStudyProcessStep[];
    blogHeader?: { title: string };
    blogCards?: IDeepStudyBlogCard[];
    updatedAt?: Date;
}

// --- Schema ---

const DeepStudyContentSchema: Schema = new Schema(
    {
        section: {
            type: String,
            required: true,
            unique: true,
            enum: ['hero', 'stats', 'features', 'process_steps', 'blog_cards'],
        },
        hero: {
            title: { type: String, default: 'Your Smart Study Companion' },
            subtitle: { type: String, default: 'Scan notes, extract text, and get AI-powered help—all in one app.' },
            appStoreUrl: { type: String, default: '#' },
            playStoreUrl: { type: String, default: '#' },
            heroImage: { type: String, default: '/figma/deep-study-ai/Group-1000004452.png' },
        },
        stats: [{
            id: { type: String, required: true },
            value: { type: String, required: true },
            label: { type: String, required: true },
            icon: { type: String, default: '' },
            order: { type: Number, default: 0 },
        }],
        featuresHeader: {
            title: { type: String, default: 'Discover StudyMate App Feature' },
            subtitle: { type: String, default: 'Your simple way to explore, recognize, and learn about plants in just a few steps' },
        },
        features: [{
            id: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            icon: { type: String, required: true },
            order: { type: Number, default: 0 },
        }],
        processHeader: {
            title: { type: String, default: 'All-In-One Study Solution' },
            subtitle: { type: String, default: 'Your simple way to explore, recognize, and learn about plants in just a few steps' },
        },
        processSteps: [{
            id: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String, required: true },
            overlayImage: { type: String },
            buttonText: { type: String, default: 'Download App' },
            order: { type: Number, default: 0 },
        }],
        blogHeader: {
            title: { type: String, default: 'Our Blog' },
        },
        blogCards: [{
            id: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String, default: '' },
            link: { type: String, default: '#' },
            order: { type: Number, default: 0 },
        }],
    },
    {
        timestamps: true,
    }
);

// Index for quick lookup
DeepStudyContentSchema.index({ section: 1 });

const DeepStudyContent: Model<IDeepStudyContent> = mongoose.models.DeepStudyContent || mongoose.model<IDeepStudyContent>('DeepStudyContent', DeepStudyContentSchema);

export default DeepStudyContent;
