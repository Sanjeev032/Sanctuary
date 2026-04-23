import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import DashboardStats from '../models/DashboardStats';

// @desc    Record a completed session and update dashboard stats
// @route   POST /api/v1/sessions/breathing
export const recordBreathingSession = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { duration } = req.body; // duration in seconds

    if (!userId) {
      res.status(401).json({ message: 'User context is missing.' });
      return;
    }

    if (!duration || typeof duration !== 'number') {
       res.status(400).json({ message: 'Valid duration is required.' });
       return;
    }

    const minutes = Math.floor(duration / 60) || 1; // At least 1 minute if duration is small but exists

    // Find the stats record for today (UTC start of day)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    let stats = await DashboardStats.findOne({ 
      userId, 
      date: { $gte: today } 
    });

    if (!stats) {
      // Create new daily stats if it doesn't exist
      stats = await DashboardStats.create({
        userId,
        date: new Date(),
        sleepQuality: 70, // Baseline defaults
        mindfulMinutes: minutes,
        moodStability: 75,
        focusFlow: 65
      });
    } else {
      // Update existing record
      stats.mindfulMinutes += minutes;
      // Slightly boost mood stability for completing a session
      stats.moodStability = Math.min(stats.moodStability + 2, 100);
      stats.focusFlow = Math.min(stats.focusFlow + 3, 100);
      await stats.save();
    }

    res.status(200).json({
      message: 'Session recorded in your Sanctuary.',
      currentMinutes: stats.mindfulMinutes
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
