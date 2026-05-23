import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDN-q4i93KXTaCOi-Rj5snzHWTzvwshbAg",
  authDomain: "geetham-restaurant.firebaseapp.com",
  projectId: "geetham-restaurant",
  storageBucket: "geetham-restaurant.firebasestorage.app",
  messagingSenderId: "148806042779",
  appId: "1:148806042779:web:838d872a9eb79ea030f23e",
  measurementId: "G-V6BBK1WCJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, analytics, db };
