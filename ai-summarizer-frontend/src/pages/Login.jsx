import { useState, useContext } from "react";
import { signInWithEmail, googleSignIn, sendEmailVerificationFunc } from "../firebase";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { getAuth } from "firebase/auth";

function Login() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [resendVisible, setResendVisible] = useState(false);
  const [resendStatus, setResendStatus] = useState("");
  const [resending, setResending] = useState(false);
  const [verifiedPromptVisible, setVerifiedPromptVisible] = useState(false); // Track "Yes/No" prompt visibility

  const navigate = useNavigate();

  // ✅ Auto-redirect to homepage if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    setError("");
    setResendVisible(false);
    setResendStatus("");
    setVerifiedPromptVisible(false); // Reset the prompt visibility
    setLoadingLogin(true);

    try {
      await signInWithEmail(email, password);
      const auth = getAuth();
      await auth.currentUser.reload();

      if (auth.currentUser.emailVerified) {
        navigate("/"); // Redirect if email is verified
      } else {
        setError("Please verify your email first.");
        setResendVisible(true); // Show resend link if not verified
      }
    } catch (err) {
      console.error(err);
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleResendVerification = async () => {
    setResending(true);
    setResendStatus("");

    try {
      const auth = getAuth();
      await auth.currentUser.reload();

      if (auth.currentUser && !auth.currentUser.emailVerified) {
        await sendEmailVerificationFunc();
        setResendStatus("Verification email sent.");
        setVerifiedPromptVisible(true); // Show the "Yes/No" prompt after sending email

        // Optionally, you can auto-redirect after some time if the user clicks Yes
      } else {
        setResendStatus("Email is already verified.");
      }
    } catch (err) {
      console.error(err);
      setResendStatus("Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  const handleYesVerification = () => {
    window.location.reload(); 
  };
  

  const handleNoVerification = () => {
    setVerifiedPromptVisible(false); // Hide the prompt if user says No
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoadingGoogle(true);

    try {
      const result = await googleSignIn();

      const isVerified =
        result?.user?.emailVerified ||
        result?.user?.providerData[0]?.providerId === "google.com";

      if (isVerified) {
        // Give AuthContext time to update, redirect handled by useEffect
        setTimeout(() => {}, 100);
      } else {
        setError("Please verify your email before logging in.");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.message || "Google login failed.");
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 animated-gradient">
      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        {resendVisible && (
          <div className="text-center mb-3">
            <button
              onClick={handleResendVerification}
              className="text-blue-600 text-sm hover:underline"
              disabled={resending}
            >
              {resending ? "Sending..." : "Resend Verification Email"}
            </button>
            {resendStatus && (
              <p className="text-green-600 text-sm mt-1">{resendStatus}</p>
            )}
          </div>
        )}

        {verifiedPromptVisible && (
          <div className="text-center mb-3">
            <p className="text-blue-600 text-sm mb-3">Did you verify your email?</p>
            <button
              onClick={handleYesVerification}
              className="text-green-600 text-sm hover:underline mb-1"
            >
              Yes
            </button>
            <button
              onClick={handleNoVerification}
              className="text-red-600 text-sm hover:underline"
            >
              No
            </button>
          </div>
        )}

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

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-3"
          disabled={loadingLogin}
        >
          {loadingLogin ? "Logging in..." : "Log In"}
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          disabled={loadingGoogle}
        >
          {loadingGoogle ? "Logging in with Google..." : "Log In with Google"}
        </button>
      </div>
    </div>
  );
}

export default Login;
