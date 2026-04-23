import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Peace API is running...');
});

import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import journalRoutes from './routes/journalRoutes';
import musicRoutes from './routes/musicRoutes';
import moodRoutes from './routes/moodRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import sessionRoutes from './routes/sessionRoutes';

// Import Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/journals', journalRoutes);
app.use('/api/v1/music', musicRoutes);
app.use('/api/v1/moods', moodRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/sessions', sessionRoutes);

// Secret Admin Panel
app.use('/admin-portal-xyz', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
