import { Worker } from "bullmq";
import { connection } from "./redis.js";
import { fetchWeather } from "../services/weather.service.js";

let lastRun: string | null = null;

export const weatherWorker = new Worker(
  "weather-queue",
  async (job) => {
    const start = Date.now();

    console.log(`[weather] run started (job ${job.id})`);

    const data = await fetchWeather();

    lastRun = data.fetchedAt;

    console.log(
      `[weather] temperature=${data.temperature}°C duration=${Date.now() - start}ms`
    );
  },
  {
    connection,
    concurrency: 1 
  }
);

weatherWorker.on("failed", (job, err) => {
  console.error(
    `[weather] job failed (attempt ${job?.attemptsMade})`,
    err.message
  );
});
