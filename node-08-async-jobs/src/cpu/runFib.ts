import { Worker } from "worker_threads";

export function runFib(n: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL("./fib.worker.js", import.meta.url),
      { workerData: n }
    );

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", code => {
      if (code !== 0) reject(new Error(`Exit ${code}`));
    });
  });
}
