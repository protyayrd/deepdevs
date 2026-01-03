import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAppLink extends Document {
    appName: string;
    appDisplayName: string;
    appStoreUrl: string;
    playStoreUrl: string;
    appIcon: string;
    appDescription: string;
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
        appDescription: {
            type: String,
            default: '',
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
AppLinkSchema.index({ isActive: 1 });

const AppLink: Model<IAppLink> = mongoose.models.AppLink || mongoose.model<IAppLink>('AppLink', AppLinkSchema);

export default AppLink;
