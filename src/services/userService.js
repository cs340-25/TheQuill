import { getDatabase, ref, set, get, push } from "firebase/database";

// Function to create a new user
export const createUser = async (userData) => {
  const db = getDatabase();
  const usersRef = ref(db, 'users');
  const newUserRef = push(usersRef);
  const userId = newUserRef.key;

  // Only check for duplicate email
  const emailExists = await checkEmailExists(userData.email);

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

// Check if email already exists
export const checkEmailExists = async (email) => {
  const db = getDatabase();
  const snapshot = await get(ref(db, 'users'));

  if (snapshot.exists()) {
    const users = snapshot.val();
    for (let userId in users) {
      if (users[userId].email === email) {
        return true;
      }
    }
  }
  return false;
};
