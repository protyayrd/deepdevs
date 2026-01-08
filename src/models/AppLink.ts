import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAppLink extends Document {
    appName: string;
    appDisplayName: string;
    websiteUrl: string;
    appStoreUrl: string;
    playStoreUrl: string;
    appIcon: string;
    mockupImage: string;
    qrCode: string;
    appDescription: string;
    features: string[];
    platforms: string[];
    order: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const AppLinkSchema: Schema = new Schema(
    {
        appName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        appDisplayName: {
            type: String,
            required: true,
        },
        websiteUrl: {
            type: String,
            default: '#',
        },
        appStoreUrl: {
            type: String,
            default: '#',
        },
        playStoreUrl: {
            type: String,
            default: '#',
        },
        appIcon: {
            type: String,
            default: '',
        },
        mockupImage: {
            type: String,
            default: '',
        },
        qrCode: {
            type: String,
            default: '',
        },
        appDescription: {
            type: String,
            default: '',
        },
        features: {
            type: [String],
            default: [],
        },
        platforms: {
            type: [String],
            default: [],
        },
        order: {
            type: Number,
            default: 0,
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

// Index for efficient lookups
AppLinkSchema.index({ isActive: 1, order: 1 });

const AppLink: Model<IAppLink> = mongoose.models.AppLink || mongoose.model<IAppLink>('AppLink', AppLinkSchema);

export default AppLink;
