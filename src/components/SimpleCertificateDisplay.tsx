import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import CertificateGrid from './CertificateGrid';
import { mockQuery } from './certificatesMockData';

const SimpleCertificateDisplay: React.FC = () => {
  return (
    <Box sx={{ width: '100%', padding: { xs: 1, sm: 2 } }}>
      {/* Data source indicator */}
      <Alert 
        severity="info" 
        sx={{ 
          mb: 3,
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          border: '1px solid rgba(33, 150, 243, 0.3)',
          color: 'white',
          '& .MuiAlert-icon': {
            color: '#2196f3'
          }
        }}
      >
        <Typography variant="body2">
          📋 Showing {mockQuery.certificates.length} demo certificates
        </Typography>
      </Alert>

      {/* Certificate Grid */}
      <CertificateGrid certificates={mockQuery.certificates} />
    </Box>
  );
};

export default SimpleCertificateDisplay;