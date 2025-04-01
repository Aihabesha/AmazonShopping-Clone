import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKw5kVf_NFy4aYvNZuWocXfWwJipfIgbE",
  authDomain: "clone-81ebc.firebaseapp.com",
  projectId: "clone-81ebc",
  storageBucket: "clone-81ebc.appspot.com",
  messagingSenderId: "584617994366",
  appId: "1:584617994366:web:79224afa1f0c9385ed502f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
