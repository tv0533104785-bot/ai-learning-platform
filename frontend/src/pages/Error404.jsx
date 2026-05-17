import { Link } from 'react-router-dom'

export default function Error404() {
  return (
    <div className="page-card">
      <h1>404 — Page not found</h1>
      <Link className="button" to="/">
        Go home
      </Link>
    </div>
  )
}
