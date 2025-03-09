// src/components/HeroSection.tsx
import { Box, Typography, Button } from '@mui/material';

export default function HeroSection() {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to GreatReads
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Discover your next favorite book.
      </Typography>
      <Button variant="contained" color="primary">
        Browse Books
      </Button>
    </Box>
  );
}
