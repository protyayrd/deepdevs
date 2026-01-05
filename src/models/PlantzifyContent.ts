import mongoose, { Schema, Document, Model } from 'mongoose';

// --- Interfaces ---

export interface IPlantzifyHero {
    welcomeText: string;
    title: string;
    subtitle: string;
    appStoreUrl: string;
    playStoreUrl: string;
    heroImage: string;
    logo: string;
}

export interface IPlantzifyFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface IPlantzifyProblemSolution {
    id: string; // 'identify_problems' or 'healthy_gardens'
    title: string;
    description: string;
    image: string;
    imagePosition: 'left' | 'right';
}

export interface IPlantzifyTestimonial {
    text: string;
    name: string;
    avatar: string;
    rating: number;
}

export interface IPlantzifyGalleryImage {
    id: string;
    imageUrl: string;
    altText: string;
}

export interface IPlantzifyBlogPost {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string; // e.g. "22 Jun"
    readTime: string; // e.g. "9 min read"
}

export interface IPlantzifyDownloadCta {
    title: string;
    description: string; // often implicit in the title, but good to have flexibility
    appStoreUrl: string;
    playStoreUrl: string;
    phoneImage: string;
}

export interface IPlantzifyContent extends Document {
    section: 'hero' | 'features' | 'problem_solution' | 'testimonials' | 'gallery' | 'blog' | 'download_cta';
    hero?: IPlantzifyHero;
    features?: IPlantzifyFeature[];
    problemSolution?: IPlantzifyProblemSolution[];
    testimonials?: IPlantzifyTestimonial[]; // Although original design only shows one, array is better for future
    gallery?: IPlantzifyGalleryImage[];
    blog?: IPlantzifyBlogPost[];
    downloadCta?: IPlantzifyDownloadCta;
    updatedAt?: Date;
}

// --- Schema ---

const PlantzifyContentSchema: Schema = new Schema(
    {
        section: {
            type: String,
            required: true,
            unique: true,
            enum: ['hero', 'features', 'problem_solution', 'testimonials', 'gallery', 'blog', 'download_cta'],
        },
        hero: {
            welcomeText: { type: String, default: 'Welcome to ATT Plantzify' },
            title: { type: String, default: 'Plant Detective Identify & Protect Your Greenery' },
            subtitle: { type: String, default: 'Your will have everything nearby supermarket, buses, station, the carmen neighborhood, etc' },
            appStoreUrl: { type: String, default: '#' },
            playStoreUrl: { type: String, default: '#' },
            heroImage: { type: String, default: '/figma/plantzify/plant-image-56586a.png' },
            logo: { type: String, default: '/figma/plantzify/app-icon-1-56586a.png' },
        },
        features: [{
            id: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            icon: { type: String, required: true },
        }],
        problemSolution: [{
            id: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String, required: true },
            imagePosition: { type: String, enum: ['left', 'right'], default: 'left' },
        }],
        testimonials: [{
            text: { type: String, required: true },
            name: { type: String, required: true },
            avatar: { type: String, required: true },
            rating: { type: Number, default: 5 },
        }],
        gallery: [{
            id: { type: String, required: true },
            imageUrl: { type: String, required: true },
            altText: { type: String, default: 'Plant gallery image' },
        }],
        blog: [{
            id: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String, required: true },
            date: { type: String, default: '22 Jun' },
            readTime: { type: String, default: '9 min read' },
        }],
        downloadCta: {
            title: { type: String, default: 'Download and unlock nature\'s secrets and enjoy your greener world' },
            appStoreUrl: { type: String, default: '#' },
            playStoreUrl: { type: String, default: '#' },
            phoneImage: { type: String, default: '/figma/plantzify/download-section-phone.png' },
        },
    },
    {
        timestamps: true,
    }
);

// Index for quick lookup
PlantzifyContentSchema.index({ section: 1 });

const PlantzifyContent: Model<IPlantzifyContent> = mongoose.models.PlantzifyContent || mongoose.model<IPlantzifyContent>('PlantzifyContent', PlantzifyContentSchema);

export default PlantzifyContent;
