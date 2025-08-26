import React, { useState } from 'react';
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { supabase } from '../supabase';
import { mockQuery } from './certificatesMockData';

const DebugContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '24px',
  fontFamily: 'monospace',
}));

const DebugButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(99, 102, 241, 0.2)',
  color: '#6366f1',
  border: '1px solid rgba(99, 102, 241, 0.3)',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '0.8rem',
  padding: '4px 12px',
  '&:hover': {
    backgroundColor: 'rgba(99, 102, 241, 0.3)',
  }
}));

const DebugPanel: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [expanded, setExpanded] = useState(false);

  const runDiagnostics = async () => {
    const info: any = {
      timestamp: new Date().toISOString(),
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Missing',
      supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
      mockDataCount: mockQuery.certificates.length,
    };

    try {
      // Test Supabase connection
      const { data, error, count } = await supabase
        .from('certificates')
        .select('*', { count: 'exact' });

      info.supabaseConnection = error ? 'Failed' : 'Success';
      info.supabaseError = error?.message || null;
      info.supabaseDataCount = count || 0;
      info.supabaseData = data || [];
      info.supabaseRawResponse = { data, error, count };

      // Test table existence
      const { data: tables } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');
      
      info.availableTables = tables?.map(t => t.table_name) || [];
      info.certificatesTableExists = info.availableTables.includes('certificates');

    } catch (err: any) {
      info.supabaseConnection = 'Error';
      info.networkError = err.message;
    }

    setDebugInfo(info);
    setExpanded(true);
  };

  return (
    <DebugContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#6366f1', fontSize: '1rem' }}>
          🔧 Certificate Debug Panel
        </Typography>
        <DebugButton onClick={runDiagnostics}>
          Run Diagnostics
        </DebugButton>
      </Box>

      {debugInfo && (
        <Accordion 
          expanded={expanded} 
          onChange={() => setExpanded(!expanded)}
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:before': { display: 'none' }
          }}
        >
          <AccordionSummary>
            <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
              Diagnostic Results ({debugInfo.timestamp})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label={`Supabase URL: ${debugInfo.supabaseUrl}`}
                  color={debugInfo.supabaseUrl === 'Set' ? 'success' : 'error'}
                  size="small"
                />
                <Chip 
                  label={`Supabase Key: ${debugInfo.supabaseKey}`}
                  color={debugInfo.supabaseKey === 'Set' ? 'success' : 'error'}
                  size="small"
                />
                <Chip 
                  label={`Connection: ${debugInfo.supabaseConnection}`}
                  color={debugInfo.supabaseConnection === 'Success' ? 'success' : 'error'}
                  size="small"
                />
                <Chip 
                  label={`DB Records: ${debugInfo.supabaseDataCount}`}
                  color={debugInfo.supabaseDataCount > 0 ? 'success' : 'warning'}
                  size="small"
                />
                <Chip 
                  label={`Mock Records: ${debugInfo.mockDataCount}`}
                  color="info"
                  size="small"
                />
              </Box>
              
              {debugInfo.supabaseError && (
                <Typography sx={{ color: '#f44336', fontSize: '0.8rem', mt: 1 }}>
                  Error: {debugInfo.supabaseError}
                </Typography>
              )}
              
              {debugInfo.networkError && (
                <Typography sx={{ color: '#f44336', fontSize: '0.8rem', mt: 1 }}>
                  Network Error: {debugInfo.networkError}
                </Typography>
              )}

              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', mt: 1 }}>
                Available Tables: {debugInfo.availableTables?.join(', ') || 'Unable to fetch'}
              </Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                Certificates Table Exists: {debugInfo.certificatesTableExists ? 'Yes' : 'No'}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </DebugContainer>
  );
};

export default DebugPanel;