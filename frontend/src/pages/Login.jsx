import PageContainer from "../components/layout/PageContainer"
import LoginForm from "../components/auth/LoginForm"

const Login = () => {
    return (
        <PageContainer>
            <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

                <LoginForm />
            </div>
        </PageContainer>
    )
}

export default Login