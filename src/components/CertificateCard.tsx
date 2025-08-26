import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import CertificateModal from './CertificateModal';
import { CertificateData } from './certificatesMockData';

const CertificateContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3)',
    borderColor: 'rgba(99, 102, 241, 0.4)',
    '& .certificate-overlay': {
      opacity: 1,
    },
    '& .certificate-image': {
      filter: 'contrast(1.1) brightness(1.1) saturate(1.2)',
      transform: 'scale(1.05)',
    },
    '& .hover-content': {
      transform: 'translate(-50%, -50%) scale(1)',
      opacity: 1,
    },
  },
}));

const CertificateImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  minHeight: '200px',
  display: 'block',
  objectFit: 'cover',
  filter: 'contrast(1.05) brightness(0.95) saturate(1.1)',
  transition: 'all 0.4s ease',
}));

const CertificateOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8))',
  opacity: 0,
  transition: 'all 0.4s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const HoverContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -60%) scale(0.8)',
  opacity: 0,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  textAlign: 'center',
  color: 'white',
  zIndex: 2,
}));

interface CertificateCardProps {
  certificate: CertificateData;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (!certificate) {
    return (
      <Box sx={{ 
        p: 2, 
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 2
      }}>
        <Typography variant="body2">
          Certificate data unavailable
        </Typography>
      </Box>
    );
  }

  const handleCardClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <CertificateContainer onClick={handleCardClick}>
        <CertificateImage
          className="certificate-image"
          src={certificate.image_url}
          alt={certificate.title || 'Certificate'}
          loading="lazy"
        />
        
        <CertificateOverlay className="certificate-overlay">
          <HoverContent className="hover-content">
            <OpenInNewOutlinedIcon
              sx={{
                fontSize: 48,
                mb: 2,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                fontSize: '1.1rem',
              }}
            >
              View Certificate
            </Typography>
            {certificate.title && (
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  opacity: 0.9,
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  fontSize: '0.9rem',
                }}
              >
                {certificate.title}
              </Typography>
            )}
          </HoverContent>
        </CertificateOverlay>
      </CertificateContainer>

      <CertificateModal
        open={modalOpen}
        onClose={handleCloseModal}
        imageUrl={certificate.image_url}
        title={certificate.title}
      />
    </>
  );
};

export default CertificateCard;