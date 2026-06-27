import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  image: string;
  content: object[] | string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title:     { type: String, required: true },
    slug:      { type: String, required: true, unique: true },
    excerpt:   { type: String, required: true },
    date:      { type: String, required: true },
    image:     { type: String, default: '' },
    content:   { type: Schema.Types.Mixed, default: '' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
