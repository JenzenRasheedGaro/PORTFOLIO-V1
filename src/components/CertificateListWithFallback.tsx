import React, { useState, useEffect } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { supabase } from '../supabase';
import CertificateGrid from './CertificateGrid';
import LoadingSpinner from './LoadingSpinner';
import { CertificateData, mockQuery } from './certificatesMockData';

const CertificateListWithFallback: React.FC = () => {
  const [certificates, setCertificates] = useState<CertificateData[]>(mockQuery.certificates);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'loading' | 'database' | 'demo'>('loading');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        console.log('Attempting to fetch from Supabase...');
        
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('created_at', { ascending: false });

        console.log('Supabase response:', { data, error, count: data?.length });

        if (error) {
          console.error('Supabase error:', error);
          setDataSource('demo');
          setCertificates(mockQuery.certificates);
        } else if (data && data.length > 0) {
          console.log(`Found ${data.length} certificates in database`);
          setDataSource('database');
          setCertificates(data);
        } else {
          console.log('Database is empty, using demo data');
          setDataSource('demo');
          setCertificates(mockQuery.certificates);
        }
      } catch (err) {
        console.error('Network error:', err);
        setDataSource('demo');
        setCertificates(mockQuery.certificates);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading certificates..." />;
  }

  return (
    <Box sx={{ width: '100%', padding: { xs: 1, sm: 2 } }}>
      {/* Data Source Indicator */}
      {dataSource === 'demo' && (
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
            📋 Showing demo certificates - Database is empty or unavailable
          </Typography>
        </Alert>
      )}

      {dataSource === 'database' && (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 3,
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            border: '1px solid rgba(76, 175, 80, 0.3)',
            color: 'white',
            '& .MuiAlert-icon': {
              color: '#4caf50'
            }
          }}
        >
          <Typography variant="body2">
            ✅ Showing {certificates.length} certificates from database
          </Typography>
        </Alert>
      )}

      {/* Certificate Grid */}
      <CertificateGrid certificates={certificates} />
      
      {/* Debug Info */}
      <Box sx={{ mt: 3, opacity: 0.6 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          Data source: {dataSource} | Count: {certificates.length} | 
          Mock available: {mockQuery.certificates.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default CertificateListWithFallback;