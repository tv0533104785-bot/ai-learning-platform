import { useEffect, useState } from "react"
import { getCategories, getSubCategories } from "../../api/categories.api"
import { createPrompt } from "../../api/prompts.api"
import { useAuth } from "../../context/AuthContext"

const PromptForm = () => {
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const [subCategoryId, setSubCategoryId] = useState("")
    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const { token } = useAuth()

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories()
            setCategories(data)
        };
        fetchCategories()
    }, [])

    const handleCategoryChange = async (e) => {
        const id = e.target.value
        setCategoryId(id)
        setSubCategoryId("");

        if (id) {
            const data = await getSubCategories(id)
            setSubCategories(data)
        } else {
            setSubCategories([])
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        setResponse("")

        try {
            const data = await createPrompt(
                {
                    category_id: Number(categoryId),
                    sub_category_id: Number(subCategoryId),
                    prompt,
                },
                token
            );
            setResponse(data.response)
        } catch (error) {
            console.error("Error generating lesson:", error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    onChange={handleCategoryChange}
                    className="w-full border p-3 rounded-xl"
                    value={categoryId}
                    disabled={isLoading}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <select
                    onChange={(e) => setSubCategoryId(e.target.value)}
                    className="w-full border p-3 rounded-xl"
                    value={subCategoryId}
                    disabled={isLoading || subCategories.length === 0}
                >
                    <option value="">Select Sub Category</option>
                    {subCategories.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                            {sub.name}
                        </option>
                    ))}
                </select>

                <textarea
                    placeholder="Ask AI what you want to learn..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full border p-4 rounded-xl h-40"
                    disabled={isLoading}
                />

                <button
                    type="submit"
                    disabled={isLoading || !categoryId || !subCategoryId || !prompt}
                    className={`w-full flex justify-center items-center gap-2 text-white px-6 py-3 rounded-xl transition-all font-medium
                        ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generate Lesson                        </>
                    ) : (
                        "Generate Lesson"
                    )}
                </button>
            </form>

            {response && (
                <div className="mt-10 bg-gray-100 p-6 rounded-2xl whitespace-pre-wrap">
                    {response}
                </div>
            )}
        </div>
    )
}

export default PromptForm