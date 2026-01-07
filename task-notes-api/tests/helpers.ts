import path from 'node:path';
import fs from 'node:fs';
import Database from 'better-sqlite3';
import { FileStorage } from '../src/storage';
import { TaskServer } from '../src/server';
import { loadConfig } from '../src/config';

export function setupTestServer() {
  const dataDir = path.join(process.cwd(), 'data-test');
  fs.mkdirSync(dataDir, { recursive: true });

  const taskFile = path.join(dataDir, 'tasks.json');
  fs.writeFileSync(taskFile, '[]');

  const storage = new FileStorage(taskFile);
  const config = loadConfig();

  const server = new TaskServer(config, storage);
  return { server, dataDir };
}

export function cleanup(dir: string) {
  fs.rmSync(dir, { recursive: true, force: true });
}
