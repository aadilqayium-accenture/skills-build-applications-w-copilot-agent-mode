import { Router, Request, Response } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user').limit(100).lean();
  res.json({ activities });
});

router.post('/', async (req: Request, res: Response) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

router.get('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findById(req.params.id).populate('user').lean();
  if (!activity) return res.status(404).json({ message: 'Not found' });
  res.json(activity);
});

export default router;
