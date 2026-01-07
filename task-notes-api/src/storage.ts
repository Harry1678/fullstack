import { promises as fs } from 'node:fs';
import { watch } from 'node:fs';
import path from 'node:path';

export class FileStorage {
  constructor(private dataPath: string) {}

  async loadNotes(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveNotes(notes: any[]): Promise<void> {
    const dir = path.dirname(this.dataPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(this.dataPath, JSON.stringify(notes, null, 2));
  }

  async watchChanges(callback: () => void): Promise<void> {
    const dir = path.dirname(this.dataPath);
    await fs.mkdir(dir, { recursive: true });

    try {
      await fs.access(this.dataPath);
    } catch {
      await fs.writeFile(this.dataPath, '[]');
    }

    watch(this.dataPath, () => {
      callback();
    });
  }
}
