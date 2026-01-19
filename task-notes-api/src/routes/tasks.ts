import { Router } from 'express';
import { TaskService } from '../services/task.service';
import { createTaskSchema, updateTaskSchema } from './task.schema';
import { authenticate } from '../auth/middleware';

export function createTaskRouter(service: TaskService): Router {
  const router = Router();


  router.get('/', async (_req, res) => {
    const tasks = await service.list();
    res.json(tasks);
  });

 
  router.use(authenticate);


  router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task id' });
    }

    const task = await service.getById(id);
    if (!task) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(task);
  });


  router.post('/', async (req, res) => {
    const parsed = createTaskSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const task = await service.create(parsed.data);
    res.status(201).json(task);
  });


  router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task id' });
    }

    const parsed = updateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const task = await service.update(id, parsed.data);
    if (!task) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(task);
  });

 
  router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task id' });
    }

    const ok = await service.delete(id);
    if (!ok) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.status(204).end();
  });

  return router;
}
