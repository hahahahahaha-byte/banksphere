import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Hardcoded config (use environment variables for production)
const firebaseConfig = {
  apiKey: "AIzaSyAkrOrlVWdUcgenD-tUO-kyBL7-BVTPqz8",
  authDomain: "fyp-hackathon-de17c.firebaseapp.com",
  projectId: "fyp-hackathon-de17c",
  storageBucket: "fyp-hackathon-de17c.firebasestorage.app",
  messagingSenderId: "262268814162",
  appId: "1:262268814162:web:0715ee7b24d29adca3b08b",
  measurementId: "G-S2KQEW8S8M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;