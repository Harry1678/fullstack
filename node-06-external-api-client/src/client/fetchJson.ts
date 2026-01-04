
import type { RequestInit } from "undici";
import { ApiError } from "../utils/errors";
import { log } from "../utils/logger";
import { generateRequestId } from "../utils/requestId";
import { metrics, recordStatus } from "../utils/metrics";

const DEFAULT_TIMEOUT = 5000;

export async function fetchJson<T>(
  url: string,
  options: RequestInit = {},
  timeoutMs = DEFAULT_TIMEOUT
): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  const requestId = generateRequestId();
  const start = Date.now();

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers ?? {}),
        "x-request-id": requestId,
      },
      signal: controller.signal,
    });

    const latency = Date.now() - start;
    metrics.latency.push(latency);
    recordStatus(res.status);

    log("http", {
      url,
      status: res.status,
      latency,
      requestId,
    });

    if (latency > 500) {
      log("warn", { message: "High latency", latency, url });
    }

    if (!res.ok) {
      const retryAfter = res.headers.get("retry-after");

      throw new ApiError("HTTP_ERROR", {
        status: res.status,
        url,
        requestId,
        retryAfter: retryAfter ? Number(retryAfter) : undefined,
      });
    }

    try {
      return (await res.json()) as T;
    } catch {
      throw new ApiError("INVALID_JSON", { url, requestId });
    }
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new ApiError("TIMEOUT", { url, timeoutMs, requestId });
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
}
