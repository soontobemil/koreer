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
import { useNavigate } from 'react-router-dom';


const PlaneIcon = styled(motion.div)`
  width: 40px;
  height: 40px;
  position: absolute;
  font-size: 2rem;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.2));
  z-index: 3;
`;

const LogoContainer = styled(motion.div)`
  position: relative;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  perspective: 1000px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  will-change: transform;
`;

const Logo = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 20px rgba(33, 150, 243, 0.3));
  mix-blend-mode: normal;
  background: transparent;
  padding: 0;
  margin: 0;
  max-width: 100%;
  display: block;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const StyledPaper = styled(Paper)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;
  z-index: 3;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const GradientText = styled(Typography)`
  background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(33, 150, 243, 0.3);
  letter-spacing: -0.5px;
  position: relative;
  z-index: 3;
`;

const BackgroundWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
`;

const StatCard = styled(Paper)`
  padding: 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(33, 150, 243, 0.08);
  }
`;

const statsVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 3.3 + (i * 0.1),
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

export default function Main() {
  const navigate = useNavigate();

  const planes = [
    {
      initial: { x: -100, y: 100, rotate: 25 },
      animate: {
        x: [-100, 500, 1000],
        y: [100, -50, -200],
        rotate: [25, 15, 25],
        transition: {
          duration: 4,
          times: [0, 0.5, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1
        }
      },
      emoji: "✈️"
    },
    {
      initial: { x: -100, y: 300, rotate: 15 },
      animate: {
        x: [-100, 400, 1000],
        y: [300, 200, 100],
        rotate: [15, 25, 15],
        transition: {
          duration: 5,
          times: [0, 0.6, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5
        }
      },
      emoji: "🛩️"
    },
    {
      initial: { x: -100, y: 200, rotate: 20 },
      animate: {
        x: [-100, 600, 1000],
        y: [200, 0, -100],
        rotate: [20, 30, 20],
        transition: {
          duration: 4.5,
          times: [0, 0.7, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.8
        }
      },
      emoji: "✈️"
    }
  ];

  const logoVariants = {
    initial: { 
      scale: 0,
      rotateY: -180,
      opacity: 0 
    },
    animate: { 
      scale: [0, 1.2, 1],
      rotateY: [-180, 0, 0],
      opacity: 1,
      transition: { 
        delay: 0.5,
        duration: 1.5,
        times: [0, 0.6, 1],
        type: "spring",
        stiffness: 100
      }
    }
  };

  const textVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: 2,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 2.5 + (i * 0.2),
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  const features = [
    {
      title: '해외 취업 정보',
      description: '북미 지역 취업에 필요한 모든 정보를 제공합니다.',
      gradient: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
      path: '/company-information'
    },
    {
      title: '비자 가이드',
      description: '비자 준비부터 인터뷰까지 전문가의 도움을 받으세요.',
      gradient: 'linear-gradient(135deg, #00BFA5 0%, #00E5FF 100%)',
      path: '/visa-info/usa'
    },
    {
      title: '연봉 정보',
      description: '실제 현직자들의 연봉 정보와 협상 팁을 확인하세요.',
      gradient: 'linear-gradient(135deg, #7C4DFF 0%, #448AFF 100%)',
      path: '/interview-guide/technical'
    },
    {
      title: '커뮤니티',
      description: '현지에서 일하는 개발자들과 정보를 공유하세요.',
      gradient: 'linear-gradient(135deg, #FF4081 0%, #FF80AB 100%)',
      path: '/community'
    }
  ];

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

        <Grid
          container
          spacing={4}
          sx={{
            mt: 4,
            justifyContent: 'center',
            alignItems: 'stretch'
          }}
        >
          {features.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              sx={{
                display: 'flex',
                minHeight: '200px'
              }}
            >
              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                custom={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ width: '100%', cursor: 'pointer' }}
                onClick={() => navigate(feature.path)}
              >
                <StyledPaper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: 4,
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: feature.gradient,
                      opacity: 0.1,
                      transition: 'opacity 0.3s ease-in-out',
                    },
                    '&:hover::before': {
                      opacity: 0.2,
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      background: feature.gradient,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      position: 'relative',
                      mb: 2
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      position: 'relative'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </StyledPaper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, rgba(33, 203, 243, 0.05) 100%)',
          py: 10,
          mt: 8,
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: '#1a237e',
                    fontSize: { xs: '2rem', md: '2.5rem' }
                  }}
                >
                  지금 바로 시작하세요
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    fontSize: { xs: '1rem', md: '1.25rem' }
                  }}
                >
                  Koreer와 함께라면 해외 취업의 꿈이 현실이 됩니다.
                  전문가의 도움을 받아 여러분의 커리어를 성장시켜보세요.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/membership')}
                  sx={{
                    borderRadius: 8,
                    py: 1.5,
                    px: 4,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    fontSize: '1.1rem',
                    position: 'relative',
                    zIndex: 10,
                    cursor: 'pointer',
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
        <ComponentHelmet title={"Koreer - 메인"} />
    </Box>
  );
}
