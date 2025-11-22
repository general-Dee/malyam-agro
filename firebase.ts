"use client";

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDukoonQ4z-xd5jakKfjSRLIZn9KUheLww",
  authDomain: "originalmalyam.firebaseapp.com",
  projectId: "originalmalyam",
  storageBucket: "originalmalyam.firebasestorage.app",
  messagingSenderId: "65847637845",
  appId: "1:65847637845:web:35dfcb9627d98ec50ea1dc",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
