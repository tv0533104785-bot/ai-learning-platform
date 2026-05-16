import { Route, Routes } from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import History from "../pages/History"
import Admin from "../pages/Admin"
import Error404 from "../pages/Error404"
import App from "../App"

const AppRouter=()=> {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/history" element={<History />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

export default AppRouter