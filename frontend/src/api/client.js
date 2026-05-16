const API_BASE = "http://127.0.0.1:8000";

export async function apiRequest({ path, method = "GET", body, token }) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();

  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    throw {
      status: res.status,
      type: data?.error?.type || "UNKNOWN_ERROR",
      message: data?.error?.message || text || `API error ${res.status}`,
    };
  }

  return data;
}