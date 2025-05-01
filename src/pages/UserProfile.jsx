import React, { useState } from "react";
import { Box, Typography, Avatar, Chip, Card, CardMedia, CardContent, Stack, Button, LinearProgress, IconButton } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useUser } from "../contexts/userContext";

const UserProfile = () => {
    const { user } = useUser();

    const [bookProgress, setBookProgress] = useState({});

    const calculateBooksReadThisYear = () => {
        if (!user || !user.books || !user.books.Read) return 0;

        const currentYear = new Date().getFullYear();
        let booksReadThisYear = 0;

        Object.values(user.books.Read).forEach((book) => {
            const bookYear = new Date(book.updatedAt).getFullYear();
            if (bookYear === currentYear) {
                booksReadThisYear += 1;
            }
        });

        return booksReadThisYear;
    };

    const handleProgressChange = (bookId, event) => {
        const progressBarWidth = event.target.offsetWidth;
        const clickPosition = event.nativeEvent.offsetX;
        const newProgress = Math.round((clickPosition / progressBarWidth) * 100);

        setBookProgress((prev) => ({ ...prev, [bookId]: newProgress }));
    };

    const currentlyReading = user?.books?.Reading ? Object.values(user.books.Reading) : [];
    const readBooks = user?.books?.Read ? Object.values(user.books.Read) : [];
    const toBeReadBooks = user?.books?.ToBeRead ? Object.values(user.books.ToBeRead) : [];

    const sortedReading = currentlyReading.sort((a, b) => b.timestamp - a.timestamp);
    const displayedReadingBooks = sortedReading.slice(0, 3);
    const showSeeAllButton = sortedReading.length > 3;
    const widthPercentage = displayedReadingBooks.length === 1 ? "100%" : displayedReadingBooks.length === 2 ? "50%" : "33.3%";

    return (
        <Box maxWidth={800} mx="auto" p={4} bgcolor="#fef3f2" boxShadow={5} borderRadius={3}>
            {/* Profile Section */}
            <Stack direction="row" alignItems="center" spacing={3}>
                {/* Profile Picture */}
                <Avatar 
                    src={user.profilePic || "https://via.placeholder.com/150"} 
                    alt="Profile" 
                    sx={{ width: 150, height: 150, border: "5px solid #ff8fab" }}
                />
                {/* User Info (Name, Tags, Books Read) */}
                <Stack spacing={1}>
                    <Typography variant="h5" fontWeight="bold" color="#d6336c">
                        {user.name}
                    </Typography>
                    <Typography color="text.secondary">
                        Books Read This Year: {calculateBooksReadThisYear()}
                    </Typography>

                    {/* Tags Section */}
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {user.tags?.map((tag, index) => (
                            <Chip key={index} label={tag} color="secondary" variant="filled" />
                        ))}
                    </Stack>
                </Stack>
            </Stack>

            <br />
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
                    {displayedReadingBooks.map((book) => (
                        <Card key={book.id} sx={{ width: widthPercentage, boxShadow: 3, bgcolor: "#fffaf0", p: 2, marginLeft: 2, marginBottom: 2 }}>
                            {/* Displaying Book Cover */}
                            <CardMedia component="img" image={book.thumbnail || "https://via.placeholder.com/150"} alt={book.title} sx={{ width: "100%", height: 300, borderRadius: 1 }} />
                            <CardContent>
                                <Typography variant="body1" fontWeight="bold" textAlign="center">{book.title}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">{book.author}</Typography>

                                <div onClick={(e) => handleProgressChange(book.id, e)}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={bookProgress[book.id] || 0}
                                        sx={{ mt: 1, height: 8, borderRadius: 4 }}
                                    />
                                </div>

                                <Typography variant="caption" textAlign="center">{bookProgress[book.id] || 0}% completed</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Box>

            {/* Bookshelf Section */}
            <Box mt={4} p={2} bgcolor="#fce4ec" borderRadius={2}>
                <Typography variant="h6" fontWeight="bold">My Bookshelf</Typography>
                <Stack direction="row" mt={2} overflow="auto">
                    {toBeReadBooks.map((book) => (
                        <Card key={book.id} sx={{ minWidth: 150, maxWidth: 150, boxShadow: 3, bgcolor: "#ffebee", p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', mb: 2, ml: 2, mt: 2 }}>
                            <CardMedia component="img" image={book.thumbnail || "https://via.placeholder.com/150"} alt={book.title} sx={{ width: "100%", height: 200, borderRadius: 1 }} />
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <Typography variant="body2" fontWeight="bold">{book.title}</Typography>
                                <Typography variant="caption" color="text.secondary">{book.author}</Typography>
                            </CardContent>

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

            {/* Read Books Section */}
            <Box mt={4} p={2} bgcolor="#e1f5fe" borderRadius={2}>
                <Typography variant="h6" fontWeight="bold">Books I've Read</Typography>
                <Stack direction="row" mt={2} overflow="auto">
                    {readBooks.map((book) => (
                        <Card key={book.id} sx={{ minWidth: 150, maxWidth: 150, boxShadow: 3, bgcolor: "#b3e5fc", p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', mb: 2, ml: 2, mt: 2 }}>
                            <CardMedia component="img" image={book.thumbnail || "https://via.placeholder.com/150"} alt={book.title} sx={{ width: "100%", height: 200, borderRadius: 1 }} />
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <Typography variant="body2" fontWeight="bold">{book.title}</Typography>
                                <Typography variant="caption" color="text.secondary">{book.author}</Typography>
                            </CardContent>

                            <Stack direction="row" spacing={1} mt={1} mb={1}>
                                <Button variant="contained" color="primary" size="small">
                                    <MenuBookIcon /> {/* Open Book Icon */}
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
