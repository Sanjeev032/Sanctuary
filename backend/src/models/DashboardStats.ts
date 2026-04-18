import mongoose, { Document, Schema } from 'mongoose';

export interface IDashboardStats extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  sleepQuality: number; // percentage (0-100)
  mindfulMinutes: number;
  moodStability: number; // or percentage (0-100) based on frontend scaling
  focusFlow: number; // or percentage (0-100) based on frontend scaling
  createdAt: Date;
  updatedAt: Date;
}

const dashboardStatsSchema = new Schema<IDashboardStats>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true, default: Date.now },
  sleepQuality: { type: Number, required: true, min: 0, max: 100 },
  mindfulMinutes: { type: Number, required: true, default: 0 },
  moodStability: { type: Number, required: true, min: 0, max: 100 },
  focusFlow: { type: Number, required: true, min: 0, max: 100 },
}, { timestamps: true });

export default mongoose.model<IDashboardStats>('DashboardStats', dashboardStatsSchema);
