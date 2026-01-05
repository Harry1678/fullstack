import express from "express";
import emailRoute from "./routes/email.route.js";
import fibRoute from "./routes/fib.route.js";
import { fib } from "./cpu/fib.js";

export const app = express();

app.get("/", (req, res) => {
  res.json({
    pid: process.pid,
    message: "Hello from cluster worker"
  });
});

app.use(express.json());
app.use(emailRoute);
app.use(fibRoute);

app.get("/block", (req, res) => {
  const n = Number(req.query.n ?? 40);
  const result = fib(n);

  res.json({
    result,
    pid: process.pid
  });
});
import { runFib } from "./cpu/runFib.js";

app.get("/non-block", async (req, res) => {
  const n = Number(req.query.n ?? 40);
  const result = await runFib(n);
  res.json({ result, pid: process.pid });
});
