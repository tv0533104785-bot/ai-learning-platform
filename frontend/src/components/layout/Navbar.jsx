import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const { token, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
                AI Learning
            </Link>

            <div className="flex gap-4 items-center">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/history">History</Link>
                <Link to="/admin">Admin</Link>

                {!token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg">
                        Logout
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar