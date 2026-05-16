import { useState } from "react"
import { login } from "../../api/auth.api"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showSignup, setShowSignup] = useState(false)

    const { loginUser } = useAuth()
    const navigate = useNavigate()

    const validate = () => {
        if (!phone.trim()) return "Phone is required"
        if (phone.length!=10) return "Phone number is not validate"
        if (!/^[0-9+\-]+$/.test(phone)) return "Invalid phone format"
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setShowSignup(false)

        const validationError = validate()
        if (validationError) {
            setError(validationError)
            return
        }

        try {
            setLoading(true)

            const data = await login({ phone })

            loginUser(data.access_token)
            navigate("/dashboard")

        } catch (err) {
            const message = err?.message || "Login failed"
            setError(message)

            if (err?.type === "USER_NOT_FOUND") {
                setShowSignup(true)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                />

                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <button
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? "Loading..." : "Login"}
                </button>

                {showSignup && (
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="w-full border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition"
                    >
                        Create new account
                    </button>
                )}

            </form>
        </div>
    )
}

export default LoginForm