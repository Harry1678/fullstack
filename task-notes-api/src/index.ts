import 'dotenv/config';
import { loadConfig } from './config';
import { createLogger } from './logger';
import { TaskEventEmitter } from './events';
import { TaskServer } from './server';
import { postgresPool } from './database/postgres';


const config = loadConfig();
const logger = createLogger(config.logLevel as any);

const server = new TaskServer(config);
const events = new TaskEventEmitter();

let running = true;

async function bootstrap() {
 
  logger.info('Starting application');

  events.on('task:created', (task) => {
    logger.info('Task created', task);
  });

  events.on('task:updated', (task) => {
    logger.info('Task updated', task);
  });

  events.on('task:deleted', (id) => {
    logger.info('Task deleted', { id });
  });

  await server.start();
}
async function shutdown(signal: string) {
  if (!running) return;
  running = false;

  logger.info(`Shutting down (${signal})`);

  await server.stop();        
  await postgresPool.end();   

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
