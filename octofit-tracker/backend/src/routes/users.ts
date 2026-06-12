import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/users/
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List users (placeholder)', users: [] });
});

// POST /api/users/
router.post('/', (req: Request, res: Response) => {
  const user = req.body;
  res.status(201).json({ message: 'Create user (placeholder)', user });
});

// GET /api/users/:id
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Get user (placeholder)', id: req.params.id });
});

export default router;
