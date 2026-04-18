import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', verifyToken, getMe);

export default router;
