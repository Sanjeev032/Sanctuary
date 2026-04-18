import { Request, Response } from 'express';
import Mood from '../models/Mood';

// @desc    Get all active moods
// @route   GET /api/v1/moods
export const getMoods = async (req: Request, res: Response) => {
  try {
    const moods = await Mood.find({});
    res.status(200).json(moods);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
