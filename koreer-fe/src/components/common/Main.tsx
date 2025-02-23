import React, {useState} from 'react';
import {Alert, Box, Button, Container, Grid, IconButton, Paper, Snackbar, TextField, Typography,} from '@mui/material';
import {motion} from 'framer-motion';
import {styled} from '@mui/material/styles';
import koreerLogo from '../../assets/img/koreer_logo_cropped.png';
import {CloudBackground} from './CloudBackground';
import {ParticleBackground} from './ParticleBackground';
import {Code, Public, School, Send, WorkOutline,} from '@mui/icons-material';
import {ComponentHelmet} from "../../components/common/ComponentHelmet";
import {ChatBot} from "../../components/common/main/ChatBot";

enum TopicCategory {
    TECH = "TECH",
    INTERVIEW = "INTERVIEW",
    MARKETING = "MARKETING",
}

interface TopicOption {
  id: string;
  label: string;
  category: TopicCategory;
  description: string;
  icon: React.ReactNode;
}

interface FormData {
  email: string;
  topics: string;
  category: TopicCategory;
}

// Styled Components
const Logo = styled('img')`
  width: 300px;  // 200px에서 300px로 증가
  height: auto;
  margin-bottom: 3rem;  // 2rem에서 3rem으로 증가
`;

const StyledPaper = styled(Paper)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;
  z-index: 3;
  padding: 3rem;  // 2rem에서 3rem으로 증가
  border-radius: 20px;  // 16px에서 20px로 증가
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);  // 그림자 강화
  }
`;

export default function Main() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    topics: 'tech-trend',
    category: TopicCategory.TECH,
  });
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // 이메일 유효성 검사를 위한 정규식
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

            // 이메일 빈값 체크
            if (!formData.email.trim()) {
                alert("이메일을 입력해주세요.");
                return;
            }

            // 이메일 형식 체크
            if (!emailRegex.test(formData.email)) {
                alert("올바른 이메일 형식이 아닙니다.");
                return;
            }

            // 카테고리 선택 체크
            if (!formData.category) {
                alert("관심있는 소식을 선택해주세요.");
                return;
            }

            const requestData = {
                user_email: formData.email,
                category: formData.category
            };

            if (window.confirm(`${formData.email}로 구독하시겠습니까?`)) {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/subscriber/subscribers`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });

                if (!response.ok) {
                    throw new Error('구독 신청에 실패했습니다.');
                }

                setOpenSnackbar(true);
            }

        } catch (error) {
            setError('구독 신청 중 오류가 발생했습니다.');
            console.error('Subscription error:', error);
        }
    };

  const topicOptions: TopicOption[] = [
    {
      id: 'tech-trend',
      category: TopicCategory.TECH,
      label: '실리콘밸리 트렌드',
      description: '최신 기술 스택과 개발 문화',
      icon: <Code />
    },
    {
      id: 'interview',
      category: TopicCategory.INTERVIEW,
      label: '빅테크 인터뷰',
      description: '코딩 테스트부터 시스템 디자인까지',
      icon: <School />
    },
    {
      id: 'life',
      category: TopicCategory.MARKETING,
      label: '글로벌 커리어',
      description: 'H1B, 주거, 연봉 협상 등',
      icon: <Public />
    },
    {
      id: 'job-market',
      category: TopicCategory.MARKETING,
      label: '채용 인사이트',
      description: '현직자의 실시간 채용 정보',
      icon: <WorkOutline />
    }
  ];

    const handleTopicToggle = (
        {topicId, category}: { topicId: string, category: TopicCategory }) => {
        setFormData(prev => ({
            ...prev,
            topics: prev.topics.includes(topicId)
                ? "" // 이미 선택된 토픽을 다시 클릭하면 빈 문자열로
                : topicId, // 새로운 토픽 선택 시 해당 topicId 문자열로
            category: category
        }));
    };

  return (
      <Box sx={{
        minHeight: '100vh',
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <ParticleBackground />
        <CloudBackground />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
          >
            <Box textAlign="center" mb={12}>
              <Logo src={koreerLogo} alt="Koreer Logo" />
              <Typography
                  variant="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                  }}
              >
                실리콘밸리의 모든 것
              </Typography>
              <Typography
                  variant="h3"
                  gutterBottom
                  color="primary"
                  sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}
              >
                매일 아침 메일로 받아보세요
              </Typography>
              <Typography
                  variant="h6"
                  color="text.secondary"
                  mb={6}
                  sx={{
                    lineHeight: 1.8,
                    fontSize: { xs: '1.1rem', md: '1.3rem' }
                  }}
              >
                현지 개발자들의 생생한 이야기부터<br />
                실전 면접 준비까지, 여러분의 커리어를 함께 만들어갑니다
              </Typography>
            </Box>

            <Grid container spacing={6} justifyContent="center">
              <Grid item xs={12} md={8}>
                <StyledPaper elevation={3}>
                  <Typography
                      variant="h4"
                      gutterBottom
                      fontWeight="bold"
                      sx={{ mb: 4 }}
                  >
                    관심있는 소식을 선택하세요
                  </Typography>

                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    {topicOptions.map((topic) => (
                        <Grid item xs={12} sm={6} key={topic.id}>
                          <Paper
                              onClick={() => handleTopicToggle(
                                  {topicId: topic.id, category:topic.category}
                              )}
                              sx={{
                                p: 3,
                                cursor: 'pointer',
                                border: '2px solid',
                                borderColor: formData.topics.includes(topic.id)
                                    ? 'primary.main'
                                    : 'transparent',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: 3
                                }
                              }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <IconButton
                                  sx={{
                                    color: 'primary.main',
                                    mr: 2
                                  }}
                              >
                                {topic.icon}
                              </IconButton>
                              <Typography variant="h6" fontWeight="bold">
                                {topic.label}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {topic.description}
                            </Typography>
                          </Paper>
                        </Grid>
                    ))}
                  </Grid>

                  <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="이메일 주소를 입력하세요"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            email: e.target.value
                          }))}
                          error={!!error}
                          helperText={error}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              height: '60px',
                              fontSize: '1.1rem'
                            }
                          }}
                      />
                      <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          endIcon={<Send />}
                          sx={{
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            color: 'white',
                            minWidth: '160px',
                            height: '60px',
                            fontSize: '1.1rem'
                          }}
                      >
                        구독하기
                      </Button>
                    </Box>
                  </form>
                </StyledPaper>
              </Grid>
            </Grid>
          </motion.div>
        </Container>

          <Snackbar
              open={openSnackbar}
              autoHideDuration={4000}
              onClose={() => setOpenSnackbar(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              sx={{
                  top: '30% !important',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
              }}
          >
              <Alert
                  severity="success"
                  sx={{
                      width: 'auto',
                      minWidth: '400px',
                      fontSize: '1.3rem',
                      padding: '20px 40px',
                      '& .MuiAlert-icon': {
                          fontSize: '2.5rem'
                      },
                      '& .MuiAlert-message': {
                          textAlign: 'center',
                          fontWeight: 'bold'
                      }
                  }}
              >
                  구독 신청이 완료되었습니다!
              </Alert>
          </Snackbar>
        <ChatBot />
        <ComponentHelmet title="Koreer - 실리콘밸리 커리어 뉴스레터" />
      </Box>
  );
}