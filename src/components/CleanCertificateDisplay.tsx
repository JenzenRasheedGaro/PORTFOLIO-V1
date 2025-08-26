import React from 'react';
import { Box } from '@mui/material';
import CertificateGrid from './CertificateGrid';
import { mockQuery } from './certificatesMockData';

const CleanCertificateDisplay: React.FC = () => {
  return (
    <Box sx={{ width: '100%', padding: { xs: 1, sm: 2 } }}>
      {/* Certificate Grid - Clean display without any alerts */}
      <CertificateGrid certificates={mockQuery.certificates} />
    </Box>
  );
};

export default CleanCertificateDisplay;