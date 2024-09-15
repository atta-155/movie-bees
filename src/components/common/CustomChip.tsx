import React from 'react';
import { Chip } from '@mui/material';
import { SxProps } from '@mui/system';

interface CustomChipProps {
  text: string;
}

const CustomChip: React.FC<CustomChipProps> = ({ text }) => {
  return (
    <Chip
      label={text}
      size='small'
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
        backdropFilter: 'blur(5px)', // Blurs the background
        color: 'white',
        borderRadius: '5px', // Rounded shape
        // padding: '4px 4px', // Padding for chip
        fontWeight: 'semi-bold',
       
      }}
    />
  );
};

export default CustomChip;
