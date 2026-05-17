import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { fetchCategories, fetchSubCategories } from '../api/categories.api.js'
import { createPrompt } from '../api/prompts.api.js'

export default function Dashboard() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (err) {
        setError(err.message || 'Unable to load categories')
      }
    }

    loadCategories()
  }, [token, navigate])

  useEffect(() => {
    if (!categoryId) {
      setSubCategories([])
      setSubCategoryId('')
      return
    }

    const loadSubCategories = async () => {
      try {
        const data = await fetchSubCategories(categoryId)
        setSubCategories(data)
      } catch (err) {
        setError(err.message || 'Unable to load subcategories')
      }
    }

    loadSubCategories()
  }, [categoryId])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setResponse(null)
    setLoading(true)

    try {
      const data = await createPrompt(
        {
          category_id: Number(categoryId),
          sub_category_id: Number(subCategoryId),
          prompt,
        },
        token,
      )

      setResponse(data.response)
    } catch (err) {
      setError(err.message || 'Failed to generate lesson')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-card">
      <h1>Dashboard</h1>
      <p>Choose a category and write a prompt for the AI lesson.</p>
      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Category
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Subcategory
          <select value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)} required>
            <option value="">Select subcategory</option>
            {subCategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Prompt
          <textarea
            rows="5"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write a learning prompt..."
            required
          />
        </label>
        <button type="submit" disabled={loading || !categoryId || !subCategoryId || !prompt}>
          {loading ? 'Generating...' : 'Generate Lesson'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div className="prompt-card">
          <h2>Lesson Output</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}
