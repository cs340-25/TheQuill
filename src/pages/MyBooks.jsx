import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Container,
  Button
} from "@mui/material";
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const BookRow = ({ title, books }) => {
  if (!books || Object.keys(books).length === 0) return null;

  return (
    <Box my={4} p={2} bgcolor="#fce4ec" borderRadius={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">{title}</Typography>
        <Button size="small" variant="contained" color="primary">See All</Button>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ overflowX: "auto", mt: 2, '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {Object.values(books)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map((book) => (
            <Card
              key={book.bookId}
              sx={{ minWidth: 150, maxWidth: 150, boxShadow: 3, bgcolor: "#fff3e0", p: 1 }}
            >
              <CardMedia
                component="img"
                height="200"
                image={book.thumbnail}
                alt={book.title}
                sx={{ objectFit: "cover", borderRadius: 1 }}
              />
              <CardContent sx={{ p: 1 }}>
                <Typography variant="body2" fontWeight="bold" noWrap>
                  {book.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {Array.isArray(book.authors) ? book.authors[0] : book.authors}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Stack>
    </Box>
  );
};

const MyBooks = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  
  if (!user) {
    navigate("/signin");
    return null;
  }

  const { books } = user;

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" mt={3} mb={2}>
        My Books
      </Typography>

      <BookRow title="To Be Read" books={books?.ToBeRead} />
      <BookRow title="Currently Reading" books={books?.Reading} />
      <BookRow title="Read" books={books?.Read} />
    </Container>
  );
};

export default MyBooks;
