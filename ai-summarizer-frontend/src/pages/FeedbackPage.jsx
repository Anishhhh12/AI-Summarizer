import { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !feedback.trim()) {
      alert("Please provide a rating and feedback.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/feedback", {
        rating,
        feedback,
      });
      console.log("Feedback submitted:", response.data.message);
      alert("Feedback submitted successfully!");
      setRating(0);
      setHover(0);
      setFeedback("");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Something went wrong while submitting feedback.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 md:px-10">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-6">We Value Your Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="text-center">
            <label className="block text-base font-medium text-gray-700 mb-2">Rate your experience</label>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-7 h-7 transition ${
                      (hover || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                    fill={(hover || rating) >= star ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Textarea */}
          <div>
            <label className="block mb-1 text-base font-medium text-gray-700">Your Feedback</label>
            <textarea
              rows={5}
              placeholder="Let us know what you think..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
