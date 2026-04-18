import mongoose, { Document, Schema } from 'mongoose';

export interface IMusic extends Document {
  title: string;
  url: string; // from free sources like Pixabay
  type: string; // e.g., ambient, nature, binaural
  moodTags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const musicSchema = new Schema<IMusic>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: ['ambient', 'nature', 'binaural', 'classical', 'electronic'], required: true },
  moodTags: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IMusic>('Music', musicSchema);
