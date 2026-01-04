import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://ext.api/data", () =>
    HttpResponse.json({ value: 42 }, { status: 200 })
  ),

  http.get("https://ext.api/unauthorized", () =>
    HttpResponse.json({ error: "unauthorized" }, { status: 401 })
  ),

  http.get("https://ext.api/error", () =>
    HttpResponse.json({ error: "server_error" }, { status: 500 })
  ),

  http.get("https://ext.api/slow", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    return HttpResponse.json({ value: "slow" });
  }),
];
