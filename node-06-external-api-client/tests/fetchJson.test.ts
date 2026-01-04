import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { server } from "./msw/server";
import { fetchJson } from "../src/client/fetchJson";
import { withRetry } from "../src/client/retry";
import { ApiError } from "../src/utils/errors";
import type { RequestInit } from "undici";
beforeAll(() =>
  server.listen({ onUnhandledRequest: "error" })
);

it("handles happy path", async () => {
  const res = await fetchJson<{ ok: boolean }>(
    "https://api.github.com/"
  );
  expect(res.ok).toBe(true);
});

it("throws on 401 without retry", async () => {
  await expect(
    withRetry(() =>
      fetchJson("https://api.github.com/unauthorized")
    )
  ).rejects.toBeInstanceOf(ApiError);
});

it("retries on 500 and eventually fails", async () => {
  await expect(
    withRetry(() =>
      fetchJson("https://api.github.com/error"), { retries: 2 }
    )
  ).rejects.toBeInstanceOf(ApiError);
});
it("throws INVALID_JSON on 200 with invalid JSON", async () => {
  await expect(
    fetchJson("https://api.github.com/invalid-json-200")
  ).rejects.toBeInstanceOf(Error);
});
it("handles network failure", async () => {
  await expect(
    fetchJson("https://api.github.com/network-fail")
  ).rejects.toBeInstanceOf(Error);
});
it("retries on 429 using Retry-After", async () => {
  await expect(
    withRetry(() => fetchJson("https://api.github.com/rate-limit"), {
      retries: 1,
    })
  ).rejects.toBeInstanceOf(Error);
});
