import express from 'express';
import { getMoods } from '../controllers/moodController';

const router = express.Router();

router.route('/').get(getMoods);

export default router;
