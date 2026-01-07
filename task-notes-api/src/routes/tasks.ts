import { Router } from 'express';
import { TaskService } from '../services/task.service';
import { createTaskSchema, updateTaskSchema } from './task.schema';
import { authenticate } from '../auth/middleware';

export function createTaskRouter(service: TaskService): Router {
  const router = Router();

  router.get('/', async (_req, res) => {
    res.json(await service.list());
  });
  router.use(authenticate);
  router.get('/:id', async (req, res) => {
    const task = await service.getById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Not found' });
    res.json(task);
  });

  router.post('/', async (req, res) => {
    const parsed = createTaskSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);

    const task = await service.create(parsed.data);
    res.status(201).json(task);
  });

  router.put('/:id', async (req, res) => {
    const parsed = updateTaskSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);

    const task = await service.update(req.params.id, parsed.data);
    if (!task) return res.status(404).json({ error: 'Not found' });
    res.json(task);
  });

  router.delete('/:id', async (req, res) => {
    const ok = await service.delete(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  });

  return router;
}
