import React from 'react';
import { Button, ButtonProps, Stack } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

interface TransparentButtonProps extends ButtonProps {
    text: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onClick?: () => void;
}

const TransparentButton: React.FC<TransparentButtonProps> = ({ text, startIcon, endIcon, ...props }) => {
    return (
        <Button
            {...props}
            variant="contained"
            startIcon={startIcon}
            endIcon={endIcon}
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
                backdropFilter: 'blur(5px)', // Blurs the background
                color: 'white',
                // borderRadius: '20px',
                // padding: '8px 16px',
                textTransform: 'uppercase',
                fontWeight: 'semi-bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Slightly more opaque on hover
                },
                '&:focus': {
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
                },
            }}
            onClick={props.onClick}
        >
            
                {text}
        </Button>
    );
};

export default TransparentButton;
