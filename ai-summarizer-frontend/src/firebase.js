import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqYH-ifSxU8OUqNWlzNBu4l5yfrV8eLTQ",
  authDomain: "ai-summarizer-631a2.firebaseapp.com",
  projectId: "ai-summarizer-631a2",
  storageBucket: "ai-summarizer-631a2.firebasestorage.app",
  messagingSenderId: "317344285878",
  appId: "1:317344285878:web:d50fd6cdad5e3710d71217",
  measurementId: "G-M4NL01270F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google authentication provider
const googleProvider = new GoogleAuthProvider();

// Export functions
export const signUpWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const signInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const googleSignIn = () => signInWithPopup(auth, googleProvider);
export const sendResetPasswordEmail = (email) => sendPasswordResetEmail(auth, email);
export const sendEmailVerificationFunc = async () => {
  const user = auth.currentUser;

  if (user && !user.emailVerified) {
    const actionCodeSettings = {
      url: `${window.location.origin}/login`, // Redirects to /login after verification
      handleCodeInApp: false,
    };

    try {
      await sendEmailVerification(user, actionCodeSettings);
      return true;
    } catch (error) {
      console.error("Failed to send verification email:", error);
      throw error;
    }
  } else {
    throw new Error("No user is signed in or email already verified.");
  }
};


export const logout = () => signOut(auth);

export default auth;
