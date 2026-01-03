import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INavItem {
    id: string;
    label: string;
    href: string;
    isExternal: boolean;
    order: number;
    isActive: boolean;
}

export interface INavigation extends Document {
    position: string;
    items: INavItem[];
    createdAt?: Date;
    updatedAt?: Date;
}

const NavItemSchema = new Schema({
    id: { type: String, required: true },
    label: { type: String, required: true },
    href: { type: String, required: true },
    isExternal: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { _id: false });

const NavigationSchema: Schema = new Schema(
    {
        position: {
            type: String,
            required: true,
            unique: true,
            enum: ['header', 'footer', 'sidebar'],
        },
        items: [NavItemSchema],
    },
    {
        timestamps: true,
    }
);

// position is already indexed via unique: true constraint

const Navigation: Model<INavigation> = mongoose.models.Navigation || mongoose.model<INavigation>('Navigation', NavigationSchema);

export default Navigation;
