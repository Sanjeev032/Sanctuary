import { Request, Response } from 'express';
import Music from '../models/Music';

// @desc    Get all active music, optionally filtered by mood
// @route   GET /api/v1/music
export const getMusic = async (req: Request, res: Response) => {
  try {
    const { mood } = req.query;
    let query: any = { isActive: true };

    if (mood) {
      query.moodTags = mood; // Assumes moodTags is an array and matches the exact string
    }

    const tracks = await Music.find(query).sort({ createdAt: -1 });
    res.status(200).json(tracks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
