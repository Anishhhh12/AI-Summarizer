const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')
const summarizeRoute = require('./routes/summarize')
const feedbackRoute = require('./routes/Feedback')
const { verifyToken } = require('./middleware/auth')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/summarize', verifyToken, summarizeRoute)
app.use('/api/feedback', verifyToken, feedbackRoute)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => console.log('Server started on port 5000'))
  })
  .catch(err => console.error(err))