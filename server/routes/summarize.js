const express = require('express')
const axios = require('axios')

const router = express.Router()

router.post('/', async (req, res) => {
  const { text } = req.body
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      { 
            inputs: text,
            parameters: {
              max_length: 3000,  // adjust this as needed
              min_length: 50,
              do_sample: false
            }
       },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    )

    const summary = response.data[0]?.summary_text || 'No summary found'
    res.json({ summary })
  } catch (err) {
    console.error(err.response?.data || err.message)
    res.status(500).json({ message: 'Summarization failed' })
  }
})

module.exports = router
