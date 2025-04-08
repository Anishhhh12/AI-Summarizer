const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')
const summarizeRoute = require('./routes/summarize')
const feedbackRoute = require('./routes/feedback')
const { verifyToken } = require('./middleware/auth')

dotenv.config()
const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-summarizer-flame-tau.vercel.app",
  "https://ai-summarizer-pnavzgs5p-anishhhh12s-projects.vercel.app", // 👈 new one
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));



app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/summarize', verifyToken, summarizeRoute)
app.use('/api/feedback', verifyToken, feedbackRoute)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const PORT = process.env.PORT || 5000; // ✅ this line is important for Render!
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => console.error(err));

