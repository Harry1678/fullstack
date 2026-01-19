import { apiRequest } from "./api.js";

export async function login(email, password) {
  const result = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("token", result.token);
  return result;
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
