import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, setLogLevel } from 'firebase/firestore';

setLogLevel("debug");
// Your Firebase configuration
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

// Initialize Firestore
const db = getFirestore(app);

// Helper function to add data
export async function addData(data, collectionName) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef; // Return the DocumentReference if needed
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Re-throw the error so the component can handle it
  }
}

export async function getAllUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return users;
    } catch (error) {
      console.error("Error getting users: ", error);
      throw error;
    }
  }

export { db, collection, addDoc };
