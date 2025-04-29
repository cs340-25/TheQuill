import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, Box } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import NavigationBar from "../components/NavigationBar";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const bookQue = searchParams.get("q") || "";
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!bookQue) return;
            try {
                const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                    params: { 
                        q: bookQue,
                        key:'AIzaSyDs1eqf3fQFfSzpBUXJYgHHLNqm7QV47k8'  
                    },
                });
                setSearchResults(response.data.items || []);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        fetchSearchResults(); 
    }, [bookQue]);

    return (
        <>
        <NavigationBar/>
        <Container>
            <Typography variant="h4" fontWeight="bold" mt={3} mb={2} sx={{ color: '#d81b60' }}>
                Search Results for "{bookQue}"
            </Typography>

            {searchResults.length === 0 ? (
                <Typography>No results found for "{bookQue}".</Typography>
            ) : (
                searchResults.map((book) => {
                    const { title, authors, description, averageRating, imageLinks } = book.volumeInfo;
                    const rating = Math.round(averageRating || 0);
                    
                    let shortDesc; // description cut to ... 
                    if (description) {
                        if (description.length > 100) {
                            shortDesc = description.slice(0, 100) + "...";
                        } else {
                            shortDesc = description;
                        }
                    } else {
                        shortDesc = "No description available.";
                    }


                    return (
                        <Box key={book.id} my={2} p={2} bgcolor="#fce4ec" borderRadius={2}>
                            <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
                                <Card sx={{ display: 'flex', width: '100%', boxShadow: 3, bgcolor: "#fff3e0", cursor: 'pointer' }}>
                                    <CardMedia
                                        component="img"
                                        image={imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                                        alt={title}
                                        sx={{ width: 120, height: 180, objectFit: 'cover', borderRadius: 1, m: 1 }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" sx={{ color: '#ad1457' }}>{title}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {authors ? authors.join(", ") : "Unknown Author"}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                            {[...Array(5)].map((_, index) => (
                                                <StarIcon key={index} sx={{ color: index < rating ? '#ffb300' : '#e0e0e0', fontSize: 18 }} />
                                            ))}
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: "0.75rem" }}>
                                            {shortDesc}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Box>
                    );
                })
            )}
        </Container>
        </>
    );
};

export default SearchPage;
