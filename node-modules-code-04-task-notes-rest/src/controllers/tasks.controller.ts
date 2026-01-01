import { Request, Response } from "express";
import * as taskService from "../services/ tasks.service.js";
import { TaskListQuery, CreateTaskInput } from "../schemas/task.types";
import { AppError } from "../errors/AppError";
import { logger } from "../utils/logger";


export function listTasks(_req: Request, res: Response) {
  const tasks = taskService.getAllTasks();
  res.json({ data: tasks });
}


export function listTasksPaged(req: Request, res: Response) {
  if (!req.validatedQuery) {
    throw new AppError("Query middleware missing", 500);
  }

  const { page, limit, completed, sort, order } =
    req.validatedQuery as TaskListQuery;

  let tasks = taskService.getAllTasks();

 
  if (completed !== undefined) {
    tasks = tasks.filter(t => t.completed === completed);
  }

 
  tasks = [...tasks].sort((a, b) => {
    if (order === "asc") return a[sort] > b[sort] ? 1 : -1;
    return a[sort] < b[sort] ? 1 : -1;
  });

  
  const totalItems = tasks.length;
  const start = (page - 1) * limit;
  const data = tasks.slice(start, start + limit);

  res.json({
    data,
    meta: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      hasNext: page * limit < totalItems,
      hasPrev: page > 1,
    },
  });
}


export function addTask(req: Request, res: Response) {
  const body = req.validatedBody as CreateTaskInput;
  const task = taskService.createTask(body.title);

  logger.info(
    {
      taskId: task.id,
      requestId: req.id,
    },
    "Task created"
  );

  res.status(201).json({ data: task });
}


export function getTask(req: Request, res: Response) {
  const task = taskService.getTaskById(req.params.id);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  res.json({ data: task });
}

export function updateTask(req: Request, res: Response) {
  const task = taskService.updateTask(req.params.id, req.body);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  logger.info(
    {
      taskId: task.id,
      requestId: req.id,
    },
    "Task updated"
  );

  res.json({ data: task });
}


export function removeTask(req: Request, res: Response) {
  const ok = taskService.deleteTask(req.params.id);

  if (!ok) {
    throw new AppError("Task not found", 404);
  }

  logger.warn(
    {
      taskId: req.params.id,
      requestId: req.id,
    },
    "Task deleted"
  );

  res.status(204).send();
}
