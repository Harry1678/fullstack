import { app } from "./app.js";
import { scheduleWeatherJob } from "./jobs/weather.scheduler.js";

const PORT = 3000;

const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  if (process.env.NODE_ENV !== "test") {
    await scheduleWeatherJob();
  }
});

const shutdown = (signal: string) => {
  console.log(`Shutting down gracefully (${signal})...`);
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
