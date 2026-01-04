import { Worker } from "bullmq";
import { connection } from "./redis";
import { processEmailJob } from "./email.processor";

export const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    console.log(
      `[worker] job ${job.id} attempt ${job.attemptsMade + 1}`
    );

    await processEmailJob(job);
  },
  { connection }
);

emailWorker.on("failed", (job, err) => {
  console.error(
    `[worker] job ${job?.id} failed on attempt ${job?.attemptsMade}`,
    err
  );
});
