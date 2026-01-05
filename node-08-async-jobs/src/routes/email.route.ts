import { Router } from "express";
import { emailQueue } from "../jobs/email.queue.js";
import crypto from "crypto";

const router = Router();

router.post("/email", async (req, res) => {
  const { to, subject } = req.body;

  
  const idempotencyKey = crypto
    .createHash("sha256")
    .update(`${to}:${subject}`)
    .digest("hex");

  const job = await emailQueue.add(
    "send-email",
    { to, subject, idempotencyKey },
    {
      jobId: idempotencyKey, 
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000
      }
    }
  );

  res.json({
    message: "Email job queued (idempotent)",
    jobId: job.id,
    idempotencyKey
  });
});

export default router;
