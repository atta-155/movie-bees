import React, { useState } from 'react';
import { Box, Dialog, DialogContent, IconButton, Grid, Typography, Card, CardMedia } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { MovieImage } from '../../model/Model';

interface ImageTileProps {
  images: MovieImage[];
}

const ImageTile: React.FC<ImageTileProps> = ({ images }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleClickOpen = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={4} sm={3} md={3} key={index}>
            <Card
              sx={{ cursor: 'pointer' }}
              onClick={() => handleClickOpen(image.file_path)}
            >
              <CardMedia
                component="img"
                image={image.file_path}
                alt="Image"
                // sx={{ height: 200, objectFit: 'cover' }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogContent sx={{ position: 'relative', p: 0 }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage}
              sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ImageTile;
