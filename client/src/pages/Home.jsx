import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

function Home() {
  const [text, setText] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleSummarize = async () => {
    const token = localStorage.getItem('token')
    setLoading(true)
    setSummary('')
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/summarize`, { text }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSummary(res.data.summary)
    } catch (err) {
      alert('Summarization failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4 fw-bold">Text Summarizer</h2>

      {/* Flex container for input and output */}
      <div className="d-flex flex-wrap justify-content-between gap-4">
        {/* Input box */}
        <div style={{ flex: '1 1 48%', minWidth: '300px' }}>
          <textarea
            className="form-control mb-3"
            rows="10"
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="d-grid">
            <button className="btn btn-success btn-lg" onClick={handleSummarize} disabled={loading}>
              {loading ? 'Summarizing...' : 'Summarize'}
            </button>
          </div>
        </div>

        {/* Output box */}
        <div style={{ flex: '1 1 48%', minWidth: '300px' }}>
          {loading && (
            <div className="alert alert-warning fw-semibold text-center">Summarizing...</div>
          )}
          {summary && !loading && (
            <div className="alert alert-info">
              <h5 className="fw-semibold">Summary:</h5>
              <p className="mb-0">{summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
