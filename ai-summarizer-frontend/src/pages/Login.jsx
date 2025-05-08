import { useState, useContext } from "react";
import { signInWithEmail, googleSignIn } from "../firebase";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { getAuth } from "firebase/auth"; // ADD THIS at the top with other imports
import { sendEmailVerificationFunc } from "../firebase"; // ⬅ Import this function

function Login() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);  // Loading state for normal login
  const [loadingGoogle, setLoadingGoogle] = useState(false);  // Loading state for Google login
  const navigate = useNavigate();
  const [unverified, setUnverified] = useState(false); // ⬅ New state
  const [resendMessage, setResendMessage] = useState(""); // ⬅ Resend status
  const [resending, setResending] = useState(false); // ⬅ For button state

  const handleLogin = async () => {
    setError("");
    setUnverified(false);
    setResendMessage("");
    setLoadingLogin(true);

    try {
      await signInWithEmail(email, password);
      const auth = getAuth();
      await auth.currentUser.reload();

      if (auth.currentUser.emailVerified) {
        navigate("/");
      } else {
        setUnverified(true); // ⬅ Set flag
        setError("Email not verified.");
      }
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoadingGoogle(true); // Set loading state to true for Google login
    try {
      const result = await googleSignIn();
      const isVerified = result?.user?.emailVerified;

      if (isVerified || result?.user?.providerData[0]?.providerId === "google.com") {
        navigate("/");
      } else {
        setError("Please verify your email before logging in.");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.message || "Google login failed.");
    } finally {
      setLoadingGoogle(false); // Reset loading state for Google login
    }
  };

  const handleResendVerification = async () => {
    setResending(true);
    setResendMessage("");
    try {
      await sendEmailVerificationFunc();
      setResendMessage("Verification email sent. Please check your inbox.");
    } catch (err) {
      setResendMessage("Failed to resend verification email.try again after some time");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 animated-gradient">


      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-center mb-4">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
          >
            Forgot Password?
          </button>
        </div>

        {/* Display loading state for normal login */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-3"
          disabled={loadingLogin} // Disable button while loading
        >
          {loadingLogin ? "Logging in..." : "Log In"}
        </button>

        {/* Display loading state for Google login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          disabled={loadingGoogle} // Disable button while loading
        >
          {loadingGoogle ? "Logging in with Google..." : "Log In with Google"}
        </button>
        {unverified && (
          <div className="text-center mt-3">
            <button
              onClick={handleResendVerification}
              className="text-blue-600 hover:underline text-sm"
              disabled={resending}
            >
              {resending ? "Sending..." : "Resend Verification Email"}
            </button>
            {resendMessage && (
              <p className="text-green-600 text-sm mt-2">{resendMessage}</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Login;
