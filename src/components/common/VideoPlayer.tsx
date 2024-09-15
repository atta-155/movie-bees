import React from 'react';
import { Player, ControlBar } from 'video-react';
import { Box, Typography } from '@mui/material';

interface VideoPlayerProps {
  url: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  return (
    <Box sx={{ maxWidth: '100%', position: 'relative', mb: 4 }}>
      
      <Player
        playsInline
        src={url}
        autoPlay={false}
        // style={{ width: '100%', height: 'auto' }}
      >
        <ControlBar autoHide={false} />
      </Player>
    </Box>
  );
};

export default VideoPlayer;
