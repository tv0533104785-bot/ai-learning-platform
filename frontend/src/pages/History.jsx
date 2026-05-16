import PageContainer from "../components/layout/PageContainer"
import PromptHistory from "../components/prompts/PromptHistory"

const History = () => {
    return (
        <PageContainer>
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-4xl font-bold mb-8">Learning History</h1>
                <PromptHistory/>
            </div>
        </PageContainer>
    )
}

export default History