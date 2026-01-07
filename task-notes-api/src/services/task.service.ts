import { randomUUID } from 'node:crypto';
import { Task } from '../models/task';
import { FileStorage } from '../storage';

export class TaskService {
  constructor(private storage: FileStorage) {}

  async list(): Promise<Task[]> {
    return this.storage.loadNotes();
  }

  async getById(id: string): Promise<Task | null> {
    const tasks = await this.storage.loadNotes();
    return tasks.find(t => t.id === id) ?? null;
  }

  async create(input: Omit<Task, 'id' | 'completed' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const tasks = await this.storage.loadNotes();
    const now = new Date().toISOString();

    const task: Task = {
      id: randomUUID(),
      completed: false,
      createdAt: now,
      updatedAt: now,
      ...input,
    };

    tasks.push(task);
    await this.storage.saveNotes(tasks);
    return task;
  }

  async update(id: string, input: Partial<Task>): Promise<Task | null> {
    const tasks = await this.storage.loadNotes();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;

    tasks[idx] = {
      ...tasks[idx],
      ...input,
      updatedAt: new Date().toISOString(),
    };

    await this.storage.saveNotes(tasks);
    return tasks[idx];
  }

  async delete(id: string): Promise<boolean> {
    const tasks = await this.storage.loadNotes();
    const next = tasks.filter(t => t.id !== id);
    if (next.length === tasks.length) return false;

    await this.storage.saveNotes(next);
    return true;
  }
}
