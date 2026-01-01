import { randomUUID } from "node:crypto";
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};
const tasks: Task[] = [];


export function getAllTasks(): Task[] {
  return tasks;
}


export function createTask(title: string): Task {
  const task: Task = {
    id: randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  return task;
}


export function getTaskById(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}


export function updateTask(
  id: string,
  data: { title?: string; completed?: boolean }
): Task | undefined {
  const task = getTaskById(id);
  if (!task) return undefined;

  if (data.title !== undefined) task.title = data.title;
  if (data.completed !== undefined) task.completed = data.completed;

  return task;
}


export function deleteTask(id: string): boolean {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}