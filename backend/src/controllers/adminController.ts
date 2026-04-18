import { Request, Response } from 'express';
import Music from '../models/Music';
import Mood from '../models/Mood';
import DashboardStats from '../models/DashboardStats';

// --- MUSIC MANAGEMENT ---
export const addMusic = async (req: Request, res: Response) => {
  try {
    const music = await Music.create(req.body);
    res.status(201).json(music);
  } catch (error: any) { res.status(400).json({ message: error.message }); }
};

export const updateMusic = async (req: Request, res: Response) => {
  try {
    const music = await Music.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(music);
  } catch (error: any) { res.status(400).json({ message: error.message }); }
};

export const deleteMusic = async (req: Request, res: Response) => {
  try {
    await Music.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Music deleted' });
  } catch (error: any) { res.status(400).json({ message: error.message }); }
};

// --- MOOD MANAGEMENT ---
export const addMood = async (req: Request, res: Response) => {
  try {
    const mood = await Mood.create(req.body);
    res.status(201).json(mood);
  } catch (error: any) { res.status(400).json({ message: error.message }); }
};

export const updateMood = async (req: Request, res: Response) => {
  try {
    const mood = await Mood.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(mood);
  } catch (error: any) { res.status(400).json({ message: error.message }); }
};

export const deleteMood = async (req: Request, res: Response) => {
  try {
    await Mood.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Mood deleted' });
  } catch (error: any) { res.status(400).json({ message: error.message }); }
};

// --- STATS & RECOMMENDATIONS ---
export const getAllStats = async (req: Request, res: Response) => {
  try {
    const stats = await DashboardStats.find().populate('userId', 'name email');
    res.status(200).json(stats);
  } catch (error: any) { res.status(400).json({ message: error.message }); }
};

// We will implement recommendation manipulation based on the active moods/music
export const getRecommendationsConfig = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Recommendations Config Endpoint' });
};
