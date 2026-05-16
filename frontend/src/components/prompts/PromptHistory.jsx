import { useEffect, useState } from "react"
import { getMyPrompts } from "../../api/prompts.api"
import { useAuth } from "../../context/AuthContext"

const PromptHistory = () => {
  const [prompts, setPrompts] = useState([])
  const [openId, setOpenId] = useState(null)
  const { token } = useAuth()

  useEffect(() => {
    if (token) loadPrompts()
  }, [token])

  const loadPrompts = async () => {
    try {
      const data = await getMyPrompts(token)
      setPrompts(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Error loading prompts:", err)
    }
  }

  const toggleOpen = (id) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  if (!prompts.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No lessons generated yet.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {prompts.map((item) => {
        const isOpen = openId === item.id

        return (
          <div
            key={item.id}
            className="border rounded-2xl bg-white shadow-sm overflow-hidden transition"
          >
            <button
              onClick={() => toggleOpen(item.id)}
              className="w-full text-left p-5 hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-start gap-4">
                
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {item.prompt}
                  </h2>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {item.category_name}
                    </span>

                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                      {item.sub_category_name}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-400 whitespace-nowrap">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString()
                    : "No date"}
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 border-t bg-gray-50">
                <div className="pt-4">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    AI Lesson
                  </h3>

                  <p className="text-gray-700 whitespace-pre-wrap leading-7">
                    {item.response}
                  </p>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PromptHistory