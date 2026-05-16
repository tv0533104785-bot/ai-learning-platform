import { useState } from "react"
import { register } from "../../api/auth.api"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [showSignup, setShowSignup] = useState(false)

    const { loginUser } = useAuth();
    const navigate = useNavigate()

    const validate = () => {
        if (!name || name.trim().length < 2)
            return "Name must be at least 2 characters"

        if (!phone || !phone.trim()) return "Phone is required"
        if (phone.length != 10) return "Phone number is not validate"
        if (!/^[0-9+\-]+$/.test(phone) || !/^05\d{8}$/.test(phone)) return "Invalid phone format"
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
            setLoading(true);

            const data = await register({ name, phone })

            loginUser(data.access_token)
            navigate("/dashboard")
        } catch (err) {
            setError(err?.message || "Something went wrong")

            if (err?.type === "USER_ALREADY_EXISTS") {
                setShowSignup(true)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-3 rounded-xl"
            />

            <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border p-3 rounded-xl"
            />

            {error && (
                <div className="text-red-500 text-sm">
                    {error}
                </div>
            )}

            <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl disabled:opacity-50"
            >
                {loading ? "Loading..." : "Register"}
            </button>

            {showSignup && (
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition"
                >
                    Login
                </button>
            )}
        </form>
    );
};

export default RegisterForm;