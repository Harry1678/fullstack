import { describe, it, expect, vi } from "vitest";
import { processEmailJob } from "../../src/jobs/email.processor";
import * as emailService from "../../src/services/email.service";

describe("Retry logic", () => {
  it("retries after failure", async () => {
    vi.spyOn(emailService, "sendEmail")
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValueOnce(undefined);

    const job = {
      data: {
        to: "a@b.com",
        subject: "Retry",
        idempotencyKey: "key-retry"
      }
    };

    await expect(processEmailJob(job)).rejects.toThrow();
    const result = await processEmailJob(job);

    expect(result).toBe("processed");
  });
});
