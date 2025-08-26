import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading certificates...", 
  size = 40 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 2,
        color: 'rgba(255, 255, 255, 0.7)'
      }}
    >
      <CircularProgress 
        size={size}
        sx={{
          color: '#6366f1',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }}
      />
      <Typography 
        variant="body2" 
        sx={{ 
          color: 'rgba(255, 255, 255, 0.6)',
          fontWeight: 300
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;