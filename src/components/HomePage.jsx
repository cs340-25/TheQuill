// src/components/MyComponent.jsx (or .tsx)
import React from 'react';
import { db, collection, addDoc, addData } from 'src/firebase';

const homePage = () => {
  const handleClick = async () => {
    try {
      const data = { name: 'John Doe', age: 30 };
      //Option 1: Using the custom addData helper function
      await addData(data, "users");

      //Option 2: alternative usage
      const collectionRef = collection(db, "users");
      await addDoc(collectionRef, data);

      console.log('Data added successfully!');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <button onClick={handleClick}>Add Data to Firestore</button>
  );
};

export default homePage;
