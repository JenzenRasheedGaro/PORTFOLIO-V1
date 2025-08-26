import React from 'react';
import { Modal, IconButton, Box, Backdrop, Fade } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

interface CertificateModalProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  open,
  onClose,
  imageUrl,
  title = "Certificate"
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="certificate-modal-title"
      aria-describedby="certificate-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(5px)',
        },
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 2,
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'relative',
            width: 'auto',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
            '&:focus': {
              outline: 'none',
            },
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.6)',
              zIndex: 1,
              padding: 1.5,
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.8)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
            size="large"
          >
            <ClearOutlinedIcon sx={{ fontSize: 28 }} />
          </IconButton>

          {/* Modal Image */}
          <img
            src={imageUrl}
            alt={`${title} Full View`}
            style={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: '90vh',
              margin: '0 auto',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default CertificateModal;