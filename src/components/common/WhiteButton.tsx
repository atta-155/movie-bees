import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
    text: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, startIcon, endIcon, ...props }) => {
    return (
        <Button
            {...props}
            variant="contained"
            startIcon={startIcon}
            endIcon={endIcon}
            sx={{
                backgroundColor: 'white',
                color: 'black',
                // borderRadius: '60px',
                // padding: '8px 16px',
                textTransform: 'uppercase',
                fontWeight: 'semi-bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                    backgroundColor: '#f0f0f0',
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

export default CustomButton;
