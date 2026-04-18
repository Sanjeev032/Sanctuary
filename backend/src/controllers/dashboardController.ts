import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import DashboardStats from '../models/DashboardStats';
import Music from '../models/Music';
import Journal from '../models/Journal';

// @desc    Get aggregate dashboard data for premium landing page
// @route   GET /api/v1/dashboard
export const getDashboardData = async (req: AuthRequest, res: Response) => {
  try {
    // If not authenticated via token, fallback to a mocked or default ID in development
    // (Ideally req.user._id is mapped via verifyToken)
    const userId = req.user ? req.user._id : null; 

    if (!userId) {
       res.status(401).json({ message: 'User not attached to payload.'});
       return;
    }

    // 1. Fetch user's latest stats (or generate default if none exist)
    let stats = await DashboardStats.findOne({ userId }).sort({ createdAt: -1 });
    
    if (!stats) {
       stats = {
         sleepQuality: 0,
         mindfulMinutes: 0,
         moodStability: 0,
         focusFlow: 0
       } as any;
    }

    // 2. Fetch recommendations (e.g. 2 ambient tracks)
    let recommendations = await Music.find({ isActive: true, type: 'ambient' }).limit(2);
    
    // Fallback if no ambient tracks found (production safety)
    if (recommendations.length === 0) {
      recommendations = await Music.find({ isActive: true }).limit(2);
    }

    // 3. Ensure we have a valid stats object for logic
    const finalStats = stats || {
      sleepQuality: 0,
      mindfulMinutes: 0,
      moodStability: 0,
      focusFlow: 0
    };

    // 4. Determine breathing practice based on stats/mood
    const practice = {
      title: finalStats.sleepQuality < 50 ? '4-7-8 Deep Sleep' : 'Box Breathing',
      description: finalStats.sleepQuality < 50 ? 'Lowers heart rate aggressively.' : 'Calms the nervous system and improves focus.'
    };

    // 5. Assemble unified dynamic payload
    const dashboardPayload = {
      user: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      },
      stats: {
        sleepQuality: finalStats.sleepQuality,
        mindfulMinutes: finalStats.mindfulMinutes,
        moodStability: finalStats.moodStability,
        focusFlow: finalStats.focusFlow
      },
      recommendations: recommendations,
      practice: practice
    };

    res.status(200).json(dashboardPayload);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
