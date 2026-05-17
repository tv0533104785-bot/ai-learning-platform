import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { fetchPromptHistory } from '../api/prompts.api.js'
import { formatDate, formatCategory } from '../utils/format.js'

export default function History() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [prompts, setPrompts] = useState([])
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    const loadHistory = async () => {
      try {
        const data = await fetchPromptHistory(token)
        setPrompts(data)
      } catch (err) {
        setError(err.message || 'Unable to load prompt history')
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [token, navigate])

  if (loading) {
    return <div className="page-card">Loading history...</div>
  }

  return (
    <div className="page-card">
      <h1>My Prompt History</h1>
      {error ? (
        <div className="error-box">{error}</div>
      ) : prompts.length === 0 ? (
        <p className="text-muted">No prompts yet.</p>
      ) : selectedPrompt ? (
        <div>
          <button className="button button-secondary" onClick={() => setSelectedPrompt(null)}>
            ← Back to list
          </button>
          <div className="prompt-card" style={{ marginTop: '16px' }}>
            <h2>Full Lesson</h2>
            <p><strong>Category:</strong> {formatCategory(selectedPrompt.category_name, selectedPrompt.sub_category_name)}</p>
            <p><strong>Date:</strong> {formatDate(selectedPrompt.created_at)}</p>
            <p><strong>Your Prompt:</strong></p>
            <p className="prompt-text">{selectedPrompt.prompt}</p>
            <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
            <p><strong>AI Lesson:</strong></p>
            <p className="response-text">{selectedPrompt.response || 'No response yet'}</p>
          </div>
        </div>
      ) : (
        <div className="prompt-list">
          {prompts.map((prompt) => (
            <button
              key={prompt.id}
              className="prompt-header"
              onClick={() => setSelectedPrompt(prompt)}
              style={{ textAlign: 'left' }}
            >
              <div className="prompt-header-content">
                <h3 style={{ margin: '0 0 8px 0' }}>
                  {formatCategory(prompt.category_name, prompt.sub_category_name)}
                </h3>
                <time className="text-muted">{formatDate(prompt.created_at)}</time>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.95em' }}>{prompt.prompt.substring(0, 80)}...</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
