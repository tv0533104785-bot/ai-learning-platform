import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../api/client.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const data = await apiRequest({ path: '/auth/login', method: 'POST', body: { phone } })
      loginUser(data.access_token)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Phone
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone"
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
