import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { server } from "../msw/server";
import { fetchExternalData } from "../../src/external/httpClient";
import { http } from "msw";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "bypass" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("external http client (msw)", () => {
  it("handles 200 OK", async () => {
    const data = await fetchExternalData("https://ext.api/data");
    expect(data.value).toBe(42);
  });

  it("handles 401 error", async () => {
    await expect(
      fetchExternalData("https://ext.api/unauthorized")
    ).rejects.toThrow("external_error_401");
  });

  it("handles 500 error", async () => {
    await expect(fetchExternalData("https://ext.api/error")).rejects.toThrow(
      "external_error_500"
    );
  });
});
http.get("https://ext.api/bad-json", () => {
  return new Response("{ invalid json", { status: 200 });
});
it("throws parse error on invalid JSON", async () => {
  await expect(fetchExternalData("https://ext.api/bad-json")).rejects.toThrow(
    "external_invalid_json"
  );
});
