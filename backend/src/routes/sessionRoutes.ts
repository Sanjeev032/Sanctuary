import express from 'express';
import { recordBreathingSession } from '../controllers/sessionController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// Apply auth middleware to all session routes
router.use(verifyToken);

router.post('/breathing', recordBreathingSession);

export default router;
