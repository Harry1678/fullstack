import { parentPort, workerData } from "worker_threads";
import { fib } from "./fib.js";

const result = fib(workerData);
parentPort?.postMessage(result);
