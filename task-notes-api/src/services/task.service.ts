import { TaskRepository } from '../repositories/task.repository';
import { mapDbError } from '../database/errors';

type UpdateTaskInput = {
  title?: string;
  priority?: 'low' | 'medium' | 'high';
  completed?: boolean;
};

export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository
  ) {}

  async list() {
    try {
      return await this.taskRepository.findAll();
    } catch (err: any) {
      throw mapDbError(err);
    }
  }

  async getById(id: number) {
    try {
      return await this.taskRepository.findById(id);
    } catch (err: any) {
      throw mapDbError(err);
    }
  }

  async create(data: {
    title: string;
    priority: 'low' | 'medium' | 'high';
    userId?: number;
  }) {
    try {
      return await this.taskRepository.create(
        data.title,
        data.priority,
        data.userId ?? null
      );
    } catch (err: any) {
      throw mapDbError(err);
    }
  }

  async update(id: number, data: UpdateTaskInput) {
    try {
      return await this.taskRepository.update(id, data);
    } catch (err: any) {
      throw mapDbError(err);
    }
  }

  async delete(id: number) {
    try {
      return await this.taskRepository.deleteById(id);
    } catch (err: any) {
      throw mapDbError(err);
    }
  }
}
