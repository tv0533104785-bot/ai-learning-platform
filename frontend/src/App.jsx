import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'
import Error404 from './pages/Error404.jsx'
import { useAuth } from './context/AuthContext.jsx'

function App() {
  const { token, logout } = useAuth()

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/admin">Admin</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
