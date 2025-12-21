import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFAQ extends Document {
  page: string;
  question: string;
  answer: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const FAQSchema: Schema = new Schema(
  {
    page: {
      type: String,
      required: true,
      enum: ['homepage', 'yoler', 'plantzify', 'sesign', 'deep-study-ai', 'ztax'],
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
FAQSchema.index({ page: 1 });

const FAQ: Model<IFAQ> = mongoose.models.FAQ || mongoose.model<IFAQ>('FAQ', FAQSchema);

export default FAQ;

