import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface MovieCardProps {
  id: string;
  image: string;
  title: string;
  year: string;
  onClick: (movieId: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, image, title, year, onClick }) => {
  return (
    <Box>
    <Card
      sx={{
        width: "200px",
        borderRadius: '12px', // Rounded corners
        overflow: 'hidden',    // Ensures content fits within rounded corners
        // backgroundColor: '#222', // Optional: dark background
        color: 'white',
      }}
      onClick={() => onClick(id)}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          height: 300,   // Height for the movie poster
          objectFit: 'cover',
        }}
      />
     
    </Card>
     <CardContent
     sx={{
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'start',
       padding: '8px',
     }}
   >
     <Typography variant="h6" component="div" sx={{ textAlign: 'start', fontSize: '1rem' }}>
       {title}
     </Typography>
     <Typography variant="body2" component="p" sx={{ opacity: 0.7 }}>
       {year}
     </Typography>
   </CardContent>
   </Box>
  );
};

export default MovieCard;
