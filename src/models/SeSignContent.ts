import mongoose, { Schema, Document, Model } from 'mongoose';

// --- Interfaces ---

export interface ISeSignHero {
    tag: string;
    title: string;
    subtitle: string;
    leftImage: string;
    rightImage: string;
    bottomLeftImage: string;
    bottomRightImage: string;
    happyClientsCount: string;
    happyClientsLabel: string;
}

export interface ISeSignBrand {
    id: string;
    name: string;
    logoUrl: string;
    order: number;
}

export interface ISeSignMetricCard {
    id: string;
    value: string;
    suffix?: string; // e.g., '+', 'K', '%'
    label: string;
    order: number;
}

export interface ISeSignAbout {
    tag: string;
    title: string;
    subtitle: string;
    cards: ISeSignMetricCard[];
}

export interface ISeSignFeatureCard {
    id: string;
    title: string;
    description: string;
    icon: string; // SVG content or URL
    order: number;
}

export interface ISeSignFeatures {
    tag: string;
    title: string;
    subtitle: string;
    cards: ISeSignFeatureCard[];
}

export interface ISeSignWorkAnywhere {
    tag: string;
    title: string; // Could be multiline, but we'll store as string and handle newlines if needed, or just rich text
    subtitle: string;
    heroImage: string;
}

export interface ISeSignTestimonial {
    id: string;
    text: string;
    userName: string;
    userLocation: string;
    userAvatar: string;
    order: number;
}

export interface ISeSignTestimonialsSection {
    title: string;
    subtitle: string;
    items: ISeSignTestimonial[];
}

export interface ISeSignIntegration {
    id: string;
    name: string;
    icon: string;
    order: number;
}

export interface ISeSignIntegrationsSection {
    tag: string;
    title: string;
    subtitle: string;
    items: ISeSignIntegration[];
}

export interface ISeSignDownloadCta {
    title: string;
    subtitle: string;
    appStoreUrl: string;
    playStoreUrl: string;
}

export interface ISeSignContent extends Document {
    section: 'hero' | 'featured_brands' | 'about' | 'features' | 'work_anywhere' | 'testimonials' | 'integrations' | 'download_cta';
    hero?: ISeSignHero;
    featuredBrands?: ISeSignBrand[];
    about?: ISeSignAbout;
    features?: ISeSignFeatures;
    workAnywhere?: ISeSignWorkAnywhere;
    testimonials?: ISeSignTestimonialsSection;
    integrations?: ISeSignIntegrationsSection;
    downloadCta?: ISeSignDownloadCta;
    updatedAt?: Date;
}

// --- Schema ---

const SeSignContentSchema: Schema = new Schema(
    {
        section: {
            type: String,
            required: true,
            unique: true,
            enum: ['hero', 'featured_brands', 'about', 'features', 'work_anywhere', 'testimonials', 'integrations', 'download_cta'],
        },
        hero: {
            tag: { type: String, default: 'Signature · Document · Share' },
            title: { type: String, default: 'Simplify Documents, Sign, Collaborate Anywhere' },
            subtitle: { type: String, default: 'Manage, share, and sign your documents securely in one platform — integrated, automated, and built for teams that move fast and work remotely.' },
            leftImage: { type: String, default: '/figma/sesign/young-woman-hand-uses-tablet.png' },
            rightImage: { type: String, default: '/figma/sesign/designer-work-office.png' },
            bottomLeftImage: { type: String, default: '/figma/sesign/document-verification.png' },
            bottomRightImage: { type: String, default: '/figma/sesign/terms-use.png' },
            happyClientsCount: { type: String, default: '25k+' },
            happyClientsLabel: { type: String, default: 'Happy Clients' },
        },
        featuredBrands: [{
            id: { type: String, required: true },
            name: { type: String, required: true },
            logoUrl: { type: String, required: true },
            order: { type: Number, default: 0 },
        }],
        about: {
            tag: { type: String, default: 'About Us' },
            title: { type: String, default: 'Empowering Paperless Progress with Secure Digital Solutions' },
            subtitle: { type: String, default: 'We empower businesses to go fully paperless by providing secure, smart, and scalable digital solutions that streamline document management, signing, and collaboration' },
            cards: [{
                id: { type: String, required: true },
                value: { type: String, required: true },
                suffix: { type: String },
                label: { type: String, required: true },
                order: { type: Number, default: 0 },
            }]
        },
        features: {
            tag: { type: String, default: 'Feature' },
            title: { type: String, default: 'Smarter Features for Faster Safer Signing Workflow' },
            subtitle: { type: String, default: 'Explore powerful features designed to help you upload, organize, share, and sign documents' },
            cards: [{
                id: { type: String, required: true },
                title: { type: String, required: true },
                description: { type: String, required: true },
                icon: { type: String, required: true },
                order: { type: Number, default: 0 },
            }]
        },
        workAnywhere: {
            tag: { type: String, default: 'Work Anywhere' },
            title: { type: String, default: 'Simplify Documents, Sign, Collaborate Anywhere' },
            subtitle: { type: String, default: 'Manage, share, and sign your documents securely in one platform - integrated, automated, and built for teams that move fast and work remotely.' },
            heroImage: { type: String, default: '/figma/sesign/work-anywhere-hero.png' },
        },
        testimonials: {
            title: { type: String, default: 'Experiences Shared by Our Clients' },
            subtitle: { type: String, default: 'The team at WDK AI ToolKit provided unparalleled support throughout our project. Their expertise and dedication were evident from day one, helping us navigate complex challenges.' },
            items: [{
                id: { type: String, required: true },
                text: { type: String, required: true },
                userName: { type: String, required: true },
                userLocation: { type: String, required: true },
                userAvatar: { type: String, required: true },
                order: { type: Number, default: 0 },
            }]
        },
        integrations: {
            tag: { type: String, default: 'Popular Integrations' },
            title: { type: String, default: 'Connect Seamlessly With Tools You Already Trust' },
            subtitle: { type: String, default: 'Enhance your workflow by integrating with leading platforms your team uses every day.' },
            items: [{
                id: { type: String, required: true },
                name: { type: String, required: true },
                icon: { type: String, required: true },
                order: { type: Number, default: 0 },
            }]
        },
        downloadCta: {
            title: { type: String, default: 'Secure, Sign, Store - All In One Platform' },
            subtitle: { type: String, default: 'Join thousands of teams who trust us to simplify their document workflows with secure e-signatures and powerful automation tools.' },
            appStoreUrl: { type: String, default: '#' },
            playStoreUrl: { type: String, default: '#' },
        },
    },
    {
        timestamps: true,
    }
);

// Index for quick lookup
SeSignContentSchema.index({ section: 1 });

const SeSignContent: Model<ISeSignContent> = mongoose.models.SeSignContent || mongoose.model<ISeSignContent>('SeSignContent', SeSignContentSchema);

export default SeSignContent;
