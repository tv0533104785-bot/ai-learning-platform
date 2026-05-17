import { apiRequest } from './client.js'

export function createPrompt(body, token) {
  return apiRequest({ path: '/prompts', method: 'POST', body, token })
}

export function fetchPromptHistory(token) {
  return apiRequest({ path: '/prompts/me', method: 'GET', token })
}
