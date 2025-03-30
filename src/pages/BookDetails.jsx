import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import '../styles/BookDetails.css';

const BookDetails = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get('https://www.googleapis.com/books/v1/volumes/' + id);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };
        fetchBookDetails();
    }, [id]);

    if (!book) return <div>Loading...</div>;

    const { volumeInfo } = book;
    const {
        title,
        authors,
        description,
        imageLinks,
        publishedDate,
        publisher,
        pageCount,
        categories,
        averageRating,
        ratingsCount,
        language,
        previewLink,
        infoLink
    } = volumeInfo;

    const uniqueCategories = [...new Set(categories)];

    return (
        <div className="book-details">
            <div className='section section-1'>
                <img src={imageLinks?.thumbnail} alt={title} className='book-thumbnail' />
                <button></button>
            </div>
            <div className='section section-2'>
                <h2>{title}</h2>
                <h4>{authors?.join(', ')}</h4>
                <p>{categories?.join(', ')}</p>
                <p><strong>Rating:</strong> {averageRating ? `${averageRating} (${ratingsCount} ratings)` : "No ratings available"}</p>
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}></p>
            </div>
            {/* <div className='section section-3'>3</div> */}
        </div>
    );
};

export default BookDetails;