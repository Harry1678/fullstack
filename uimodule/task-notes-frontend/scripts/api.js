const API_BASE_URL = "http://localhost:3000";

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
export function getTasks() {
  return apiRequest("/tasks");
}

export function createTask(data) {
  return apiRequest("/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateTask(id, data) {
  return apiRequest(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteTask(id) {
  return apiRequest(`/tasks/${id}`, {
    method: "DELETE",
  });
}
