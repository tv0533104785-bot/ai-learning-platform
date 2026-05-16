import PageContainer from "../components/layout/PageContainer"
import PromptForm from "../components/prompts/PromptForm"

const Dashboard = () => {
    return (
        <PageContainer>
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

                <PromptForm />
            </div>
        </PageContainer>
    )
}

export default Dashboard