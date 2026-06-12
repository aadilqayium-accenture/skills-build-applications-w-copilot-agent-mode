import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List teams (placeholder)', teams: [] });
});

router.post('/', (req: Request, res: Response) => {
  const team = req.body;
  res.status(201).json({ message: 'Create team (placeholder)', team });
});

router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Get team (placeholder)', id: req.params.id });
});

export default router;
