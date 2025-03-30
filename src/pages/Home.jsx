
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';  // Import Firebase db reference
import { ref, get, set } from 'firebase/database';  // Import Realtime Database methods


function Home() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      // Reference to the 'users' node in Realtime Database
      const snapshot = await get(ref(db, 'users'));
      console.log(snapshot)
      if (snapshot.exists()) {
        const data = snapshot.val();  // Fetch data under 'users' node
        console.log("Fetched Data:", data);

        // Map the object into an array
        const usersList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setUsers(usersList);  // Update state with fetched users
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addUserWithSubNodes = async () => {
    const userRef = ref(db, 'users/user1');  // Reference to 'user1' node
  
    await set(userRef, {
      firstName: "John",
      lastName: "Doe",
      age: 25,
      email: "john.doe@example.com",
      userName: "johndoe",
    });
  
    console.log("User with sub-nodes added successfully!");
  };

  useEffect(() => {
    fetchData();  // Call the function when component mounts
    addUserWithSubNodes();
  }, []);
  return (
    <div>
      <h1>Welcome to BookTracker</h1>
      <Link to="/book">Book Search</Link>
      <Link to="/user/johndoe">Go to user Profile page</Link>
    </div>
  );
};

export default Home;
