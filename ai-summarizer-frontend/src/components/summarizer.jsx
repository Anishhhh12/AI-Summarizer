import { useState } from 'react';
import axios from 'axios';

function Summarizer() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setSummary('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/summarize', {
        text: input,
      });
      setSummary(res.data.summary);
    } catch (err) {
      console.error('API Error:', err);
      setError('Something went wrong while summarizing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Text Summarizer 🧠</h1>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto">
        {/* Input Section */}
        <div className="flex-1 flex flex-col">
          <textarea
            rows={15}
            placeholder="Paste long text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md resize-y text-sm"
          />

          <button
            onClick={handleSummarize}
            disabled={loading}
            className={`mt-4 px-6 py-2 rounded-md text-white font-medium ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Summarizing...' : 'Summarize'}
          </button>

          {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        </div>

        {/* Summary Section */}
        <div className="flex-1 bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-2">Summary:</h3>
          <div className="text-gray-800 whitespace-pre-wrap text-sm">
            {summary || <span className="text-gray-400">Summary will appear here...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summarizer;
