import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  getFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Settings for persistent cache
const settings = {
  cache: persistentLocalCache({
    tabManager: persistentSingleTabManager(),
    maxSizeBytes: 1024 * 1024 * 40, // 40 MB (cache)
  }),
};

// Initialize Firestore with settings
initializeFirestore(app, settings)

// Firestore database
const db = getFirestore(app);

export { db };