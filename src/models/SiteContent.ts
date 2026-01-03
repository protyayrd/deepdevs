import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for content items (features, cards, etc.)
export interface IContentItem {
    id: string;
    title: string;
    description: string;
    icon?: string;
    image?: string;
    link?: string;
    accentColor?: string;
    order: number;
}

// Interface for the main content structure
export interface IContentData {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundImage?: string;
    items?: IContentItem[];
}

export interface ISiteContent extends Document {
    page: string;
    section: string;
    content: IContentData;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const ContentItemSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String },
    image: { type: String },
    link: { type: String },
    accentColor: { type: String },
    order: { type: Number, default: 0 },
}, { _id: false });

const ContentDataSchema = new Schema({
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    buttonText: { type: String },
    buttonLink: { type: String },
    backgroundImage: { type: String },
    items: [ContentItemSchema],
}, { _id: false });

const SiteContentSchema: Schema = new Schema(
    {
        page: {
            type: String,
            required: true,
            index: true,
        },
        section: {
            type: String,
            required: true,
        },
        content: {
            type: ContentDataSchema,
            required: true,
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

// Compound index for efficient queries
SiteContentSchema.index({ page: 1, section: 1 }, { unique: true });

const SiteContent: Model<ISiteContent> = mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', SiteContentSchema);

export default SiteContent;
