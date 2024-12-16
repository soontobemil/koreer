import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Rating,
  LinearProgress,
} from '@mui/material';
import {
  Search,
  LocationOn,
  Business,
  People,
  Info,
  Star,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface CompanyInfo {
  id: number;
  name: string;
  logo: string;
  location: string;
  industry: string;
  size: string;
  rating: number;
  salaryRange: string;
  benefits: string[];
  description: string;
  culture: {
    workLifeBalance: number;
    careerGrowth: number;
    compensation: number;
    culture: number;
  };
}

export function CompanyInformation() {
  const [searchTerm, setSearchTerm] = useState('');

  const companies: CompanyInfo[] = [
    {
      id: 1,
      name: 'Amazon',
      logo: '/path/to/amazon-logo.png',
      location: 'Seattle, WA',
      industry: 'E-commerce, Cloud Computing',
      size: '1,000,000+ 직원',
      rating: 4.2,
      salaryRange: '$120K - $250K',
      benefits: ['의료보험', '401(k)', 'RSU', '유연근무'],
      description: '세계 최대의 전자상거래 및 클라우드 컴퓨팅 기업',
      culture: {
        workLifeBalance: 75,
        careerGrowth: 90,
        compensation: 95,
        culture: 85,
      },
    },
    {
      id: 2,
      name: 'Microsoft',
      logo: '/path/to/microsoft-logo.png',
      location: 'Redmond, WA',
      industry: 'Software, Cloud Computing',
      size: '180,000+ 직원',
      rating: 4.3,
      salaryRange: '$130K - $270K',
      benefits: ['종합 의료보험', '401(k) 매칭', 'RSU', '무제한 휴가'],
      description: '세계적인 소프트웨어 및 클라우드 서비스 기업',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 3,
      name: 'Google',
      logo: '/path/to/google-logo.png',
      location: 'Mountain View, CA',
      industry: 'Technology, Internet Services',
      size: '150,000+ 직원',
      rating: 4.5,
      salaryRange: '$140K - $300K',
      benefits: ['최고 수준 의료보험', '401(k)', 'GSU', '무제한 휴가'],
      description: '세계 최대의 인터넷 서비스 및 AI 기업',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 95,
        compensation: 95,
        culture: 95,
      },
    },
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            기업 정보
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            주요 IT 기업의 상세 정보와 근무 환경을 확인하세요
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
          }}
        >
          <TextField
            fullWidth
            placeholder="기업명, 지역, 산업군으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: 'background.paper' }}
          />
        </Paper>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {filteredCompanies.map((company) => (
              <Grid item xs={12} key={company.id}>
                <motion.div variants={itemVariants}>
                  <Card
                    elevation={0}
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: '100%', md: 200 },
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: { md: 1 },
                        borderBottom: { xs: 1, md: 0 },
                        borderColor: 'divider',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={company.logo}
                        alt={company.name}
                        sx={{
                          width: 120,
                          height: 120,
                          objectFit: 'contain',
                          mb: 2,
                        }}
                      />
                      <Rating value={company.rating} precision={0.1} readOnly />
                      <Typography variant="body2" color="text.secondary">
                        {company.rating} / 5.0
                      </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={8}>
                            <Stack spacing={2}>
                              <Box>
                                <Typography variant="h6" gutterBottom>
                                  {company.name}
                                </Typography>
                                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                  <Chip
                                    icon={<LocationOn />}
                                    label={company.location}
                                    size="small"
                                  />
                                  <Chip
                                    icon={<Business />}
                                    label={company.industry}
                                    size="small"
                                  />
                                  <Chip
                                    icon={<People />}
                                    label={company.size}
                                    size="small"
                                  />
                                </Stack>
                                <Typography variant="body2" paragraph>
                                  {company.description}
                                </Typography>
                              </Box>

                              <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                  주요 복리후생
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                  {company.benefits.map((benefit, idx) => (
                                    <Chip
                                      key={idx}
                                      icon={<Star fontSize="small" />}
                                      label={benefit}
                                      size="small"
                                      variant="outlined"
                                      sx={{ mt: 1 }}
                                    />
                                  ))}
                                </Stack>
                              </Box>
                            </Stack>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <Stack spacing={2}>
                              <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                  연봉 범위
                                </Typography>
                                <Typography variant="h6" color="primary">
                                  {company.salaryRange}
                                </Typography>
                              </Box>

                              <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                  기업 문화
                                </Typography>
                                <Stack spacing={1.5}>
                                  <Box>
                                    <Typography variant="body2" gutterBottom>
                                      워라밸
                                    </Typography>
                                    <LinearProgress
                                      variant="determinate"
                                      value={company.culture.workLifeBalance}
                                      sx={{ height: 6, borderRadius: 3 }}
                                    />
                                  </Box>
                                  <Box>
                                    <Typography variant="body2" gutterBottom>
                                      성장 기회
                                    </Typography>
                                    <LinearProgress
                                      variant="determinate"
                                      value={company.culture.careerGrowth}
                                      sx={{ height: 6, borderRadius: 3 }}
                                    />
                                  </Box>
                                  <Box>
                                    <Typography variant="body2" gutterBottom>
                                      보상 수준
                                    </Typography>
                                    <LinearProgress
                                      variant="determinate"
                                      value={company.culture.compensation}
                                      sx={{ height: 6, borderRadius: 3 }}
                                    />
                                  </Box>
                                  <Box>
                                    <Typography variant="body2" gutterBottom>
                                      기업 문화
                                    </Typography>
                                    <LinearProgress
                                      variant="determinate"
                                      value={company.culture.culture}
                                      sx={{ height: 6, borderRadius: 3 }}
                                    />
                                  </Box>
                                </Stack>
                              </Box>
                            </Stack>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.default',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Info color="info" />
            <Typography variant="body2" color="text.secondary">
              기업 정보는 정기적으로 업데이트되며, 실제 데이터와 차이가 있을 수 있습니다.
              더 자세한 정보는 각 기업의 공식 채용 페이지를 참고해주세요.
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
