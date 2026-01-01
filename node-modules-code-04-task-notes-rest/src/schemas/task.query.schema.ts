import { z } from "zod";

export const taskListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  completed: z.coerce.boolean().optional(),
  sort: z.enum(["createdAt", "title"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("asc"),
});
