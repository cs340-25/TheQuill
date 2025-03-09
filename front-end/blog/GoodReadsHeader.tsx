// src/components/GoodReadsHeader.tsx
import React from 'react';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const categories = ['All Genres', 'Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi'];

export default function GoodReadsHeader() {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      {/* Main Title */}
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
        Welcome to GreatReads
      </Typography>
      {/* Subheading */}
      <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4 }}>
        Stay in the loop with the latest about new books, authors, and reviews!
      </Typography>

      {/* Categories */}
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap', mb: 4 }}>
        {categories.map((cat) => (
          <Button variant="outlined" key={cat}>
            {cat}
          </Button>
        ))}
      </Box>

      {/* Search Bar */}
      <Box sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}>
        <TextField
          size="small"
          placeholder="Search for a book or author..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        {/* Optional RSS or other icons could go here */}
      </Box>
    </Box>
  );
}
