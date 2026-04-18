import express from 'express';
import { getMusic } from '../controllers/musicController';

const router = express.Router();

router.route('/').get(getMusic);

export default router;
