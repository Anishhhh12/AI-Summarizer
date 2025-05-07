import { useState } from "react";
import { sendResetPasswordEmail } from "../firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    setError("");
    setMessage("");
    try {
      await sendResetPasswordEmail(email);
      setMessage("✅ Check your inbox for the reset link.");
    } catch (err) {
      setError("❌ Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Forgot Password</h2>

        {message && <p className="text-green-600 text-center text-sm mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center text-sm mb-4">{error}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
