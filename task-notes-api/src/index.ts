import 'dotenv/config';
import path from 'node:path';
import { loadConfig } from './config';
import { createLogger } from './logger';
import { FileStorage } from './storage';
import { TaskEventEmitter } from './events';
import { TaskServer } from './server';

const config = loadConfig();
const logger = createLogger(config.logLevel as any);


const dataFile = path.join(process.cwd(), 'data', 'tasks.json');
const storage = new FileStorage(dataFile);


const server = new TaskServer(config, storage);

const events = new TaskEventEmitter();

let running = true;

async function bootstrap() {
  const notes = await storage.loadNotes();
  logger.info('Loaded notes', { count: notes.length });

  events.on('task:created', (task) => {
    logger.info('Task created', task);
  });

  events.on('task:updated', (task) => {
    logger.info('Task updated', task);
  });

  events.on('task:deleted', (id) => {
    logger.info('Task deleted', { id });
  });

  await storage.watchChanges(() => {
    logger.info('Data file changed on disk');
  });

  await server.start();
}

async function shutdown(signal: string) {
  if (!running) return;
  running = false;

  logger.info(`Shutting down (${signal})`);
  await server.stop();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

bootstrap().then(() => {
  logger.info('Application ready', {
    env: config.env,
    port: config.port,
  });
});
