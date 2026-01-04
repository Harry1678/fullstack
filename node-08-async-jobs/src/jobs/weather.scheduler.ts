import { weatherQueue } from "./weather.queue";

export async function scheduleWeatherJob() {
  await weatherQueue.add(
    "fetch-weather",
    {},
    {
      repeat: {
        every: 60_000 
      },
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000
      }
    }
  );

  console.log("[scheduler] weather job scheduled");
}
