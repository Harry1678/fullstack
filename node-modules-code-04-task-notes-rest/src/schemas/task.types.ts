import { z } from "zod";
import { taskListQuerySchema } from "./task.query.schema";
import { createTaskSchema } from "./task.schema";

export type TaskListQuery = z.infer<typeof taskListQuerySchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
