import express from 'express';
import { verifyToken, isAdmin } from '../middleware/authMiddleware';
import { addMusic, updateMusic, deleteMusic, addMood, updateMood, deleteMood, getAllStats, getRecommendationsConfig } from '../controllers/adminController';

const router = express.Router();

router.use(verifyToken);
router.use(isAdmin);

router.get('/dashboard', (req, res) => res.json({ message: 'Welcome to the secret Admin Portal' }));

router.route('/music').post(addMusic);
router.route('/music/:id').put(updateMusic).delete(deleteMusic);

router.route('/moods').post(addMood);
router.route('/moods/:id').put(updateMood).delete(deleteMood);

router.route('/stats').get(getAllStats);
router.route('/recommendations').get(getRecommendationsConfig);

export default router;
