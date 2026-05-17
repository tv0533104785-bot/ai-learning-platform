const API_BASE = 'http://localhost:8000'

export async function apiRequest({ path, method = 'GET', body, token }) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  let data = null

  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }

  if (!res.ok) {
    const message = data?.error?.message || data?.message || `API error ${res.status}`
    throw new Error(message)
  }

  return data
}
