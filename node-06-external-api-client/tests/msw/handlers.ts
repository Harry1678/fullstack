import { http, HttpResponse, delay } from "msw";

export const handlers = [
  
  http.get("https://api.github.com/", () => {
    return HttpResponse.json({ ok: true });
  }),

 
  http.get("https://api.github.com/unauthorized", () => {
    return new HttpResponse(null, { status: 401 });
  }),

  http.get("https://api.github.com/error", () => {
    return new HttpResponse(null, { status: 500 });
  }),

 
  http.get("https://api.github.com/slow", async () => {
    await delay(6000);
    return HttpResponse.json({ slow: true });
  }),

  
  http.get("https://api.github.com/invalid-json", () => {
    return new HttpResponse("not-json", {
      headers: { "Content-Type": "application/json" },
    });
  }),

  
  http.post("https://auth.example.com/token", () => {
    return HttpResponse.json({
      access_token: "mock_access_token",
      expires_in: 60,
      token_type: "Bearer",
    });
  }),
];
http.get("https://api.github.com/", () => {
  console.log(" MSW INTERCEPTED");
  return HttpResponse.json({ ok: true });
});


http.get("https://api.github.com/invalid-json-200", () => {
  return new HttpResponse("not-json", {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

http.get("https://api.github.com/rate-limit", () => {
  return new HttpResponse(null, {
    status: 429,
    headers: { "Retry-After": "1" },
  });
});
