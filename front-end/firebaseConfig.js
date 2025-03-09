// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics , isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgHtzdeZcDKzf_jH6eKBRkap-WkzwuHh8",
  authDomain: "the-quill-1f02d.firebaseapp.com",
  projectId: "the-quill-1f02d",
  storageBucket: "the-quill-1f02d.firebasestorage.app",
  messagingSenderId: "360830342665",
  appId: "1:360830342665:web:3dc561cd073545afaf8ad8",
  measurementId: "G-5KSBR8P1FQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized");
  } else {
    console.log("Firebase Analytics is not supported in this environment");
  }
});

export { app, analytics };
