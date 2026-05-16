import { Link } from "react-router-dom"
import PageContainer from "../components/layout/PageContainer"

const Home = () => {
    return (
        <PageContainer>
            <div className="text-center mt-24">
                <h1 className="text-5xl font-bold mb-6 text-blue-600">
                    AI Learning Platform
                </h1>

                <p className="text-xl text-gray-600 mb-10">
                    Learn anything with AI generated lessons.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/register"
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/login"
                        className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </PageContainer>
    )
}

export default Home