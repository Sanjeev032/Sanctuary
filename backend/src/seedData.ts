import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Mood from './models/Mood';
import Music from './models/Music';
import DashboardStats from './models/DashboardStats';
import User from './models/User';

dotenv.config();

const moods = [
  {
    name: 'Calm',
    color: '#3e6842',
    gradient: 'radial-gradient(circle at 0% 0%, #fbf9f2 0%, #3e6842 100%)',
    animationType: 'breath'
  },
  {
    name: 'Focus',
    color: '#306767',
    gradient: 'radial-gradient(circle at 0% 0%, #fbf9f2 0%, #306767 100%)',
    animationType: 'pulse'
  },
  {
    name: 'Joy',
    color: '#7d562d',
    gradient: 'radial-gradient(circle at 0% 0%, #fbf9f2 0%, #7d562d 100%)',
    animationType: 'pulse'
  },
  {
    name: 'Energy',
    color: '#7ba77c',
    gradient: 'radial-gradient(circle at 0% 0%, #fbf9f2 0%, #7ba77c 100%)',
    animationType: 'breath'
  }
];

const music = [
  {
    title: 'Ethereal Forest',
    url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_7833324f1c.mp3',
    type: 'ambient',
    moodTags: ['Calm', 'Energy'],
    isActive: true
  },
  {
    title: 'Alpha Waves',
    url: 'https://cdn.pixabay.com/audio/2022/02/10/audio_f9c18256a4.mp3',
    type: 'binaural',
    moodTags: ['Focus'],
    isActive: true
  },
  {
    title: 'Morning Sun',
    url: 'https://cdn.pixabay.com/audio/2021/11/25/audio_91b131f4fc.mp3',
    type: 'nature',
    moodTags: ['Joy', 'Energy'],
    isActive: true
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/peace';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data (optional, but good for a fresh start)
    await Mood.deleteMany({});
    await Music.deleteMany({});

    // Seed Moods
    await Mood.insertMany(moods);
    console.log('Moods seeded successfully');

    // Seed Music
    await Music.insertMany(music);
    console.log('Music seeded successfully');

    // Create some initial stats for all users (optional)
    const users = await User.find({});
    for (const user of users) {
        const statsExists = await DashboardStats.findOne({ userId: user._id });
        if (!statsExists) {
            await DashboardStats.create({
                userId: user._id,
                sleepQuality: 85,
                mindfulMinutes: 30,
                moodStability: 90,
                focusFlow: 75
            });
        }
    }
    console.log('Dashboard stats ensured for users');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
