
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2U6gnrapNB4Trhrzxs6Y3L5dlPz5KP9M",
  authDomain: "create-site-original.firebaseapp.com",
  projectId: "create-site-original",
  storageBucket: "create-site-original.firebasestorage.app",
  messagingSenderId: "324185614412",
  appId: "1:324185614412:web:ba3f60c0ee85ba58226ce9",
  measurementId: "G-4YNKQ1JEKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
