import { apiRequest } from './client.js'

export function login(body) {
  return apiRequest({ path: '/auth/login', method: 'POST', body })
}

export function register(body) {
  return apiRequest({ path: '/auth/register', method: 'POST', body })
}
