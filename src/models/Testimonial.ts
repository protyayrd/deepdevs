import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
    page: string;
    customerName: string;
    location: string;
    avatar: string;
    content: string;
    rating?: number;
    isActive: boolean;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const TestimonialSchema: Schema = new Schema(
    {
        page: {
            type: String,
            required: true,
            index: true,
        },
        customerName: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: '/figma/default-avatar.png',
        },
        content: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for better query performance
TestimonialSchema.index({ page: 1, isActive: 1 });
TestimonialSchema.index({ order: 1 });

const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
