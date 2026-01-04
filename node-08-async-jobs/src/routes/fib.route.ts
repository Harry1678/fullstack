import { Router } from "express";
import { Worker } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/fib", async (req, res) => {
  const n = Number(req.query.n ?? 40);

  const start = Date.now();

  const worker = new Worker(
    path.join(__dirname, "../workers/fib.worker.ts"),
    {
      workerData: { n },
    }
  );

  worker.on("message", (msg) => {
    const duration = Date.now() - start;
    res.json({ result: msg.result, duration });
  });

  worker.on("error", (err) => {
    res.status(500).json({ error: err.message });
  });
});

export default router;
