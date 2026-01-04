import { ApiError } from "../utils/errors";
import { log } from "../utils/logger";

const FAILURE_THRESHOLD = 3;
const OPEN_TIMEOUT_MS = 10_000;

let failures = 0;
let openedAt: number | null = null;

export async function withCircuitBreaker<T>(
  fn: () => Promise<T>
): Promise<T> {
  const now = Date.now();

  if (openedAt && now - openedAt < OPEN_TIMEOUT_MS) {
    throw new ApiError("CIRCUIT_OPEN", {
      retryAfterMs: OPEN_TIMEOUT_MS - (now - openedAt),
    });
  }

  try {
    const result = await fn();
    failures = 0;
    openedAt = null;
    return result;
  } catch (err) {
    failures++;

    if (failures >= FAILURE_THRESHOLD) {
      openedAt = Date.now();
      log("circuit", { state: "OPEN" });
    }

    throw err;
  }
}
