import React from 'react';
import { Box, Container, Grid, Typography, Link, Stack, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#212121',
        color: '#cacaca',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We provide the best movie streaming experience. Enjoy the latest movies and TV shows right from your home.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Movies
              </Link>
              <Link href="#" color="inherit" underline="hover">
                TV Shows
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Contact Us
              </Link>
            </Stack>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton color="inherit" href="https://facebook.com">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="https://youtube.com">
                <YouTube />
              </IconButton>
            </Stack>
          </Grid>

          {/* Legal Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">
                Terms of Service
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Cookie Policy
              </Link>
            </Stack>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" >
            © {new Date().getFullYear()} MovieBees. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
