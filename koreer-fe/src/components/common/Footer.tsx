import React from 'react';
import { Container, Grid, Typography, Link, Box, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import styles from '../../assets/scss/common/footer.module.scss';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 8,
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" color="text.primary" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              About Koreer
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              해외 취업을 꿈꾸는 분들을 위한 최고의 파트너, Koreer가 함께합니다. 전문적인 취업 정보와 맞춤형 서비스로 여러분의 글로벌 커리어를 지원합니다.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" color="text.primary" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Link href="/company-information" color="inherit" underline="hover" sx={{ display: 'block', mb: 1.5 }}>
                  회사 소개
                </Link>
                <Link href="/visa-info/usa" color="inherit" underline="hover" sx={{ display: 'block', mb: 1.5 }}>
                  비자 가이드
                </Link>
                <Link href="/interview-guide/technical" color="inherit" underline="hover" sx={{ display: 'block', mb: 1.5 }}>
                  기술 인터뷰
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link href="/membership" color="inherit" underline="hover" sx={{ display: 'block', mb: 1.5 }}>
                  멤버십
                </Link>
                <Link href="/community" color="inherit" underline="hover" sx={{ display: 'block', mb: 1.5 }}>
                  커뮤니티
                </Link>
                <Link href="/contact" color="inherit" underline="hover" sx={{ display: 'block', mb: 1.5 }}>
                  문의하기
                </Link>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" color="text.primary" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email color="primary" /> koreerkorea@gmail.com
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone color="primary" /> +82 02-123-4567
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn color="primary" /> 서울특별시 강남구 테헤란로
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <IconButton
                  key={social}
                  sx={{
                    color: 'primary.main',
                    '&:hover': {
                      color: 'primary.dark',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  {social === 'Facebook' && <Facebook />}
                  {social === 'Twitter' && <Twitter />}
                  {social === 'Instagram' && <Instagram />}
                  {social === 'LinkedIn' && <LinkedIn />}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Koreer. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}