// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore
import { getAuth } from "firebase/auth"; // Autenticación
import { getAnalytics } from "firebase/analytics"; // Analytics (opcional)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID // Opcional
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig); <-

// Inicializa Analytics (opcional, solo si lo necesitas)
//const analytics = getAnalytics(app); <-

// Inicializa y exporta los servicios de Firebase que uses
export const db = getFirestore(app); // Firestore
export const auth = getAuth(app); // Autenticación