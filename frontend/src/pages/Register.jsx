import RegisterForm from "../components/auth/RegisterForm"
import PageContainer from "../components/layout/PageContainer"

const Register = () => {
    return (
        <PageContainer>
            <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
                <RegisterForm />
            </div>
        </PageContainer>
    )
}

export default Register