import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>AI Learning Platform</h1>
      <p>Use the admin page to inspect users and prompt history.</p>
      <Link to="/login">Login</Link>
    </div>
  )
}
