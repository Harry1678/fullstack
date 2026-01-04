import { ApiError } from "../utils/errors";
import { log } from "../utils/logger";

type RetryOptions = {
    retries?: number;
    baseDelayMs?: number;
};

const RETRY_STATUS = new Set([502, 503, 504, 429]);

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getBackoffDelay(
    attempt: number,
    baseDelay: number
): number {
    const exponential = baseDelay * Math.pow(2, attempt);
    const jitter = Math.random() * baseDelay;
    return exponential + jitter;
}

export async function withRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    const retries = options.retries ?? 3;
    const baseDelay = options.baseDelayMs ?? 200;

    let attempt = 0;

    while (true) {
        try {
            return await fn();
        } catch (err: unknown) {
  attempt++;

  if (!(err instanceof ApiError)) {
    throw err;
  }

  const status = err.context?.status;

  if (
    typeof status !== "number" ||
    !RETRY_STATUS.has(status) ||
    attempt > retries
  ) {
    throw err;
  }

  let delayMs = getBackoffDelay(attempt, baseDelay);

  const retryAfter = err.context?.retryAfter;
  if (typeof retryAfter === "number") {
    delayMs = retryAfter * 1000;
  }

  log("retry", { attempt, delayMs, status });

  await sleep(delayMs);
}
 
    }
}
