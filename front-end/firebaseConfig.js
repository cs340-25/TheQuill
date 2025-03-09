// Import required Firebase services from @react-native-firebase/app
import { initializeApp } from '@react-native-firebase/app';
//import { getAnalytics } from '@react-native-firebase/analytics';
import { getFirestore } from '@react-native-firebase/firestore';

// Your Firebase config (add the missing `databaseURL` if needed)
const firebaseConfig = {
  apiKey: "AIzaSyDgHtzdeZcDKzf_jH6eKBRkap-WkzwuHh8",
  authDomain: "the-quill-1f02d.firebaseapp.com",
  projectId: "the-quill-1f02d",
  storageBucket: "the-quill-1f02d.firebasestorage.app",
  messagingSenderId: "360830342665",
  appId: "1:360830342665:web:3dc561cd073545afaf8ad8",
  measurementId: "G-5KSBR8P1FQ",
  databaseURL: "https://the-quill-1f02d.firebaseio.com" // Add this if you're using Realtime Database
};

// Initialize Firebase app using the modular API
const app = initializeApp(firebaseConfig);

// Optional: Initialize Firestore
const firestore = getFirestore(app);

export { app, firestore };
