// app/services/user.service.js
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { User } from "../interface/user";

// Function to add a user to the database
export const addUser = async (user : User) => {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    console.log("Document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
};

// Function to get users
export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    let users : User[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as User);
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
