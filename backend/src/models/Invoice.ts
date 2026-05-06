import mongoose, { Document } from 'mongoose';

export interface IInvoice extends Document {
  invoiceNumber: string;
  leadId?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  service: string;
  price: number;
  date: Date;
  dueDate: Date;
  status: 'Pending' | 'Sent' | 'Paid';
  createdAt: Date;
  updatedAt: Date;
}

const invoiceSchema = new mongoose.Schema<IInvoice>(
  {
    invoiceNumber: { type: String, unique: true, required: true },
    leadId:        { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
    name:          { type: String, required: true },
    email:         { type: String, required: true },
    phone:         String,
    service:       { type: String, required: true },
    price:         { type: Number, required: true },
    date:          { type: Date, default: Date.now },
    dueDate:       { type: Date, required: true },
    status:        { type: String, enum: ['Pending', 'Sent', 'Paid'], default: 'Pending' },
  },
  { timestamps: true },
);

export default mongoose.model<IInvoice>('Invoice', invoiceSchema);
