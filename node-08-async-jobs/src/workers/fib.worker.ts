import { parentPort, workerData } from "worker_threads";

function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

try {
  const { n } = workerData;
  const result = fib(n);

  parentPort?.postMessage({ result });
} catch (err) {
  parentPort?.postMessage({ error: "Worker failed" });
}
