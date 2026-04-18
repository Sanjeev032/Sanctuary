import mongoose, { Document, Schema } from 'mongoose';

export interface IJournal extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  mood: string;
  createdAt: Date;
  updatedAt: Date;
}

const journalSchema = new Schema<IJournal>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  mood: { type: String, required: true },
}, { timestamps: true });

// Note: createdAt is managed automatically by the timestamps option

export default mongoose.model<IJournal>('Journal', journalSchema);
