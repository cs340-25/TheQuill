import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import {
    Container, Paper, Typography, CircularProgress, Box, Card, CardMedia, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import '../styles/BookDetails.css';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [readingStatus, setReadingStatus] = useState('To Be Read');

    useEffect(() => {
        const fetchBookDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
                setBook(null); // Explicitly set to null on error
            } finally {
                setLoading(false);
            }
        };
        fetchBookDetails();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!book) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 5 }}>
                Book details not available. Please try again later.
            </Typography>
        );
    }

    const { volumeInfo } = book;
    const {
        title = "No Title Available",
        authors = ["Unknown Author"],
        description = "No description available.",
        imageLinks,
        publishedDate,
        publisher = "Unknown Publisher",
        pageCount,
        categories = [],
        averageRating,
        ratingsCount,
        language,
    } = volumeInfo;

    const imageUrl = imageLinks?.large || imageLinks?.thumbnail || "https://via.placeholder.com/300x450?text=No+Cover";

    const handleStatusChange = (event) => {
        setReadingStatus(event.target.value);
    };

    return (
        <Container maxWidth="lg" className="container">
            <Paper elevation={4} className="paper">
                <Box className="left-side">
                    <Box className="book-cover-section">
                        <Card className="book-cover">
                            <CardMedia
                                component="img"
                                image={imageUrl}
                                alt={title}
                            />
                        </Card>
                    </Box>

                    <Box className="status-section">
                        <FormControl fullWidth>
                            <InputLabel id="reading-status-label">Status</InputLabel>
                            <Select
                                labelId="reading-status-label"
                                id="reading-status"
                                value={readingStatus}
                                onChange={handleStatusChange}
                                label="Status"
                            >
                                <MenuItem value="To Be Read">To Be Read</MenuItem>
                                <MenuItem value="Reading">Reading</MenuItem>
                                <MenuItem value="Read">Read</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Box className="right-side">
                    <Typography variant="h3" className="book-title">{title}</Typography>
                    <Typography variant="h5" color="textSecondary" className="author">
                        {authors.join(', ')}
                    </Typography>
                    <Typography variant="body1" className="categories">
                        {categories.length ? categories.join(', ') : "No categories listed"}
                    </Typography>

                    <Box className="details-box">
                        <Typography><strong>📖 Pages:</strong> {pageCount || "N/A"}</Typography>
                        <Typography><strong>📅 Published:</strong> {publishedDate || "N/A"}</Typography>
                        <Typography><strong>🏢 Publisher:</strong> {publisher}</Typography>
                        <Typography><strong>🌍 Language:</strong> {language?.toUpperCase()}</Typography>
                        <Typography><strong>⭐ Rating:</strong> {averageRating ? `${averageRating} (${ratingsCount} ratings)` : "No ratings available"}</Typography>
                    </Box>

                    <Typography
                        variant="body1"
                        className="description"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
                    />
                </Box>
            </Paper>
        </Container>
    );
};

export default BookDetails;
