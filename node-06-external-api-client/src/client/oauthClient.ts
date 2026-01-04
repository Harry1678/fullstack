import { fetchJson } from "./fetchJson";
import { OAuthTokenResponse } from "./types";

type TokenCache = {
  token: string;
  expiresAt: number;
};

let cache: TokenCache | null = null;

const REFRESH_BUFFER_MS = 10_000;

export async function getAccessToken(): Promise<string> {
  const now = Date.now();

  if (cache && cache.expiresAt - REFRESH_BUFFER_MS > now) {
    return cache.token;
  }

  const res = await fetchJson<OAuthTokenResponse>(
    "https://auth.example.com/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    }
  );

  cache = {
    token: res.access_token,
    expiresAt: now + res.expires_in * 1000,
  };

  return cache.token;
}
