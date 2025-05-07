const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// MongoDB setup
mongoose.connect("mongodb://localhost:27017/feedbackdb", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Define feedback schema
const feedbackSchema = new mongoose.Schema({
  rating: Number,
  feedback: String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Summarization endpoint
app.post("/api/summarize", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided." });

  try {
    const response = await axios.post(
      "https://api.cohere.ai/generate",
      {
        model: "command",  // Ensure you're using the correct model
        prompt: `Summarize this:\n${text}`,
        max_tokens: 100,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Cohere response:", JSON.stringify(response.data, null, 2));

    // Accessing the 'text' directly from the response.
    const summary = response.data.text.trim();
    res.json({ summary });
  } catch (error) {
    console.error("Cohere API error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Summarization failed." });
  }
});

// Feedback endpoint
app.post("/api/feedback", async (req, res) => {
  const { rating, feedback } = req.body;

  if (!rating || !feedback) {
    return res.status(400).json({ error: "Rating and feedback are required." });
  }

  try {
    const newFeedback = new Feedback({ rating, feedback });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback saved successfully!" });
  } catch (err) {
    console.error("Error saving feedback:", err);
    res.status(500).json({ error: "Error saving feedback" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
