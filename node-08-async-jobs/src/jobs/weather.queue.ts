import { Queue } from "bullmq";
import { connection } from "./redis.js";

export const weatherQueue = new Queue("weather-queue", {
  connection,
});
