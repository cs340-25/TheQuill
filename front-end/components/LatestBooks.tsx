// src/components/LatestBooks.tsx
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

interface BookCard {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
}

const dummyBooks: BookCard[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: '/static/books/gatsby.jpg',
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    coverUrl: '/static/books/1984.jpg',
  },
];

export default function LatestBooks() {
  return (
    <Grid container spacing={4}>
      {dummyBooks.map((book) => (
        <Grid item key={book.id} xs={12} sm={6} md={3}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={book.coverUrl}
              alt={book.title}
            />
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                by {book.author}
              </Typography>
              <Button variant="outlined" sx={{ mt: 1 }}>
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
