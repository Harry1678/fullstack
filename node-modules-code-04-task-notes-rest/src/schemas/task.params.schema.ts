import { z } from "zod";

export const taskParamsSchema = z.object({
  id: z.string().min(1, "Task id is required"),
});
