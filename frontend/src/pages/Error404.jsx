import { Link } from "react-router-dom"

export default function Error404() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>

      <p className="text-xl text-gray-600 mb-8">Page not found</p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Go Home
      </Link>
    </div>
  )
}