// src/pages/ErrorPage.jsx
import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', paddingY: 8 }}>
      <Box>
        <Typography
          variant="h6"
          sx={{ color: 'primary.main', fontWeight: 'bold', marginBottom: 2 }}
        >
          404
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          The page you're looking for doesn't exist or may have moved.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
