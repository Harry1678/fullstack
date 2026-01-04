import { describe, it, expect, vi } from "vitest";
import { fetchWeather } from "../../src/services/weather.service";

vi.useFakeTimers();

describe("Weather scheduler", () => {
  it("runs scheduled job", async () => {
    const spy = vi.spyOn(Math, "random").mockReturnValue(0.9);

    const promise = fetchWeather();

    await vi.advanceTimersByTimeAsync(500);

    const data = await promise;

    expect(data.temperature).toBeDefined();
    spy.mockRestore();
  });
});
