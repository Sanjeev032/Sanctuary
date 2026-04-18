import mongoose, { Document, Schema } from 'mongoose';

export interface IMood extends Document {
  name: string;
  color: string;
  gradient: string;
  animationType: string;
  createdAt: Date;
  updatedAt: Date;
}

const moodSchema = new Schema<IMood>({
  name: { type: String, required: true, unique: true },
  color: { type: String, required: true },
  gradient: { type: String, required: true },
  animationType: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IMood>('Mood', moodSchema);
