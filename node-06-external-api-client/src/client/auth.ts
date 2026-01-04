import { RequestInit } from "undici";

export function withAuth(
  token: string,
  options: RequestInit = {}
): RequestInit {
  return {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
  };
}
