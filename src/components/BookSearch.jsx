import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

const BookSearch = () => {
  const [query, setQuery] = useState('');  // User's search input
  const [books, setBooks] = useState([]);  // Books fetched from the API
  const [loading, setLoading] = useState(false); // Loading state

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Fetch data from Google Books API
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: query,  // Search term (book title, author, etc.)
        },
      });
      setBooks(response.data.items);  // Update the state with the fetched books
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}  // Update the query as user types
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      <div>
        {books.length === 0 && !loading ? (
          <p>No books found. Try searching again.</p>
        ) : (
          books.map((book) => (
            <div key={book.id}>
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
                style={{ width: '100px' }}
              />
              <br />
              {/* Link to the BookDetails page */}
              <Link to={`/book/${book.id}`}>View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookSearch;
