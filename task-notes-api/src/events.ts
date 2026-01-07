import { EventEmitter } from 'node:events';

export class TaskEventEmitter extends EventEmitter {
  emitTaskCreated(task: unknown) {
    this.emit('task:created', task);
  }

  emitTaskUpdated(task: unknown) {
    this.emit('task:updated', task);
  }

  emitTaskDeleted(id: string) {
    this.emit('task:deleted', id);
  }
}
