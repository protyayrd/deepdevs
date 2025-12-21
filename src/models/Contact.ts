import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  subject: string;
  message: string;
  isRobot: boolean;
  submittedAt: Date;
}

const ContactSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
    isRobot: {
      type: Boolean,
      default: false,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
ContactSchema.index({ submittedAt: -1 });
ContactSchema.index({ emailAddress: 1 });

const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;

