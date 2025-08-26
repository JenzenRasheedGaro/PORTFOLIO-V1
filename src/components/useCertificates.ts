import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { CertificateData, mockQuery } from './certificatesMockData';

interface UseCertificatesReturn {
  certificates: CertificateData[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCertificates = (): UseCertificatesReturn => {
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

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        setCertificates(mockQuery.certificates);
        setError('Using demo data - Database connection failed');
      } else if (!data || data.length === 0) {
        console.log('No certificates in database, using mock data');
        setCertificates(mockQuery.certificates);
        setError('Using demo data - Database is empty');
      } else {
        console.log(`Found ${data.length} certificates in database`);
        setCertificates(data);
        setError(null);
      }
    } catch (err) {
      console.error('Network error:', err);
      setCertificates(mockQuery.certificates);
      setError('Using demo data - Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return {
    certificates,
    loading,
    error,
    refetch: fetchCertificates,
  };
};