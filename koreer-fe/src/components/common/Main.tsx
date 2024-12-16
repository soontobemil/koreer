import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import koreerLogo from '../../assets/img/koreer_logo.png';
import { CloudBackground } from './CloudBackground';
import { ParticleBackground } from './ParticleBackground';

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
  width: 200px;
  height: 200px;
  margin: 0 auto;
  perspective: 1000px;
  z-index: 3;
`;

const Logo = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 20px rgba(33, 150, 243, 0.3));
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

export default function Main() {
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
      title: "해외 취업 정보",
      description: "미국, 캐나다 등 주요 국가의 IT 취업 정보를 제공합니다.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "비자 가이드",
      description: "취업 비자 신청부터 승인까지 상세한 가이드를 제공합니다.",
      gradient: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)"
    },
    {
      title: "연봉 정보",
      description: "국가별, 도시별 실제 연봉 정보와 생활비를 확인하세요.",
      gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
    },
    {
      title: "커뮤니티",
      description: "해외 취업 준비생들과 정보를 공유하고 소통하세요.",
      gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pt: 8,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <BackgroundWrapper>
        <ParticleBackground />
        <CloudBackground />
      </BackgroundWrapper>
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ position: 'relative', height: '500px', mb: 8 }}>
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

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                custom={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <StyledPaper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 4,
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
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
                      position: 'relative'
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
    </Box>
  );
}
