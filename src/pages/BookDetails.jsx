import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
            <div className="book-info">
                <div className='book-info-sec'></div>
                <div className='book-info-sec'></div>
                <div className='book-info-sec'></div>
            </div>
        </div>
    );
};

export default BookDetails;
