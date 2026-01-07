import { taskQueue } from './queue';

export class TaskScheduler {
  async scheduleReminder(taskId: string, when: Date) {
    await taskQueue.add(
      'task-reminder',
      { taskId },
      { delay: when.getTime() - Date.now() }
    );
  }

  async scheduleCleanup() {
    await taskQueue.add(
      'cleanup',
      {},
      { repeat: {pattern: '0 * * * *'} } 
    );
  }
}
