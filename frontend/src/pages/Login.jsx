import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth.api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { validatePhone } from '../utils/validation.js'

export default function Login() {
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState(null)
  const [serverError, setServerError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

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

    const phoneValidation = validatePhone(phone)
    if (phoneValidation) {
      setPhoneError(phoneValidation)
      setLoading(false)
      return
    }

    try {
      const data = await login({ phone })
      loginUser(data.access_token)
      navigate('/dashboard')
    } catch (err) {
      const message = err.message || 'Login failed'
      setServerError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form-card">
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

        <button type="submit" disabled={loading || !!phoneError || !phone}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {serverError && <div className="error-box">{serverError}</div>}
    </div>
  )
}
