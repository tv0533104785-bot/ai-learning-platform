// Validation functions
export function validateName(name) {
  if (!name || name.trim().length === 0) {
    return 'Name is required'
  }
  if (name.length < 2) {
    return 'Name must be at least 2 characters'
  }
  if (name.length > 20) {
    return 'Name must be at most 20 characters'
  }
  return null
}

export function validatePhone(phone) {
  if (!phone) {
    return 'Phone is required'
  }
  if (!/^05\d{8}$/.test(phone)) {
    return 'Phone must be a valid Israeli number (05XXXXXXXX)'
  }
  return null
}

export function validatePrompt(prompt) {
  if (!prompt || prompt.trim().length === 0) {
    return 'Prompt cannot be empty'
  }
  if (prompt.length < 2) {
    return 'Prompt must be at least 2 characters'
  }
  if (prompt.length > 2000) {
    return 'Prompt must be at most 2000 characters'
  }
  return null
}
