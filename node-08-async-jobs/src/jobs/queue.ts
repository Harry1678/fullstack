import { Job } from "./types.js";

const queue: Job[] = [];

export function enqueue(job: Job) {
  queue.push(job);
}

export function dequeue(): Job | undefined {
  return queue.shift();
}

export function size() {
  return queue.length;
}
