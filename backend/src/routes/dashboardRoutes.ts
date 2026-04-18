import express from 'express';
import { getDashboardData } from '../controllers/dashboardController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(verifyToken, getDashboardData);

export default router;
