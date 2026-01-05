import { sendEmail } from "../services/email.service.js";
import { isProcessed, markProcessed } from "./idempotency.js";

export async function processEmailJob(job: any) {
  const { to, subject, idempotencyKey } = job.data;

  if (await isProcessed(idempotencyKey)) {
    return "skipped";
  }

  await sendEmail(to, subject);
  await markProcessed(idempotencyKey);

  return "processed";
}
