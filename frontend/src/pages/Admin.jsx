import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAdminUsers } from '../api/admin.api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Admin() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    const load = async () => {
      try {
        const data = await fetchAdminUsers(token)
        setUsers(data)
      } catch (err) {
        setError(err.message || 'Could not load admin data')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [token, navigate])

  if (loading) {
    return <p>Loading admin dashboard...</p>
  }

  if (error) {
    return <div>
      <h1>Admin Dashboard</h1>
      <p className="error">{error}</p>
    </div>
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Showing all users and their prompt history.</p>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <section key={user.phone} className="user-card">
            <h2>{user.name} ({user.phone})</h2>
            {user.prompts.length === 0 ? (
              <p>No prompts yet.</p>
            ) : (
              <div className="prompt-list">
                {user.prompts.map((prompt) => (
                  <article key={prompt.id} className="prompt-item">
                    <p><strong>Prompt:</strong> {prompt.prompt}</p>
                    <p><strong>Response:</strong> {prompt.response || 'No response'}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        ))
      )}
    </div>
  )
}
