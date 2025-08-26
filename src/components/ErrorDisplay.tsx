import React from 'react';
import { Box, Alert, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: 'rgba(244, 67, 54, 0.1)',
  border: '1px solid rgba(244, 67, 54, 0.3)',
  borderRadius: '12px',
  color: '#ffffff',
  '& .MuiAlert-icon': {
    color: '#f44336'
  }
}));

const RetryButton = styled(Button)(({ theme }) => ({
  marginTop: '12px',
  backgroundColor: 'rgba(99, 102, 241, 0.2)',
  color: '#6366f1',
  border: '1px solid rgba(99, 102, 241, 0.3)',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: 'rgba(99, 102, 241, 0.3)',
    borderColor: 'rgba(99, 102, 241, 0.5)',
  }
}));

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  message = "Failed to load certificates", 
  onRetry 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        padding: 3
      }}
    >
      <StyledAlert severity="error" sx={{ width: '100%', maxWidth: '400px' }}>
        <Typography variant="body2" sx={{ marginBottom: onRetry ? 1 : 0 }}>
          {message}
        </Typography>
        {onRetry && (
          <RetryButton
            variant="outlined"
            size="small"
            onClick={onRetry}
          >
            Try Again
          </RetryButton>
        )}
      </StyledAlert>
    </Box>
  );
};

export default ErrorDisplay;