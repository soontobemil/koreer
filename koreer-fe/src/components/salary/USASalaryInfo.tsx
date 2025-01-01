import { PageLayout } from '../shared/layouts/PageLayout';
import { Box, Grid, Stack, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { InfoCard } from '../shared/InfoCard';
import {
  Home,
  Flight,
  AttachMoney,
  Warning,
  CheckCircle,
  Work,
  BusinessCenter,
  Timeline,
} from '@mui/icons-material';

export function USASalaryInfo() {
  const navigationTabs = [
    {
      label: '비자 정보',
      path: '/visa-info/usa',
      icon: <Flight />
    },
    {
      label: '연봉 정보',
      path: '/salary-info/usa',
      icon: <AttachMoney />
    },
    {
      label: '생활 정보',
      path: '/life-info/usa',
      icon: <Home />
    }
  ];

  const breadcrumbs = [
    { label: '홈', path: '/' },
    { label: '취업 정보', path: '/employment-info' },
    { label: '미국', path: '/salary-info/usa' },
    { label: '연봉 정보' }
  ];

  const salaryByRole = [
    {
      role: '소프트웨어 엔지니어',
      icon: <Work />,
      levels: [
        {
          level: 'Junior (0-3년)',
          salary: {
            sf: '$120,000-160,000',
            nyc: '$100,000-140,000',
            seattle: '$110,000-150,000',
          },
          benefits: [
            '의료/치과/안과 보험',
            '401(k) 매칭',
            '주식 옵션',
            '유급 휴가 15-20일'
          ]
        },
        {
          level: 'Mid-Level (3-5년)',
          salary: {
            sf: '$160,000-220,000',
            nyc: '$140,000-200,000',
            seattle: '$150,000-210,000',
          },
          benefits: [
            '높은 보너스',
            'RSU 지원',
            '교육 지원',
            '유연 근무'
          ]
        },
        {
          level: 'Senior (5년+)',
          salary: {
            sf: '$220,000-350,000+',
            nyc: '$200,000-320,000+',
            seattle: '$210,000-330,000+',
          },
          benefits: [
            '리더십 보너스',
            'sabbatical 휴가',
            '높은 RSU',
            '건강관리 프로그램'
          ]
        }
      ]
    },
    {
      role: '프론트엔드 개발자',
      icon: <Work />,
      levels: [
        {
          level: 'Junior (0-3년)',
          salary: {
            sf: '$110,000-150,000',
            nyc: '$95,000-135,000',
            seattle: '$100,000-140,000',
          },
          benefits: [
            '기본 의료보험',
            '401(k)',
            '주식 옵션',
            '유급 휴가'
          ]
        },
        {
          level: 'Mid-Level (3-5년)',
          salary: {
            sf: '$150,000-200,000',
            nyc: '$135,000-185,000',
            seattle: '$140,000-190,000',
          },
          benefits: [
            '추가 보너스',
            'RSU',
            '교육비 지원',
            '원격 근무'
          ]
        }
      ]
    },
    {
      role: '백엔드 개발자',
      icon: <Work />,
      levels: [
        {
          level: 'Junior (0-3년)',
          salary: {
            sf: '$115,000-155,000',
            nyc: '$100,000-140,000',
            seattle: '$105,000-145,000',
          },
          benefits: [
            '의료보험',
            '401(k)',
            '주식 옵션',
            '유급 휴가'
          ]
        },
        {
          level: 'Mid-Level (3-5년)',
          salary: {
            sf: '$155,000-210,000',
            nyc: '$140,000-190,000',
            seattle: '$145,000-200,000',
          },
          benefits: [
            '성과 보너스',
            'RSU',
            '교육 지원',
            '유연 근무'
          ]
        }
      ]
    }
  ];

  const compensationTips = [
    {
      title: '협상 전략',
      icon: <BusinessCenter />,
      tips: [
        '시장 평균 연봉 조사',
        '총 보상 패키지 고려',
        '협상 가능 항목 파악',
        '경쟁 오퍼 활용'
      ]
    },
    {
      title: '경력 개발',
      icon: <Timeline />,
      tips: [
        '기술 스택 확장',
        '리더십 경험 쌓기',
        '업계 네트워크 형성',
        '지속적 학습'
      ]
    }
  ];

  const taxInfo = {
    title: '세금 정보',
    icon: <AttachMoney />,
    details: [
      {
        category: '연방세',
        info: [
          '소득 구간별 차등 적용',
          '22-37% 세율 일반적',
          'W-2 양식으로 신고',
          '공제 항목 활용'
        ]
      },
      {
        category: '주세',
        info: [
          '주별 세율 상이',
          '캘리포니아 최대 13.3%',
          '워싱턴 주 무소득세',
          '지방세 별도'
        ]
      }
    ]
  };

  return (
    <PageLayout
      title="미국 연봉 정보"
      subtitle="직무별 연봉 범위와 혜택 정보"
      tabs={navigationTabs}
      breadcrumbs={breadcrumbs}
    >
      <Stack spacing={6}>
        {/* 직무별 연봉 정보 */}
        {salaryByRole.map((roleInfo, index) => (
          <Box key={index}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              {roleInfo.role}
            </Typography>
            <Grid container spacing={3}>
              {roleInfo.levels.map((level, lidx) => (
                <Grid item xs={12} md={4} key={lidx}>
                  <InfoCard
                    title={level.level}
                    icon={roleInfo.icon}
                    status="info"
                  >
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>연봉 범위</Typography>
                        <List dense>
                          <ListItem>
                            <ListItemText primary={`샌프란시스코: ${level.salary.sf}`} />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary={`뉴욕: ${level.salary.nyc}`} />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary={`시애틀: ${level.salary.seattle}`} />
                          </ListItem>
                        </List>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>혜택</Typography>
                        <List dense>
                          {level.benefits.map((benefit, bidx) => (
                            <ListItem key={bidx}>
                              <ListItemIcon>
                                <CheckCircle color="success" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={benefit} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Stack>
                  </InfoCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        {/* 세금 정보 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            {taxInfo.title}
          </Typography>
          <Grid container spacing={3}>
            {taxInfo.details.map((detail, index) => (
              <Grid item xs={12} md={6} key={index}>
                <InfoCard
                  title={detail.category}
                  icon={taxInfo.icon}
                  status="info"
                >
                  <List dense>
                    {detail.info.map((item, iidx) => (
                      <ListItem key={iidx}>
                        <ListItemIcon>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </InfoCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 협상 및 경력 개발 팁 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            협상 및 경력 개발
          </Typography>
          <Grid container spacing={3}>
            {compensationTips.map((tip, index) => (
              <Grid item xs={12} md={6} key={index}>
                <InfoCard
                  title={tip.title}
                  icon={tip.icon}
                  status="info"
                >
                  <List dense>
                    {tip.tips.map((item, iidx) => (
                      <ListItem key={iidx}>
                        <ListItemIcon>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </InfoCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 주의사항 */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.default',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Warning color="info" />
            <Typography variant="body2" color="text.secondary">
              제시된 연봉 범위는 일반적인 기준이며, 회사, 지역, 경력, 기술 스택 등에 따라 
              실제 금액은 차이가 있을 수 있습니다. 최신 시장 동향과 구체적인 정보는 
              Glassdoor, Levels.fyi 등의 사이트를 참고하시기 바랍니다.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </PageLayout>
  );
}
