import { initializeApp } from "firebase/app";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJMWN9_wXYC9rM10LxWN6aAKDAVAXt5Pk",
  authDomain: "textit-ee21b.firebaseapp.com",
  projectId: "textit-ee21b",
  storageBucket: "textit-ee21b.appspot.com",
  messagingSenderId: "895242390145",
  appId: "1:895242390145:web:82cafbe2ee9023fbecdb80",
  measurementId: "G-CDNQDHEPLM",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
