import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Container, Grid, Paper } from '@mui/material';

const gradientBg = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #ff5f6d 0%, #ffc371 100%)',
  display: 'flex',
  flexDirection: 'column',
};

const navLinks = [
  'How it Works',
  'Application',
  'Testimonials',
  "Vendor's FAQ",
];

export default function LandingPage() {
  return (
    <Box sx={gradientBg}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ background: 'none', pt: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#ff5f6d', letterSpacing: 1 }}>
            DrinGet
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {navLinks.map(link => (
              <Button key={link} color="inherit" sx={{ color: '#222', fontWeight: 500 }}>{link}</Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" sx={{ bgcolor: '#ff5f6d', color: '#fff', borderRadius: 3, boxShadow: 2, px: 3, fontWeight: 600 }}>Register as a Vendor</Button>
            <Button variant="contained" sx={{ bgcolor: '#ffc371', color: '#fff', borderRadius: 3, boxShadow: 2, px: 3, fontWeight: 600 }}>Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ fontWeight: 800, color: '#222', mb: 2, lineHeight: 1.1 }}>
              Street-food<br />delivery App
            </Typography>
            <Typography variant="h6" sx={{ color: '#444', mb: 4 }}>
              The delivery portion is meant to be precise so that the runner can find the customers in a crowd of people (Like a festival, or inside an Office building)
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button variant="contained" sx={{ bgcolor: '#222', color: '#fff', borderRadius: 2, px: 3, fontWeight: 600 }}>Download on the App Store</Button>
              <Button variant="contained" sx={{ bgcolor: '#222', color: '#fff', borderRadius: 2, px: 3, fontWeight: 600 }}>Download on Google Play</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ borderRadius: 6, p: 2, background: '#fff', minHeight: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Illustration placeholder */}
              <Typography variant="h5" sx={{ color: '#ff5f6d', fontWeight: 700 }}>
                [Food Truck Illustration]
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 