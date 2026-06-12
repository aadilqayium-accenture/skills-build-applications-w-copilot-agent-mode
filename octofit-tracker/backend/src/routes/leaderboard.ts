import { Router, Request, Response } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

// GET /api/leaderboard/
router.get('/', async (_req: Request, res: Response) => {
  const entries = await Leaderboard.find().populate('user').sort({ points: -1 }).limit(50).lean();
  res.json({ entries });
});

export default router;
