import { Router } from 'express';
import { ProjectService } from '../services/project.service';
import { mapDbError } from '../database/errors';

export function createProjectRouter(): Router {
  const router = Router();
  const service = new ProjectService();

  router.post('/', async (req, res) => {
    try {
      const { name, tasks } = req.body;

      // Basic validation
      if (typeof name !== 'string' || !Array.isArray(tasks)) {
        return res.status(400).json({ error: 'Invalid input' });
      }

      const result = await service.createProjectWithTasks(name, tasks);

      res.status(201).json(result);
    } catch (err: any) {
      const mapped = mapDbError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  return router;
}
