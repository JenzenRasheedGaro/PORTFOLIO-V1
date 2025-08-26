import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import CertificateCard from './CertificateCard';
import { CertificateData } from './certificatesMockData';

interface CertificateGridProps {
  certificates: CertificateData[];
}

const CertificateGrid: React.FC<CertificateGridProps> = ({ certificates }) => {
  if (!certificates || certificates.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 4,
        color: 'rgba(255, 255, 255, 0.6)'
      }}>
        <Typography variant="body1">
          No certificates available
        </Typography>
      </Box>
    );
  }

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap={3}
      sx={{
        justifyContent: 'center',
        alignItems: 'stretch',
        '& > *': {
          flexBasis: {
            xs: '100%',
            sm: 'calc(50% - 12px)',
            md: 'calc(33.333% - 16px)',
            lg: 'calc(25% - 18px)',
          },
          minWidth: {
            xs: '280px',
            sm: '250px',
          },
          maxWidth: {
            xs: '100%',
            sm: '300px',
          },
        },
      }}
    >
      {certificates.map((certificate, index) => (
        <div
          key={certificate.id}
          data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
          data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
          data-aos-delay={index * 100}
        >
          <CertificateCard certificate={certificate} />
        </div>
      ))}
    </Stack>
  );
};

export default CertificateGrid;