import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Home() {
  const { token } = useAuth()

  return (
    <div className="page-card">
      <h1>AI Learning Platform</h1>
      <p>Welcome to your learning platform. Register or login to generate lessons from AI prompts.</p>
      <div className="button-row">
        {token ? (
          <Link className="button" to="/dashboard">
            Dashboard
          </Link>
        ) : (
          <>
            <Link className="button" to="/login">
              Login
            </Link>
            <Link className="button button-secondary" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
