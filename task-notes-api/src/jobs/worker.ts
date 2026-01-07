import { Worker } from 'bullmq';
import { connection } from './queue';

export const worker = new Worker(
  'tasks',
  async (job) => {
    if (job.name === 'task-reminder') {
      const { taskId } = job.data;
      console.log('[JOB] reminder for task', taskId);
    }

    if (job.name === 'cleanup') {
      console.log('[JOB] cleanup running');
    }
  },
  { connection }
);
