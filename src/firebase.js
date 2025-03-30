// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";  // Realtime Database imports

const firebaseConfig = {
  apiKey: "AIzaSyDgHtzdeZcDKzf_jH6eKBRkap-WkzwuHh8",
  authDomain: "the-quill-1f02d.firebaseapp.com",
  databaseURL: "https://the-quill-1f02d.firebaseio.com",  // Realtime Database URL
  projectId: "the-quill-1f02d",
  storageBucket: "the-quill-1f02d.appspot.com",
  messagingSenderId: "360830342665",
  appId: "1:360830342665:web:3dc561cd073545afaf8ad8",
  measurementId: "G-5KSBR8P1FQ",
  databaseURL: "hhttps://the-quill-1f02d-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

export { db };
