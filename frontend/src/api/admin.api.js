import { apiRequest } from './client.js'

export async function fetchAdminUsers(token) {
  return apiRequest({ path: '/admin/users', method: 'GET', token })
}
