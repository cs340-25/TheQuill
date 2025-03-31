import React, { useState } from "react";
import { Box, Typography, Avatar, Chip, Card, CardMedia, CardContent, Stack, Button, LinearProgress, IconButton } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const UserProfile = () => {
    const [readingStatus, setReadingStatus] = useState({});

    const [bookProgress, setBookProgress] = useState({
        4: 60,
        5: 40,
        6: 75,
        7: 25,
    });

    const handleStatusChange = (bookId, status) => {
        setReadingStatus((prev) => ({ ...prev, [bookId]: status }));
    };

    const user = {
        profilePic: "https://via.placeholder.com/150",
        name: "Jane Doe",
        booksReadThisYear: 15,
        tags: ["Fantasy Lover", "Sci-Fi Enthusiast", "Book Reviewer"],
        currentlyReading: [
            {
                id: 4,
                title: "1984",
                author: "George Orwell",
                cover: "https://covers.openlibrary.org/b/id/8234152-L.jpg",
                progress: 60,
                timestamp: 1700000000,
            },
            {
                id: 5,
                title: "Brave New World",
                author: "Aldous Huxley",
                cover: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
                progress: 40,
                timestamp: 1700001000,
            },
            {
                id: 6,
                title: "Fahrenheit 451",
                author: "Ray Bradbury",
                cover: "https://covers.openlibrary.org/b/id/11127778-L.jpg",
                progress: 75,
                timestamp: 1700002000,
            },
            {
                id: 7,
                title: "The Catcher in the Rye",
                author: "J.D. Salinger",
                cover: "https://covers.openlibrary.org/b/id/8225261-L.jpg",
                progress: 25,
                timestamp: 1700003000,
            }
        ],
        bookshelf: [
            {
                id: 1,
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                cover: "https://covers.openlibrary.org/b/id/6979862-L.jpg",
            },
            {
                id: 2,
                title: "Dune",
                author: "Frank Herbert",
                cover: "https://covers.openlibrary.org/b/id/8378116-L.jpg",
            },
            {
                id: 3,
                title: "Pride and Prejudice",
                author: "Jane Austen",
                cover: "https://covers.openlibrary.org/b/id/10546650-L.jpg",
            },
        ],
    };

    const handleProgressChange = (bookId, event) => {
      // Calculate the new progress based on where the click happened
      const progressBarWidth = event.target.offsetWidth;
      const clickPosition = event.nativeEvent.offsetX;
      const newProgress = Math.round((clickPosition / progressBarWidth) * 100);
      
      setBookProgress((prev) => ({ ...prev, [bookId]: newProgress }));
  };

    const sortedReading = [...user.currentlyReading].sort((a, b) => b.timestamp - a.timestamp);
    const displayedBooks = sortedReading.slice(0, 3);
    const showSeeAllButton = sortedReading.length > 3;
    const widthPercentage = displayedBooks.length === 1 ? "100%" : displayedBooks.length === 2 ? "50%" : "33.3%";

    return (
        <Box maxWidth={800} mx="auto" p={4} bgcolor="#fef3f2" boxShadow={5} borderRadius={3}>
            {/* Profile Section */}
            <Stack direction="row" alignItems="center" spacing={3}>
              {/* Profile Picture */}
              <Avatar 
                  src={user.profilePic} 
                  alt="Profile" 
                  sx={{ width: 150, height: 150, border: "5px solid #ff8fab" }} // Made it bigger
              />
              {/* User Info (Name, Tags, Books Read) */}
              <Stack spacing={1}>
                <Typography variant="h5" fontWeight="bold" color="#d6336c">
                    {user.name}
                </Typography>
                <Typography color="text.secondary">
                    Books Read This Year: {user.booksReadThisYear}
                </Typography>

                {/* Tags Section */}
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {user.tags.map((tag, index) => (
                        <Chip key={index} label={tag} color="secondary" variant="filled" />
                    ))}
                </Stack>
              </Stack>
            </Stack>

            <br/>
            <Box mb={4} p={2} bgcolor="#ffe4e1" borderRadius={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold">Currently Reading</Typography>
                {showSeeAllButton && (
                  <Button size="small" variant="contained" color="primary">
                    See All
                  </Button>
                )}
            </Stack>

            <Stack direction="row" spacing={2} mt={2}>
                {displayedBooks.map((book) => (
                    <Card key={book.id} sx={{ width: widthPercentage, boxShadow: 3, bgcolor: "#fffaf0", p: 2, marginLeft: 2, marginBottom: 2 }}>
                        <CardMedia component="img" image={book.cover} alt={book.title} sx={{ width: "100%", height: 150, borderRadius: 1 }} />
                        <CardContent>
                            <Typography variant="body1" fontWeight="bold" textAlign="center">{book.title}</Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="center">{book.author}</Typography>
                            
                            <div onClick={(e) => handleProgressChange(book.id, e)}>
                                <LinearProgress
                                    variant="determinate"
                                    value={bookProgress[book.id]}
                                    sx={{ mt: 1, height: 8, borderRadius: 4 }}
                                />
                            </div>

                            <Typography variant="caption" textAlign="center">{bookProgress[book.id]}% completed</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>

            {/* Bookshelf Section */}
            <Box mt={4} p={2} bgcolor="#fce4ec" borderRadius={2}>
                <Typography variant="h6" fontWeight="bold">My Bookshelf</Typography>
                <Stack direction="row" mt={2} overflow="auto">
                    {user.bookshelf.map((book) => (
                        <Card key={book.id}    
                         sx={{ 
                          minWidth: 150, 
                          maxWidth: 150, 
                          boxShadow: 3, 
                          bgcolor: "#ffebee", 
                          p: 1, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          mb: 2,
                          ml: 2,
                          mt: 2,
                      }} >
                      
                      <CardMedia component="img" image={book.cover} alt={book.title} 
                          sx={{ width: "100%", height: 200, borderRadius: 1 }} />
                      
                      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                          <Typography variant="body2" fontWeight="bold">{book.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{book.author}</Typography>
                      </CardContent>
                  
                      {/* Buttons with Icons */}
                      <Stack direction="row" spacing={1} mt={1} mb={1}>
                          <Button variant="contained" color="primary" size="small">
                              <MenuBookIcon /> {/* Open Book Icon */}
                          </Button>
                          <Button variant="contained" color="success" size="small">
                              <CheckCircleIcon /> {/* Checkmark Icon */}
                          </Button>
                      </Stack>
                  
                  </Card>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

export default UserProfile;