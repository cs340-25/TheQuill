import React from "react";
import BookSearch from "../components/BookSearch"; // Adjust the import path if needed

const Home = () => {
  return (
    <div>
      <h1>Welcome to BookTracker</h1>
      <BookSearch /> {/* Add BookSearch component here */}
    </div>
  );
};

export default Home;
