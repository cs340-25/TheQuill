import { Link } from "react-router-dom";
import React, {useState} from 'react';
import { addData, getAllUsers } from '../firebase';

function Home() {
  const addUser = async () => {
    try {
      const userData = {
        Email: "john.doe@example.com",
        FirstName: "John",
        LastName: "Doe",
        Password: "password123",
        UserName: "johndoe"
      };

      // Call addData helper function to add user data
      await addData(userData, 'users'); // 'users' is the Firestore collection name
      console.log("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
      console.log("Fetched users: ", fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to BookTracker</h1>
      <Link to="/book/1">Go to Book 1</Link>
      {/* <button onClick={(e) => { e.preventDefault(); addUser(); }}>
        Add Random User to Firestore
      </button> */}
      <button type="button" onClick={fetchUsers}>Get Users</button>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.UserName} - {user.Email}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Home;
