import { Router } from "express";
import { listTasksPaged } from "../../controllers/tasks.controller";
import { validateQuery } from "../../middleware/validateQuery";
import { taskListQuerySchema } from "../../schemas/task.query.schema";

const router = Router();

/**
 * @openapi
 * /v2/tasks:
 *   get:
 *     summary: Get tasks with pagination, filtering and sorting (v2)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *           example: false
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: createdAt
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           example: asc
 *     responses:
 *       200:
 *         description: Paginated list of tasks
 */

router.get(
  "/tasks",
  validateQuery(taskListQuerySchema),
  listTasksPaged
);

export default router;
