import { Queue } from "bullmq";
import { connection } from "./redis.js";

export const weatherQueue = new Queue("weather", { connection });

export async function scheduleWeatherJob() {
  const existing = await weatherQueue.getRepeatableJobs();

  if (existing.length > 0) {
    console.log("[scheduler] weather job already exists, skipping");
    return;
  }

  await weatherQueue.add(
    "fetch-weather",
    {},
    {
      repeat: { every: 60_000 },
      removeOnComplete: true,
      removeOnFail: true
    }
  );

  console.log("[scheduler] weather job scheduled");
}
