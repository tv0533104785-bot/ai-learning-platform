import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import History from './pages/History.jsx'
import Admin from './pages/Admin.jsx'
import Error404 from './pages/Error404.jsx'
import { useAuth } from './context/AuthContext.jsx'

function App() {
  const { token, logout } = useAuth()

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <div className="nav-links">
          {token ? (
            <>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
              <Link className="nav-link" to="/history">
                History
              </Link>
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
              <button className="button button-secondary" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
