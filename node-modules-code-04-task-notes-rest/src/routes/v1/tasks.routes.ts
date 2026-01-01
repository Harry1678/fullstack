import { Router } from "express";
import {
  listTasks,
  listTasksPaged,
  addTask,
  getTask,
  updateTask,
  removeTask,
} from "../../controllers/tasks.controller";

import { validate } from "../../middleware/validate";
import { validateQuery } from "../../middleware/validateQuery";
import { createTaskSchema } from "../../schemas/task.schema";
import { taskListQuerySchema } from "../../schemas/task.query.schema";

const router = Router();

router.get("/tasks", listTasks);

router.get(
  "/tasks/paged",
  validateQuery(taskListQuerySchema),
  listTasksPaged
);

router.post("/tasks", validate(createTaskSchema), addTask);
router.get("/tasks/:id", getTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", removeTask);

export default router;


/**
 * @openapi
 * /v1/tasks:
 *   get:
 *     summary: Get all tasks (v1)
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */


/**
/**
 * @openapi
 * /v1/tasks:
 *   post:
 *     summary: Create a new task (v1)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskInput'
 *           example:
 *             title: "Learn OpenAPI"
 *     responses:
 *       201:
 *         description: Task created
 *       400:
 *         description: Validation error
 */


/**
 * @openapi
 * /v1/tasks/paged:
 *   get:
 *     summary: Get paginated tasks (v1)
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
 *     responses:
 *       200:
 *         description: Paginated tasks
 */
