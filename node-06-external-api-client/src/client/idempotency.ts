import crypto from "node:crypto";
import type { RequestInit } from "undici";

export function withIdempotencyKey(
  options: RequestInit = {}
): RequestInit {
  return {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      "Idempotency-Key": crypto.randomUUID(),
    },
  };
}
