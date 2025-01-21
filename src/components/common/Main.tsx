import React from 'react';
import { Box, Container, Typography, Paper, Grid, Button, Divider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import koreerLogo from '../../assets/img/koreer_logo_cropped.png';
import { CloudBackground } from './CloudBackground';
import { ParticleBackground } from './ParticleBackground';
import {
  TrendingUp,
  WorkOutline,
  Public,
  EmojiPeople,
  ArrowForward
} from '@mui/icons-material';
import {ComponentHelmet} from "../../components/common/ComponentHelmet";

// ... existing styled components and animations ...

export default function Main() {
  // ... existing state and variables ...

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pt: 8,
      pb: 8,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <BackgroundWrapper>
        <ParticleBackground />
        <CloudBackground />
      </BackgroundWrapper>
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Hero Section */}
        <Box sx={{ position: 'relative', height: '600px', mb: 8 }}>
          <AnimatePresence>
            {planes.map((plane, index) => (
              <PlaneIcon
                key={index}
                initial={plane.initial}
                animate={plane.animate}
                exit={{ opacity: 0 }}
              >
                {plane.emoji}
              </PlaneIcon>
            ))}
          </AnimatePresence>

          <LogoContainer>
            <Logo
              src={koreerLogo}
              alt="Koreer Logo"
              variants={logoVariants}
              initial="initial"
              animate="animate"
            />
          </LogoContainer>
          
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
          >
            <GradientText 
              variant="h2" 
              align="center" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              해외 IT 취업의 시작
            </GradientText>
            <Typography 
              variant="h5" 
              align="center" 
              sx={{ 
                mb: 6,
                color: 'text.secondary',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                zIndex: 3
              }}
            >
              당신의 글로벌 커리어를 Koreer와 함께 시작하세요
            </Typography>
          </motion.div>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mt: 4, justifyContent: 'center', alignItems: 'stretch' }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', minHeight: '200px' }}>
              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                custom={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ width: '100%' }}
              >
                <StyledPaper elevation={0} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: 4, border: '1px solid rgba(255, 255, 255, 0.3)', position: 'relative', overflow: 'hidden' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, position: 'relative', mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, position: 'relative' }}>
                    {feature.description}
                  </Typography>
                </StyledPaper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Stats Section */}
        <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  variants={statsVariants}
                  initial="initial"
                  animate="animate"
                  custom={index}
                  style={{ height: '100%' }}
                >
                  <StatCard elevation={0}>
                    <Typography variant="h1" sx={{ fontSize: '1.5rem', color: '#2196F3', opacity: 0.9, mb: 0.5 }}>
                      {stat.icon}
                    </Typography>
                    <Typography variant="h2" sx={{ fontSize: '1.8rem', fontWeight: 600, color: '#2196F3', opacity: 0.9, mb: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
                      {stat.label}
                    </Typography>
                  </StatCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Call to Action Section */}
        <Box sx={{ background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, rgba(33, 203, 243, 0.05) 100%)', py: 10, mt: 8, borderTop: '1px solid rgba(255, 255, 255, 0.3)' }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e', fontSize: { xs: '2rem', md: '2.5rem' } }}>
                    지금 바로 시작하세요
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.6, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                    Koreer와 함께라면 해외 취업의 꿈이 현실이 됩니다.
                    전문가의 도움을 받아 여러분의 커리어를 성장시켜보세요.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      borderRadius: 8,
                      py: 1.5,
                      px: 4,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                      fontSize: '1.1rem',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
                      }
                    }}
                  >
                    무료로 시작하기
                  </Button>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>
      </Container>
      <ComponentHelmet title={"Koreer"} />
    </Box>
  );
} 