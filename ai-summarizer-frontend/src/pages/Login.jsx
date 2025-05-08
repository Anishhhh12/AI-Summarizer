import { useState, useContext } from "react";
import { signInWithEmail, googleSignIn } from "../firebase";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { getAuth } from "firebase/auth"; // ADD THIS at the top with other imports

function Login() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);  // Loading state for normal login
  const [loadingGoogle, setLoadingGoogle] = useState(false);  // Loading state for Google login
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoadingLogin(true); // Set loading state to true for normal login
    try {
      await signInWithEmail(email, password);

      const auth = getAuth();
      await auth.currentUser.reload(); // 🔄 Refresh current user state
      const updatedUser = auth.currentUser;

      if (updatedUser.emailVerified) {
        navigate("/");
      } else {
        setError("Please verify your email first.");
      }
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoadingLogin(false); // Reset loading state for normal login
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
      </div>
    </div>
  );
}

export default Login;
