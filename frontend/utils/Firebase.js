// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginanajbhandar.firebaseapp.com",
  projectId: "loginanajbhandar",
  storageBucket: "loginanajbhandar.firebasestorage.app",
  messagingSenderId: "270891529286",
  appId: "1:270891529286:web:6278d1b04ed5b3fb040647",
  measurementId: "G-5PEZ4THLDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const  auth = getAuth(app);
const provider = new GoogleAuthProvider();


export {auth, provider} 