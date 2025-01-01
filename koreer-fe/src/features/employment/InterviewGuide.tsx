import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  School,
  Work,
  Psychology,
  Code,
  Build,
  TrendingUp,
  Person,
  DataObject,
  Storage as StorageIcon,
  Architecture,
  Speed,
  Group as GroupIcon,
  Lightbulb,
  CheckCircle,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { PageLayout } from '../../components/shared/layouts/PageLayout';
import { InfoCard } from '../../components/shared/InfoCard';

interface Question {
  en: string;
  kr: string;
  example: string;
  tips: string[];
}

interface Example {
  title: string;
  problem: string;
  solution: string;
  explanation: string;
  tips: string[];
}

interface Point {
  title: string;
  details: string[];
}

interface ContentWithExamples {
  subtitle: string;
  examples: Example[];
  type: 'examples';
}

interface ContentWithPoints {
  subtitle: string;
  points: Point[];
  type: 'points';
}

type Content = ContentWithExamples | ContentWithPoints;

interface TechnicalTopic {
  title: string;
  icon: React.ReactElement;
  content: Content[];
}

interface CodingTopic {
  title: string;
  icon: React.ReactElement;
  content: Content[];
}

interface BehavioralTopic {
  title: string;
  icon: React.ReactElement;
  questions: Question[];
}

function isContentWithExamples(content: Content): content is ContentWithExamples {
  return content.type === 'examples';
}

function isContentWithPoints(content: Content): content is ContentWithPoints {
  return content.type === 'points';
}

export function InterviewGuide(): JSX.Element {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationTabs = [
    {
      label: '기술 면접',
      path: '/interview-guide/technical',
      icon: <Code />
    },
    {
      label: '인성 면접',
      path: '/interview-guide/behavioral',
      icon: <Person />
    },
    {
      label: '코딩 테스트',
      path: '/interview-guide/coding-test',
      icon: <DataObject />
    }
  ];

  const breadcrumbs = [
    { label: '홈', path: '/' },
    { label: '취업 정보', path: '/employment-info' },
    { label: '면접 준비' }
  ];

  const technicalTopics: TechnicalTopic[] = [
    {
      title: '웹 개발 기초',
      icon: <Code />,
      content: [
        {
          type: 'points',
          subtitle: '자주 나오는 질문',
          points: [
            {
              title: 'RESTful API',
              details: [
                'REST 아키텍처의 주요 원칙 설명',
                'HTTP 메소드(GET, POST, PUT, DELETE)의 적절한 사용',
                'URI 설계 best practices',
                '상태 코드의 올바른 사용'
              ]
            },
            {
              title: '브라우저 동작 원리',
              details: [
                'Critical Rendering Path 설명',
                'DOM과 Virtual DOM의 차이',
                '브라우저 렌더링 과정',
                '웹 성능 최적화 방법'
              ]
            }
          ]
        }
      ]
    },
    {
      title: '데이터베이스',
      icon: <StorageIcon />,
      content: [
        {
          type: 'points',
          subtitle: '핵심 개념',
          points: [
            {
              title: 'SQL vs NoSQL',
              details: [
                '각 데이터베이스 유형의 특징과 사용 사례',
                '트랜잭션과 ACID 속성',
                '인덱싱의 원리와 최적화',
                '데이터베이스 정규화'
              ]
            },
            {
              title: '성능 최적화',
              details: [
                '쿼리 최적화 기법',
                '인덱스 설계 전략',
                '캐싱 전략',
                '데이터베이스 샤딩과 파티셔닝'
              ]
            }
          ]
        }
      ]
    }
  ];

  const behavioralTopics: BehavioralTopic[] = [
    {
      title: '리더십 & 팀워크',
      icon: <GroupIcon />,
      questions: [
        {
          en: "Tell me about a time when you had to lead a challenging project.",
          kr: "어려운 프로젝트를 이끌어야 했던 경험에 대해 말씀해주세요.",
          example: `"이전 회사에서 5명의 개발자로 구성된 팀을 이끌어 레거시 시스템을 마이크로서비스 아키텍처로 마이그레이션하는 프로젝트를 진행했습니다.

상황: 기존의 모놀리식 시스템이 유지보수와 확장이 어려워지고 있었습니다.
과제: 서비스 중단 없이 마이그레이션을 완료해야 했습니다.
행동:
- 명확한 마일스톤이 있는 상세 마이그레이션 계획 수립
- 안정성 보장을 위한 자동화된 테스트 구현
- 일일 스탠드업 미팅으로 이슈 해결
- 모니터링 및 롤백 절차 구축
결과: 무중단으로 마이그레이션을 완료했고, 시스템 성능이 40% 향상되었으며, 배포 시간이 수 시간에서 수 분으로 단축되었습니다."`,
          tips: [
            'STAR 방식으로 구체적 사례 준비',
            '정량적 결과 포함 (팀 규모, 성과 수치)',
            '직면한 도전과 해결 방법 강조',
            '배운 점 명확히 설명'
          ]
        }
      ]
    },
    {
      title: '문제 해결 능력',
      icon: <Psychology />,
      questions: [
        {
          en: "Describe a situation where you had to solve a complex technical problem.",
          kr: "복잡한 기술적 문제를 해결했던 경험을 설명해주세요.",
          example: `"프로덕션 환경에서 간헐적으로 발생하는 메모리 누수 문제를 해결했던 경험이 있습니다.

상황: 특정 시간대에 서버의 메모리 사용량이 급격히 증가하는 현상이 발생했습니다.
과제: 서비스 중단 없이 근본 원인을 파악하고 해결해야 했습니다.
행동:
- 로그 분석 및 모니터링 도구를 활용한 패턴 분석
- 힙 덤프 분석으로 메모리 누수 지점 파악
- 테스트 환경에서 문제 재현 및 검증
- 코드 리뷰를 통한 해결책 검증
결과: 커넥션 풀 관리 로직의 버그를 발견하고 수정하여 메모리 사용량을 30% 절감했습니다."`,
          tips: [
            '문제 해결 과정의 체계적인 접근 방식 강조',
            '기술적 깊이와 분석력 보여주기',
            '팀 협업을 통한 해결 과정 설명',
            '측정 가능한 결과 제시'
          ]
        }
      ]
    },
    {
      title: '성장 마인드셋',
      icon: <TrendingUp />,
      questions: [
        {
          en: "How do you keep yourself updated with new technologies?",
          kr: "새로운 기술을 어떻게 학습하고 따라가시나요?",
          example: `"저는 체계적인 학습 계획과 실천을 통해 기술력을 향상시키고 있습니다.

상황: 빠르게 변화하는 기술 트렌드에 대응하기 위해 지속적인 학습이 필요했습니다.
과제: 업무와 학습의 균형을 맞추면서 효과적으로 새로운 기술을 습득해야 했습니다.
행동:
- 주간 학습 목표 설정 및 진도 관리
- 기술 블로그 작성으로 학습 내용 정리
- 사이드 프로젝트를 통한 실전 적용
- 기술 커뮤니티 활동 및 지식 공유
결과: 최근 6개월간 3개의 새로운 기술 스택을 습득하여 실제 프로젝트에 적용했습니다."`,
          tips: [
            '구체적인 학습 방법론 제시',
            '자기주도적 학습 능력 강조',
            '지식 공유와 커뮤니티 기여 언급',
            '실제 적용 사례 포함'
          ]
        }
      ]
    }
  ];

  const codingTestTopics: CodingTopic[] = [
    {
      title: '알고리즘 문제 유형',
      icon: <Code />,
      content: [
        {
          type: 'examples',
          subtitle: '문자열 처리',
          examples: [
            {
              title: "문자열 단어 뒤집기",
              problem: `문자열 s가 주어졌을 때, 단어의 순서를 뒤집으시오.
예시:
입력: "하늘이 매우 파랗다"
출력: "파랗다 매우 하늘이"`,
              solution: `
function reverseWords(s: string): string {
  return s.trim().split(/\\s+/).reverse().join(' ');
}`,
              explanation: "1. trim()으로 앞뒤 공백 제거\n2. 정규식으로 연속된 공백을 처리하며 단어 분리\n3. reverse()로 단어 순서 뒤집기\n4. join()으로 단어들을 다시 공백으로 연결",
              tips: [
                '입력값 전처리의 중요성',
                '정규식을 활용한 효율적인 문자열 처리',
                '자바스크립트 내장 함수 활용',
                '시간 복잡도 고려'
              ]
            }
          ]
        },
        {
          type: 'examples',
          subtitle: '배열과 정렬',
          examples: [
            {
              title: "두 수의 합",
              problem: `정수 배열 nums와 목표값 target이 주어질 때, 합이 target이 되는 두 수의 인덱스를 찾으시오.
예시:
입력: nums = [2, 7, 11, 15], target = 9
출력: [0, 1] (2 + 7 = 9)`,
              solution: `
function twoSum(nums: number[], target: number): number[] {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
              explanation: "1. HashMap을 사용하여 각 숫자와 인덱스를 저장\n2. 현재 숫자와의 합이 target이 되는 수(complement)가 이미 있는지 확인\n3. 있다면 두 수의 인덱스 반환\n4. 없다면 현재 숫자와 인덱스를 맵에 저장",
              tips: [
                'HashMap을 활용한 시간 복잡도 최적화',
                '브루트 포스 대신 효율적인 접근',
                '공간 복잡도와 시간 복잡도의 트레이드오프',
                '엣지 케이스 처리 중요'
              ]
            }
          ]
        }
      ]
    },
    {
      title: '자료구조 활용',
      icon: <StorageIcon />,
      content: [
        {
          type: 'points',
          subtitle: '핵심 자료구조',
          points: [
            {
              title: '해시맵 (HashMap)',
              details: [
                '키-값 쌍으로 데이터 저장',
                'O(1) 시간 복잡도로 검색/삽입/삭제',
                '충돌 해결 방법 이해',
                '공간과 시간의 트레이드오프'
              ]
            },
            {
              title: '스택과 큐 (Stack & Queue)',
              details: [
                'LIFO vs FIFO 원칙',
                '괄호 매칭, DFS 등에 활용',
                '우선순위 큐와 힙의 관계',
                '실제 구현 시 고려사항'
              ]
            }
          ]
        }
      ]
    }
  ];

  const renderExamples = (examples: Example[]): JSX.Element => (
    <>
      {examples.map((example: Example, eIndex: number) => (
        <Box key={eIndex} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            {example.title}
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'background.default', mb: 2 }}>
            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
              {example.problem}
            </Typography>
          </Paper>
          <Typography variant="subtitle2" gutterBottom>
            Solution:
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'background.default', mb: 2 }}>
            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
              {example.solution}
            </Typography>
          </Paper>
          <Typography variant="subtitle2" gutterBottom>
            설명:
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {example.explanation}
          </Typography>
          <List dense>
            {example.tips.map((tip: string, tIndex: number) => (
              <ListItem key={tIndex}>
                <ListItemIcon>
                  <CheckCircle color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={tip} />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </>
  );

  const renderPoints = (points: Point[]): JSX.Element => (
    <>
      {points.map((point: Point, pIndex: number) => (
        <Box key={pIndex}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            {point.title}
          </Typography>
          <List dense>
            {point.details.map((detail: string, dIndex: number) => (
              <ListItem key={dIndex}>
                <ListItemIcon>
                  <CheckCircle color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={detail} />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </>
  );

  return (
    <PageLayout
      title="면접 준비 가이드"
      subtitle="기술 면접부터 인성 면접까지, 성공적인 면접을 위한 완벽 가이드"
      tabs={navigationTabs}
      breadcrumbs={breadcrumbs}
    >
      <Stack spacing={6}>
        {currentPath.endsWith('/technical') && (
          <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              기술 면접 준비
            </Typography>
            <Grid container spacing={3}>
              {technicalTopics.map((topic: TechnicalTopic, index: number) => (
                <Grid item xs={12} key={index}>
                  <InfoCard
                    title={topic.title}
                    icon={topic.icon}
                    status="info"
                  >
                    <Stack spacing={3}>
                      {topic.content.map((section: Content, sIndex: number) => (
                        <Box key={sIndex}>
                          <Typography variant="h6" gutterBottom>
                            {section.subtitle}
                          </Typography>
                          {isContentWithExamples(section) && renderExamples(section.examples)}
                          {isContentWithPoints(section) && renderPoints(section.points)}
                        </Box>
                      ))}
                    </Stack>
                  </InfoCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {currentPath.endsWith('/behavioral') && (
          <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              인성 면접 준비
            </Typography>
            <Grid container spacing={3}>
              {behavioralTopics.map((topic: BehavioralTopic, index: number) => (
                <Grid item xs={12} key={index}>
                  <InfoCard
                    title={topic.title}
                    icon={topic.icon}
                    status="info"
                  >
                    <Stack spacing={3}>
                      {topic.questions.map((question: Question, qIndex: number) => (
                        <Box key={qIndex}>
                          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Q: {question.en}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            {question.kr}
                          </Typography>
                          <Paper sx={{ p: 2, bgcolor: 'background.default', my: 2 }}>
                            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                              {question.example}
                            </Typography>
                          </Paper>
                          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                            답변 팁:
                          </Typography>
                          <List dense>
                            {question.tips.map((tip: string, tIndex: number) => (
                              <ListItem key={tIndex}>
                                <ListItemIcon>
                                  <CheckCircle color="success" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={tip} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      ))}
                    </Stack>
                  </InfoCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {currentPath.endsWith('/coding-test') && (
          <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              코딩 테스트 준비
            </Typography>
            <Grid container spacing={3}>
              {codingTestTopics.map((topic: CodingTopic, index: number) => (
                <Grid item xs={12} key={index}>
                  <InfoCard
                    title={topic.title}
                    icon={topic.icon}
                    status="info"
                  >
                    <Stack spacing={3}>
                      {topic.content.map((section: Content, sIndex: number) => (
                        <Box key={sIndex}>
                          <Typography variant="h6" gutterBottom>
                            {section.subtitle}
                          </Typography>
                          {isContentWithExamples(section) && renderExamples(section.examples)}
                          {isContentWithPoints(section) && renderPoints(section.points)}
                        </Box>
                      ))}
                    </Stack>
                  </InfoCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

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
            <WarningIcon color="info" />
            <Typography variant="body2" color="text.secondary">
              면접 준비는 단순 암기가 아닌 깊이 있는 이해와 실제 경험을 바탕으로 해야 합니다.
              제시된 내용을 참고하되, 자신만의 경험과 생각을 정리하여 준비하세요.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </PageLayout>
  );
}
