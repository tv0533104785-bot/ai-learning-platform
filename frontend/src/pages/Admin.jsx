import PageContainer from "../components/layout/PageContainer"

const Admin = () => {
    return (
        <PageContainer>
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

                <p className="text-gray-600">
                    Here you will display all users and prompts.
                </p>
            </div>
        </PageContainer>
    )
}

export default Admin