import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

export async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState >= 1) return;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in .env");
  }

  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");
}
