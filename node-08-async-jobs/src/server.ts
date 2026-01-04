import { app } from "./app";
import "./jobs/email.worker";
import "./jobs/weather.worker";
import { scheduleWeatherJob } from "./jobs/weather.scheduler";

app.listen(3000, async () => {
  console.log("Server running on port 3000");
  await scheduleWeatherJob();
});
