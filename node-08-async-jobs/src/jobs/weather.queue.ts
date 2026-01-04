import { Queue } from "bullmq";
import { connection } from "./redis";

export const weatherQueue = new Queue("weather-queue", {
  connection,
});
