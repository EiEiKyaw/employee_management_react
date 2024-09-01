import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDv7IjQsZ0cTVMfRUcCq4PAaXQYQ1gmWeA",
  authDomain: "akee-employee-mgnt.firebaseapp.com",
  projectId: "akee-employee-mgnt",
  storageBucket: "akee-employee-mgnt.appspot.com",
  messagingSenderId: "993725094025",
  appId: "1:993725094025:web:2be77ee0145e3b7aebce58",
  measurementId: "G-QG63TD1N76",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account ",
});

const auth = getAuth(firebaseApp);

export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
  }
};

export { auth, firebaseApp };
