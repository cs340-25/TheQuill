import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent, Button, Stack, Container, IconButton } from "@mui/material";
import axios from "axios";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookIcon from '@mui/icons-material/Book';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { getDatabase, ref, set } from "firebase/database";

const BrowseBooks = () => {
    const [booksByGenre, setBooksByGenre] = useState({});
    const [alertMessage, setAlertMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();
    const { user } = useUser();
    const db = getDatabase();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const trendingResponse = await axios.get("https://www.googleapis.com/books/v1/volumes", {
                    params: {
                        q: "trending",
                        orderBy: "relevance",
                        maxResults: 2,
                        key: "AIzaSyDs1eqf3fQFfSzpBUXJYgHHLNqm7QV47k8",
                    },
                });

                let books = trendingResponse.data.items.map((item) => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown",
                    cover: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150",
                    genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : "Other",
                    rating: item.volumeInfo.averageRating || 0,
                    description: item.volumeInfo.description || "No description available.",
                    genres: item.volumeInfo.categories || ["Other"],
                }));

                const genres = [...new Set(books.map((book) => book.genre))];

                const fetchBooksByGenre = genres.map(async (genre) => {
                    const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
                        params: {
                            q: `subject:${genre}`,
                            orderBy: "relevance",
                            maxResults: 5,
                            key: "AIzaSyDs1eqf3fQFfSzpBUXJYgHHLNqm7QV47k8",
                        },
                    });

                    const genreBooks = response.data.items.map((item) => ({
                        id: item.id,
                        title: item.volumeInfo.title,
                        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown",
                        cover: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150",
                        genre: genre,
                        rating: item.volumeInfo.averageRating || 0,
                        description: item.volumeInfo.description || "No description available.",
                        genres: item.volumeInfo.categories || ["Other"],
                    }));

                    return genreBooks;
                });

                const genreResults = await Promise.all(fetchBooksByGenre);
                books = [...books, ...genreResults.flat()];

                const uniqueBooks = books.reduce((acc, book) => {
                    if (!acc.some((b) => b.id === book.id)) acc.push(book);
                    return acc;
                }, []);

                const groupedBooks = uniqueBooks.reduce((acc, book) => {
                    if (!acc[book.genre]) acc[book.genre] = [];
                    acc[book.genre].push(book);
                    return acc;
                }, {});

                setBooksByGenre(groupedBooks);
            } catch (error) {
                console.error("Error fetching books:", error);
                setBooksByGenre({});
            }
        };

        fetchBooks();
    }, []);

    const saveBook = async (newStatus, book) => {
        if (!user) {
            setAlertMessage('You need to be signed in to save a book. Redirecting to signin page . . .');
            setTimeout(() => {
                navigate('/signin');
            }, 3000);
            return;
        }

        const userId = user.id;
        const { title, author, cover, id } = book;

        const bookData = {
            title,
            authors: author,
            thumbnail: cover,
            status: newStatus,
            bookId: id,
        };

        const statusKey = newStatus.replace(/\s+/g, '');

        try {
            const updatedAt = new Date().toISOString();
            const statusKeys = ['ToBeRead', 'Reading', 'Read'].filter(key => key !== statusKey);

            for (const key of statusKeys) {
                await set(ref(db, `users/${userId}/books/${key}/${id}`), null);
            }

            const updatedBookData = {
                ...bookData,
                updatedAt,
            };

            await set(ref(db, `users/${userId}/books/${statusKey}/${id}`), updatedBookData);

            setAlertMessage(null);
            setSuccessMessage(`Book status updated to "${newStatus}".`);
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" fontWeight="bold" mt={3} mb={2}>
                Browse Books
            </Typography>

            <Box>
                {Object.keys(booksByGenre).map((genre) => (
                    <Box key={genre} my={4} p={2} bgcolor="#fce4ec" borderRadius={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight="bold">{genre}</Typography>
                            <Button size="small" variant="contained" color="primary">See All</Button>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{ overflowX: "auto", mt: 2, '&::-webkit-scrollbar': { display: 'none' } }}>
                            {booksByGenre[genre].map((book) => {
                                const authors = book.author.split(", ");
                                const firstAuthor = authors[0];
                                return (
                                    <Card
                                        key={book.id}
                                        sx={{
                                            minWidth: 150,
                                            maxWidth: 150,
                                            boxShadow: 3,
                                            bgcolor: "#fff3e0",
                                            p: 1,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
                                            <CardMedia
                                                component="img"
                                                image={book.cover}
                                                alt={book.title}
                                                sx={{ width: "100%", height: 200, borderRadius: 1 }}
                                            />
                                        </Link>
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <Typography variant="body2" fontWeight="bold">
                                                    {book.title}
                                                </Typography>
                                            </Link>
                                            <Typography variant="caption" color="text.secondary">{firstAuthor}</Typography>
                                        </CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                                            <IconButton onClick={(e) => { e.stopPropagation(); saveBook("ToBeRead", book); }}>
                                                <AddCircleIcon sx={{ color: "#ff4081" }} />
                                            </IconButton>
                                            <IconButton onClick={(e) => { e.stopPropagation(); saveBook("Reading", book); }}>
                                                <BookIcon sx={{ color: "#ff4081" }} />
                                            </IconButton>
                                            <IconButton onClick={(e) => { e.stopPropagation(); saveBook("Read", book); }}>
                                                <CheckCircleIcon sx={{ color: "#ff4081" }} />
                                            </IconButton>
                                        </Box>
                                    </Card>
                                );
                            })}
                        </Stack>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default BrowseBooks;
