// "use client";

// import { initializeApp } from "firebase/app"
// import { getAuth } from "firebase/auth"
// import { getFirestore } from "firebase/firestore"
// import { getStorage } from "firebase/storage"

// const firebaseConfig = {
//   apiKey: "AIzaSyDukoonQ4z-xd5jakKfjSRLIZn9KUheLww",
//   authDomain: "originalmalyam.firebaseapp.com",
//   projectId: "originalmalyam",
//   storageBucket: "originalmalyam.firebasestorage.app",
//   messagingSenderId: "65847637845",
//   appId: "1:65847637845:web:35dfcb9627d98ec50ea1dc",
// };


// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };




// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
// export const storage = getStorage(app);
// export const auth = getAuth(app);




// frontend/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config from environment variables
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firestore instance
export const db = getFirestore(app);

