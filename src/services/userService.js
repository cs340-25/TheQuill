// UserService.js

import { getDatabase, ref, set, get, child } from "firebase/database";

// Function to create a new user
export const createUser = async (userData) => {
  const db = getDatabase();
  const newUserRef = ref(db, 'users').push();
  const userId = newUserRef.key;

  // Check for unique username and email before adding the user
  const usernameExists = await checkUsernameExists(userData.username);
  const emailExists = await checkEmailExists(userData.email);

  if (usernameExists) {
    throw new Error("Username already taken");
  }

  if (emailExists) {
    throw new Error("Email already registered");
  }

  // Set the new user data in the database
  await set(newUserRef, {
    ...userData,
    id: userId,
  });

  return userId;
};

// Check if username already exists
export const checkUsernameExists = async (username) => {
  const db = getDatabase();
  const snapshot = await get(ref(db, 'users'));

  if (snapshot.exists()) {
    const users = snapshot.val();
    for (let userId in users) {
      if (users[userId].username === username) {
        return true;  // Username already exists
      }
    }
  }
  return false;  // Username is available
};

// Check if email already exists
export const checkEmailExists = async (email) => {
  const db = getDatabase();
  const snapshot = await get(ref(db, 'users'));

  if (snapshot.exists()) {
    const users = snapshot.val();
    for (let userId in users) {
      if (users[userId].email === email) {
        return true;  // Email already exists
      }
    }
  }
  return false;  // Email is available
};
