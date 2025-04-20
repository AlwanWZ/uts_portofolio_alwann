// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBcykUWVif7bh0HG7ac3aDS-ef5-tVuDyI",
  authDomain: "utsalwan.firebaseapp.com",
  projectId: "utsalwan",
  storageBucket: "utsalwan.firebasestorage.app",
  messagingSenderId: "976756573444",
  appId: "1:976756573444:web:f849f966971cbe9704fc51",
  measurementId: "G-KFB4HM0FQ3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Initialize Analytics if in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, auth, storage, analytics };