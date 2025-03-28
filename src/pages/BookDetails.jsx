import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null); // Store the book details

  useEffect(() => {
    // Fetch book details by ID from the Google Books API
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]); // Re-fetch when the book ID changes

  if (!book) return <div>Loading...</div>;

  const { volumeInfo } = book;
  const { title, authors, description, imageLinks } = volumeInfo;

  return (
    <div>
      <h2>{title}</h2>
      <p><strong>Authors:</strong> {authors?.join(', ')}</p>
      {imageLinks?.thumbnail && (
        <img src={imageLinks.thumbnail} alt={title} style={{ width: '150px' }} />
      )}
      <p><strong>Description:</strong> {description || 'No description available.'}</p>
      {/* Add other book details if necessary, such as publisher, publication date, etc. */}
    </div>
  );
};

export default BookDetails;
