import express from 'express';
import { getJournals, createJournal } from '../controllers/journalController';

const router = express.Router();

router.route('/').get(getJournals).post(createJournal);

export default router;
