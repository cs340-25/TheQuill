// GoodReadsHome.tsx
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../shared-theme/AppTheme';
import MainContent from '../components/MainContent';
import GoodReadsFooter from '../components/GoodReadsFooter';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function GoodReadsHome(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GreatReads</Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: '100vh',
          overflowY: 'auto',
          py: 4,
        }}
      >
        <MainContent />
      </Container>
      <GoodReadsFooter />
    </AppTheme>
  );
}
