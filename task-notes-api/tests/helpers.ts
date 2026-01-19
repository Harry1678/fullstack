import path from 'node:path';
import fs from 'node:fs';
import { TaskServer } from '../src/server';
import { loadConfig } from '../src/config';

export function setupTestServer() {
  const dataDir = path.join(process.cwd(), 'data-test');
  fs.mkdirSync(dataDir, { recursive: true });

  const config = loadConfig();
  const server = new TaskServer(config);

  return { server, dataDir };
}

export function cleanup(dir: string) {
  fs.rmSync(dir, { recursive: true, force: true });
}
