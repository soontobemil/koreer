import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { InteractiveMap } from '../components/InteractiveMap/InteractiveMap';

export const Home: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          글로벌 취업의 시작, Koreer와 함께하세요
        </Typography>
        
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            국가별 취업 정보
          </Typography>
          <InteractiveMap />
        </Box>
      </Box>
    </Container>
  );
}; 