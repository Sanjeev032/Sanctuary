import { Request, Response } from 'express';
import Journal from '../models/Journal';

// @desc    Get all journal entries for a user
// @route   GET /api/v1/journals
export const getJournals = async (req: Request, res: Response) => {
  try {
    // Hardcoded mock user ID for now until authentication is added
    const mockUserId = '64e8a1d123456789abcdef12'; 
    const entries = await JournalEntry.find({ user: mockUserId }).sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new journal entry
// @route   POST /api/v1/journals
export const createJournal = async (req: Request, res: Response) => {
  try {
    const { title, content, mood } = req.body;
    const mockUserId = '64e8a1d123456789abcdef12';

    if (!title || !content) {
      res.status(400).json({ message: 'Please provide title and content' });
      return;
    }

    const entry = await JournalEntry.create({
      user: mockUserId,
      title,
      content,
      mood: mood || 'Smile'
    });

    res.status(201).json(entry);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
