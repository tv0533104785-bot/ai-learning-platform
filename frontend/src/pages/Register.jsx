import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/auth.api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { validateName, validatePhone } from '../utils/validation.js'

export default function Register() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [nameError, setNameError] = useState(null)
  const [phoneError, setPhoneError] = useState(null)
  const [serverError, setServerError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value)
    if (value) {
      setNameError(validateName(value))
    } else {
      setNameError(null)
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
    setPhone(value)
    if (value) {
      setPhoneError(validatePhone(value))
    } else {
      setPhoneError(null)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setServerError(null)
    setLoading(true)

    const nameValidation = validateName(name)
    const phoneValidation = validatePhone(phone)
    if (nameValidation || phoneValidation) {
      setNameError(nameValidation)
      setPhoneError(phoneValidation)
      setLoading(false)
      return
    }

    try {
      const data = await register({ name, phone })
      loginUser(data.access_token)
      navigate('/dashboard')
    } catch (err) {
      const message = err.message || 'Registration failed'
      setServerError(message)
    } finally {
      setLoading(false)
    }
  }

  const isValid = name && phone && !nameError && !phoneError

  return (
    <div className="page-card">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="form-card">
        <label>
          Name
          <input
            value={name}
            onChange={handleNameChange}
            placeholder="Full name"
            type="text"
            required
          />
          {nameError && <span className="field-error">{nameError}</span>}
        </label>
        <label>
          Phone
          <input
            value={phone}
            onChange={handlePhoneChange}
            placeholder="05XXXXXXXX"
            type="tel"
            required
          />
          {phoneError && <span className="field-error">{phoneError}</span>}
        </label>
        <button type="submit" disabled={loading || !isValid}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {serverError && <div className="error-box">{serverError}</div>}
    </div>
  )
}
