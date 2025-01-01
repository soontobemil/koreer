import { PageLayout } from '../shared/layouts/PageLayout';
import { Box, Grid, Stack, Typography, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { InfoCard } from '../shared/InfoCard';
import {
  Home,
  Flight,
  AttachMoney,
  LocalHospital,
  School,
  DirectionsCar,
  AccountBalance,
  LocationCity,
  Warning,
  CheckCircle,
  AcUnit,
  WbSunny,
} from '@mui/icons-material';

export function USALifeInfo() {
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
    { label: '미국', path: '/life-info/usa' },
    { label: '생활 정보' }
  ];

  const cityInfo = [
    {
      city: '샌프란시스코',
      description: '실리콘밸리의 중심, 기술 혁신의 허브',
      pros: [
        '최고의 IT 기업들',
        '높은 연봉 수준',
        '혁신적인 환경',
        '온화한 기후'
      ],
      cons: [
        '세계 최고 수준의 생활비',
        '극심한 주택난',
        '소득 격차',
        '노숙자 문제'
      ],
      weather: '여름 평균 20°C, 겨울 평균 12°C',
      costOfLiving: {
        rent: '$3,000-4,500 (1베드룸)',
        utilities: '$150-200',
        transport: '$100 (월간 패스)',
        food: '$600-800 (월)',
      }
    },
    {
      city: '시애틀',
      description: '아마존, 마이크로소프트의 본거지',
      pros: [
        '주요 IT 기업 밀집',
        '자연과의 근접성',
        '무소득세 주',
        '높은 삶의 질'
      ],
      cons: [
        '높은 생활비',
        '잦은 강우',
        '긴 겨울',
        '교통 체증'
      ],
      weather: '여름 평균 23°C, 겨울 평균 5°C',
      costOfLiving: {
        rent: '$2,200-3,500 (1베드룸)',
        utilities: '$130-180',
        transport: '$99 (월간 패스)',
        food: '$500-700 (월)',
      }
    },
    {
      city: '뉴욕',
      description: '세계 금융의 중심지, 다양한 기회의 도시',
      pros: [
        '다양한 취업 기회',
        '문화적 다양성',
        '편리한 대중교통',
        '24시간 활기찬 도시'
      ],
      cons: [
        '극도로 높은 생활비',
        '좁은 주거 공간',
        '혼잡한 환경',
        '높은 세금'
      ],
      weather: '여름 평균 28°C, 겨울 평균 0°C',
      costOfLiving: {
        rent: '$3,500-5,000 (1베드룸)',
        utilities: '$150-250',
        transport: '$127 (월간 패스)',
        food: '$600-900 (월)',
      }
    }
  ];

  const lifeCategories = [
    {
      title: '의료 시스템',
      icon: <LocalHospital />,
      points: [
        {
          subtitle: '의료보험',
          details: [
            '회사 제공 의료보험 일반적',
            '보험사별 네트워크 확인 필요',
            'Deductible과 Copay 이해',
            '처방약 보장 범위 확인'
          ]
        },
        {
          subtitle: '의료 서비스',
          details: [
            'Primary Care Physician 지정',
            '전문의 진료 의뢰(Referral) 시스템',
            '응급실 이용 비용 높음',
            '예방 접종 및 검진 보장'
          ]
        }
      ]
    },
    {
      title: '교육 시스템',
      icon: <School />,
      points: [
        {
          subtitle: '공립 교육',
          details: [
            '거주지역 학군 중요',
            '학군별 교육 수준 차이',
            'ESL 프로그램 제공',
            '방과후 활동 다양'
          ]
        },
        {
          subtitle: '고등 교육',
          details: [
            '세계 최고 수준 대학들',
            '높은 등록금',
            '장학금/학자금 대출',
            'OPT 프로그램 활용'
          ]
        }
      ]
    },
    {
      title: '교통 시스템',
      icon: <DirectionsCar />,
      points: [
        {
          subtitle: '대중교통',
          details: [
            '도시별 편차 큼',
            '대도시 중심 발달',
            'Uber/Lyft 보편화',
            '도시간 이동은 비행기 선호'
          ]
        },
        {
          subtitle: '자가용',
          details: [
            '운전면허 시험 필수',
            '자동차 보험 의무',
            '주차 비용 고려',
            '장거리 운전 일반적'
          ]
        }
      ]
    },
    {
      title: '금융 시스템',
      icon: <AccountBalance />,
      points: [
        {
          subtitle: '은행 계좌',
          details: [
            'SSN 또는 ITIN 필요',
            '신용점수 관리 중요',
            '체크카드 사용 일반적',
            '온라인 뱅킹 보편화'
          ]
        },
        {
          subtitle: '세금',
          details: [
            '연방세/주세/지방세',
            '세금 신고 의무',
            '401(k) 은퇴 계획',
            'W-2/1099 양식 이해'
          ]
        }
      ]
    }
  ];

  const seasonalTips = [
    {
      season: '여름 (6-8월)',
      icon: <WbSunny />,
      tips: [
        '에어컨 필수',
        '전기세 증가 예상',
        '자외선 차단 중요',
        '휴가 시즌 계획'
      ]
    },
    {
      season: '겨울 (12-2월)',
      icon: <AcUnit />,
      tips: [
        '난방비 증가',
        '겨울 의류 준비',
        '제설 장비 구비',
        '월동 준비'
      ]
    }
  ];

  return (
    <PageLayout
      title="미국 생활 정보"
      subtitle="도시별 생활 정보와 정착 가이드"
      tabs={navigationTabs}
      breadcrumbs={breadcrumbs}
    >
      <Stack spacing={6}>
        {/* 도시 정보 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            주요 도시 정보
          </Typography>
          <Grid container spacing={3}>
            {cityInfo.map((city, index) => (
              <Grid item xs={12} md={6} key={index}>
                <InfoCard
                  title={city.city}
                  subtitle={city.description}
                  icon={<LocationCity />}
                  status="info"
                >
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>장점</Typography>
                      <List dense>
                        {city.pros.map((pro, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <CheckCircle color="success" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={pro} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>단점</Typography>
                      <List dense>
                        {city.cons.map((con, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <Warning color="error" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={con} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>생활비</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Chip label={`월세: ${city.costOfLiving.rent}`} sx={{ mb: 1 }} />
                        </Grid>
                        <Grid item xs={6}>
                          <Chip label={`공과금: ${city.costOfLiving.utilities}`} sx={{ mb: 1 }} />
                        </Grid>
                        <Grid item xs={6}>
                          <Chip label={`교통비: ${city.costOfLiving.transport}`} sx={{ mb: 1 }} />
                        </Grid>
                        <Grid item xs={6}>
                          <Chip label={`식비: ${city.costOfLiving.food}`} sx={{ mb: 1 }} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Stack>
                </InfoCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 생활 카테고리 */}
        {lifeCategories.map((category, index) => (
          <Box key={index}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              {category.title}
            </Typography>
            <Grid container spacing={3}>
              {category.points.map((point, pidx) => (
                <Grid item xs={12} md={6} key={pidx}>
                  <InfoCard
                    title={point.subtitle}
                    icon={category.icon}
                    status="info"
                  >
                    <List dense>
                      {point.details.map((detail, didx) => (
                        <ListItem key={didx}>
                          <ListItemIcon>
                            <CheckCircle color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={detail} />
                        </ListItem>
                      ))}
                    </List>
                  </InfoCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        {/* 계절별 팁 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            계절별 생활 팁
          </Typography>
          <Grid container spacing={3}>
            {seasonalTips.map((season, index) => (
              <Grid item xs={12} md={6} key={index}>
                <InfoCard
                  title={season.season}
                  icon={season.icon}
                  status="info"
                >
                  <List dense>
                    {season.tips.map((tip, tidx) => (
                      <ListItem key={tidx}>
                        <ListItemIcon>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={tip} />
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
              제공된 정보는 일반적인 가이드라인이며, 지역과 시기에 따라 차이가 있을 수 있습니다.
              최신 정보는 미국 정부 공식 웹사이트나 현지 기관을 통해 확인하시기 바랍니다.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </PageLayout>
  );
}
