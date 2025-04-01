import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookSearch = ({ BookQue = '' }) => {
    const [query, setQuery] = useState(BookQue);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (BookQue) {
            handleSearch({ preventDefault: () => {} });
        }
    }, [BookQue]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                params: {
                    q: query,
                },
            });
            setBooks(response.data.items || []);
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
                    onChange={(e) => setQuery(e.target.value)}
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
                            <Link to={`/book/${book.id}`}>View Details</Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BookSearch;
