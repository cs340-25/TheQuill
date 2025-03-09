// src/components/GoodReadsFooter.tsx
import { Box, Container, Typography, Link, Stack } from '@mui/material';

export default function GoodReadsFooter() {
  return (
    <Box component="footer" sx={{ py: 4, mt: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Stack direction="row" spacing={4} justifyContent="center" sx={{ mb: 2 }}>
          <Link href="/about" color="inherit" underline="hover">
            About
          </Link>
          <Link href="/contact" color="inherit" underline="hover">
            Contact
          </Link>
          <Link href="/privacy" color="inherit" underline="hover">
            Privacy Policy
          </Link>
        </Stack>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} The Quill. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
