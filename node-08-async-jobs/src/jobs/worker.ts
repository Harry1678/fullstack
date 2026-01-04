import { dequeue, size } from "./queue";
import { sendEmail } from "../services/email.service";

let running = true;

export async function startWorker() {
  console.log("[worker] started");

  while (running) {
    const job = dequeue();

    if (!job) {
      await sleep(1000);
      continue;
    }

    job.status = "processing";
    job.startedAt = Date.now();

    console.log(`[worker] started job ${job.id}`);

    try {
      if (job.type === "send-email") {
        const { to, subject } = job.payload;
        await sendEmail(to, subject);
      }

      job.status = "completed";
      job.completedAt = Date.now();

      console.log(`[worker] completed job ${job.id}`);
    } catch (err) {
      job.status = "failed";
      console.error(`[worker] failed job ${job.id}`, err);
    }

    await sleep(1000); 
  }
}

export function stopWorker() {
  running = false;
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
