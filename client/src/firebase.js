// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-29c05.firebaseapp.com",
  projectId: "mern-estate-29c05",
  storageBucket: "mern-estate-29c05.firebasestorage.app",
  messagingSenderId: "321473098600",
  appId: "1:321473098600:web:2a018feded26841e5f9cdd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
