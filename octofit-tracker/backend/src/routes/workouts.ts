import { Router, Request, Response } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().populate('user').limit(50).lean();
  res.json({ workouts });
});

router.post('/', async (req: Request, res: Response) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

router.get('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params.id).populate('user').lean();
  if (!workout) return res.status(404).json({ message: 'Not found' });
  res.json(workout);
});

export default router;
