import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { InteractiveMap } from '../InteractiveMap/InteractiveMap';

export const CountryInfoSection: React.FC = () => {
  return (
    <Box sx={{ mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            mb: 4,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          국가별 취업 정보
        </Typography>
        <Paper 
          elevation={3}
          sx={{ 
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <InteractiveMap />
        </Paper>
      </motion.div>
    </Box>
  );
}; 