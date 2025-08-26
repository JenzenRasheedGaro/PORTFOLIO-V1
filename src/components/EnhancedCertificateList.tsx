import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { supabase } from '../supabase';
import CertificateGrid from './CertificateGrid';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import { CertificateData, mockQuery } from './certificatesMockData';

const EnhancedCertificateList: React.FC = () => {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching certificates from Supabase...');
      
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error, dataLength: data?.length });

      if (error) {
        console.error('Supabase error:', error);
        // Fallback to mock data if Supabase fails
        setCertificates(mockQuery.certificates);
        setError('Using demo data - Supabase connection failed');
      } else if (!data || data.length === 0) {
        // If Supabase returns empty data, use mock data
        console.log('Supabase returned empty data, using mock data');
        setCertificates(mockQuery.certificates);
        setError('Using demo data - No certificates in database');
      } else {
        // Supabase has data
        console.log(`Using ${data.length} certificates from Supabase`);
        setCertificates(data);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching certificates:', err);
      // Fallback to mock data
      setCertificates(mockQuery.certificates);
      setError('Using demo data - Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleRetry = () => {
    fetchCertificates();
  };

  if (loading) {
    return <LoadingSpinner message="Loading certificates..." />;
  }

  if (error && certificates.length === 0) {
    return <ErrorDisplay message={error} onRetry={handleRetry} />;
  }

  // This should never happen now since we always fallback to mock data
  if (certificates.length === 0) {
    console.warn('No certificates available, forcing mock data');
    setCertificates(mockQuery.certificates);
    setError('Fallback: Using demo data');
  }

  return (
    <Box sx={{ width: '100%', padding: { xs: 1, sm: 2 } }}>
      {error && (
        <Box sx={{ mb: 2, opacity: 0.8 }}>
          <ErrorDisplay 
            message={error} 
            onRetry={handleRetry}
          />
        </Box>
      )}
      <CertificateGrid certificates={certificates} />
    </Box>
  );
};

export default EnhancedCertificateList;