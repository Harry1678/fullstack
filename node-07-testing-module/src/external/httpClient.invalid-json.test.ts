import { describe, it, expect, vi } from "vitest";
import { fetchExternalData } from "../../src/external/httpClient";

describe("Drill 5 – invalid JSON", () => {
  it("throws on invalid JSON", async () => {
    vi.stubGlobal(
      "fetch",
      async () =>
        ({
          text: async () => "NOT_JSON",
        }) as any
    );

    await expect(fetchExternalData("http://fake")).rejects.toThrow(
      "invalid_json_from_external"
    );
  });
});
