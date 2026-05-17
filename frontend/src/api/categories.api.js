import { apiRequest } from './client.js'

export function fetchCategories() {
  return apiRequest({ path: '/categories' })
}

export function fetchSubCategories(categoryId) {
  return apiRequest({ path: `/sub_categories/by-category/${categoryId}` })
}
