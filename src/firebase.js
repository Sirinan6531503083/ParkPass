// src/firebase.js
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // ถ้าไม่ได้ใช้สามารถ comment
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUQoP2SkVqNROQFtAWsw5Wixzj9A1qUcs",
  authDomain: "fir-parkpass-76ba2.firebaseapp.com",
  projectId: "fir-parkpass-76ba2",
  storageBucket: "fir-parkpass-76ba2.appspot.com",
  messagingSenderId: "326423334991",
  appId: "1:326423334991:web:a1370eab5d68e98c48da3a",
  measurementId: "G-5TLBG729MF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app); // ถ้าไม่ได้ใช้สามารถ comment

// Export services
export const auth = getAuth(app);       // Firebase Auth
export const db = getFirestore(app);    // Firestore
export const storage = getStorage(app);  // Firebase Storage

export default app;
