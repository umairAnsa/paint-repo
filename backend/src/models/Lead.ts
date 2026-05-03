import mongoose, { Schema, model, models } from "mongoose";

export interface ILead {
  name: string;
  email: string;
  phone?: string;
  description: string;
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const Lead = models.Lead ?? model<ILead>("Lead", LeadSchema);
export default Lead;
