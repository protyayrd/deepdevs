import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPage extends Document {
    slug: string;
    title: string;
    content: string;
    metaDescription?: string;
    metaKeywords?: string;
    isPublished: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const PageSchema: Schema = new Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
            default: '',
        },
        metaDescription: {
            type: String,
            default: '',
        },
        metaKeywords: {
            type: String,
            default: '',
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for efficient lookups
PageSchema.index({ isPublished: 1 });

const Page: Model<IPage> = mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema);

export default Page;
