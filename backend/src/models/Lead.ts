import { Schema, model, models } from 'mongoose';

export interface ILead {
  name: string;
  email: string;
  phone: string;
  description: string;
  source: 'hero' | 'contact' | 'estimate';
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name:        { type: String, required: true, trim: true, maxlength: 100 },
    email:       { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    phone:       { type: String, trim: true, default: '', maxlength: 30 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    source:      { type: String, enum: ['hero', 'contact', 'estimate'], default: 'contact' },
  },
  { timestamps: true },
);

// Index for admin queries
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ email: 1 });

const Lead = models.Lead ?? model<ILead>('Lead', LeadSchema);
export default Lead;
