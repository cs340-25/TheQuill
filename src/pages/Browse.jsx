import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent, Button, Stack, Container, IconButton, TextField, InputAdornment } from "@mui/material";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search'; // Search Icon
import StarIcon from '@mui/icons-material/Star'; // Star Icon
import StarBorderIcon from '@mui/icons-material/StarBorder'; // Empty Star Icon
import AddCircleIcon from '@mui/icons-material/AddCircle'; // Add Icon
import BookIcon from '@mui/icons-material/Book'; // Open Book Icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Complete Check Icon
import { Link } from 'react-router-dom'; // Import Link

const BrowseBooks = () => {
    const [booksByGenre, setBooksByGenre] = useState({});
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // Track if a search has been made

    // 🔥 Fetch trending books, then books by genre
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Step 1: Fetch trending books
                const trendingResponse = await axios.get("https://www.googleapis.com/books/v1/volumes", {
                    params: {
                        q: "trending",
                        orderBy: "relevance",
                        maxResults: 40,
                        key: "AIzaSyDR8-AriyFWv1z1SR4F5pGgX-DJBggc8AI",
                    },
                });

                let books = trendingResponse.data.items.map((item) => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown",
                    cover: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150",
                    genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : "Other",
                    rating: item.volumeInfo.averageRating || 0, // Rating
                    description: item.volumeInfo.description || "No description available.", // Description
                    genres: item.volumeInfo.categories || ["Other"], // Genres
                }));

                // Step 2: Extract unique genres
                const genres = [...new Set(books.map((book) => book.genre))];

                // Step 3: Fetch additional books for each genre
                const fetchBooksByGenre = genres.map(async (genre) => {
                    const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
                        params: {
                            q: `subject:${genre}`, // Search books by genre
                            orderBy: "relevance",
                            maxResults: 20,
                            key: "AIzaSyDR8-AriyFWv1z1SR4F5pGgX-DJBggc8AI",
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

                // Wait for all genre-specific books to load
                const genreResults = await Promise.all(fetchBooksByGenre);
                
                // Flatten the array and combine with trending books
                books = [...books, ...genreResults.flat()];

                // Remove duplicates by ID
                const uniqueBooks = books.reduce((acc, book) => {
                    if (!acc.some((b) => b.id === book.id)) acc.push(book);
                    return acc;
                }, []); 

                // Step 4: Group by genre
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

    // Handle the search logic
    const handleSearch = async (e) => {
        e.preventDefault();
        setIsSearching(true); // Set search state to true to hide browsing content
        try {
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                params: {
                    q: query,
                },
            });
            setSearchResults(response.data.items); // Set the search results
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    // Helper function to render stars based on rating
    const renderRating = (rating) => {
        const filledStars = Math.floor(rating); // Number of fully filled stars
        const halfStar = rating % 1 !== 0; // Check if a half star is needed

        return (
            <>
                {[...Array(filledStars)].map((_, index) => (
                    <StarIcon key={`filled-${index}`} sx={{ color: "gold" }} />
                ))}
                {halfStar && <StarBorderIcon sx={{ color: "gold" }} />}
                {[...Array(5 - filledStars - (halfStar ? 1 : 0))].map((_, index) => (
                    <StarBorderIcon key={`empty-${index}`} sx={{ color: "gold" }} />
                ))}
            </>
        );
    };

    return (
        <Container>
            <Typography variant="h4" fontWeight="bold" mt={3} mb={2}>
                Browse Books
            </Typography>

            {/* Search Bar */}
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for books"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        borderRadius: 2,
                        backgroundColor: "#fce4ec",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: "#fce4ec",
                        },
                    }}
                />
            </Box>

            {/* Conditional Rendering */}
            {!isSearching ? (
                // Browse Books Section (Visible when no search is made)
                <Box>
                    {Object.keys(booksByGenre).map((genre) => (
                        <Box key={genre} my={4} p={2} bgcolor="#fce4ec" borderRadius={2}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" fontWeight="bold">{genre}</Typography>
                                <Button size="small" variant="contained" color="primary">See All</Button>
                            </Stack>
                            <Stack direction="row" spacing={2} sx={{ overflowX: "auto", mt: 2, '&::-webkit-scrollbar': { display: 'none' } }}>

                                {booksByGenre[genre].map((book) => {
                                    const authors = book.author.split(", ");  // Split the authors string
                                    const firstAuthor = authors[0];  // Get the first author

                                    return (
                                        <Card key={book.id} sx={{ minWidth: 150, maxWidth: 150, boxShadow: 3, bgcolor: "#fff3e0", p: 1 }}>
                                            <CardMedia component="img" image={book.cover} alt={book.title} sx={{ width: "100%", height: 200, borderRadius: 1 }} />
                                            <CardContent>
                                                <Typography variant="body2" fontWeight="bold" textAlign="center">{book.title}</Typography>
                                                <Typography variant="caption" color="text.secondary" textAlign="center">{firstAuthor}</Typography> {/* Show first author */}
                                            </CardContent>

                                            {/* Bottom Buttons */}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                                                <IconButton>
                                                    <AddCircleIcon sx={{ color: "#ff4081" }} /> {/* Add to Bookshelf Icon */}
                                                </IconButton>
                                                <IconButton>
                                                    <BookIcon sx={{ color: "#ff4081" }} /> {/* Open Book Icon */}
                                                </IconButton>
                                                <IconButton>
                                                    <CheckCircleIcon sx={{ color: "#ff4081" }} /> {/* Complete Check Icon */}
                                                </IconButton>
                                            </Box>
                                        </Card>
                                    );
                                })}
                            </Stack>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box>
                    {searchResults.length === 0 ? (
                        <Typography>No results found. Try searching again.</Typography>
                    ) : (
                        searchResults.map((book) => {
                            const authors = book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Unknown"; // Get first author
                            const description = book.volumeInfo.description || "No description available."; // Get description or default text
                            const rating = book.volumeInfo.averageRating || 0; // Get the rating or default to 0
                            const starCount = Math.round(rating); // Convert rating to a number of stars

                            return (
                                <Box key={book.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Card sx={{ display: 'flex', width: '100%', boxShadow: 3 }}>
                                        <CardMedia
                                            component="img"
                                            image={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                                            alt={book.volumeInfo.title}
                                            sx={{ width: 120, height: 180, objectFit: 'cover', borderRadius: 1 }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{book.volumeInfo.title}</Typography>
                                            <Typography variant="body2">{authors}</Typography>

                                            {/* Display Star Rating */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                {[...Array(5)].map((_, index) => (
                                                    <StarIcon key={index} sx={{ color: index < starCount ? '#ffb300' : '#e0e0e0', fontSize: 18 }} />
                                                ))}
                                            </Box>

                                            {/* Display Description */}
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: "0.75rem" }}>
                                                {description.length > 100 ? description.slice(0, 100) + "..." : description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            );
                        })
                    )}
                </Box>
            )}
        </Container>
    );
};

export default BrowseBooks;
