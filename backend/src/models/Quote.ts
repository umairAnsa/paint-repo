import mongoose, { Document } from 'mongoose';

export interface IQuote extends Document {
  quoteNumber: string;
  leadId?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  service: string;
  price: number;
  description?: string;
  validUntil: Date;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
  createdAt: Date;
  updatedAt: Date;
}

const quoteSchema = new mongoose.Schema<IQuote>(
  {
    quoteNumber: { type: String, unique: true, required: true },
    leadId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
    name:        { type: String, required: true },
    email:       { type: String, required: true },
    phone:       String,
    service:     { type: String, required: true },
    price:       { type: Number, required: true },
    description: String,
    validUntil:  { type: Date, required: true },
    status:      { type: String, enum: ['Draft', 'Sent', 'Accepted', 'Rejected'], default: 'Draft' },
  },
  { timestamps: true },
);

export default mongoose.model<IQuote>('Quote', quoteSchema);
