import { Router, Request, Response } from 'express';
import User from '../models/user';

const router = Router();

// GET /api/users/
router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().limit(50).lean();
  res.json({ users });
});

// POST /api/users/
router.post('/', async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// GET /api/users/:id
router.get('/:id', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).lean();
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
});

export default router;
