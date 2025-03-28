import React, { useState } from 'react';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Replace with your actual Google Books API key
  const API_KEY = 'AIzaSyDR8-AriyFWv1z1SR4F5pGgX-DJBggc8AI';  // Add your API Key here
  const API_URL = 'https://www.googleapis.com/books/v1/volumes';

  const handleSearch = async () => {
    if (!query) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}?q=${query}&key=${API_KEY}`);
      const data = await response.json();
      
      if (data.items) {
        setBooks(data.items);
      } else {
        setError('No books found');
      }
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search for Books</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
      />
      <button onClick={handleSearch}>Search</button>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id}>
              <h3>{book.volumeInfo.title}</h3>
              <p>Author: {book.volumeInfo.authors?.join(', ')}</p>
              <p>{book.volumeInfo.description}</p>
              {book.volumeInfo.imageLinks && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  style={{ width: '100px' }}
                />
              )}
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
