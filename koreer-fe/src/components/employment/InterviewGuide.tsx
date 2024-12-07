import { ReactElement } from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import {
  Code,
  Person,
  Psychology,
  Assignment,
  CheckCircle,
  Warning,
  QuestionAnswer,
  MenuBook,
  DataObject,
  Storage,
  Architecture,
  Speed,
  Group,
  Lightbulb,
  TrendingUp,
} from '@mui/icons-material';
import { PageLayout } from '../shared/layouts/PageLayout';
import { InfoCard } from '../shared/InfoCard';

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

interface CodingTopic {
  title: string;
  icon: ReactElement;
  content: Content[];
}

interface BehavioralTopic {
  title: string;
  icon: ReactElement;
  questions: Question[];
}

function isContentWithExamples(content: Content): content is ContentWithExamples {
  return content.type === 'examples';
}

function isContentWithPoints(content: Content): content is ContentWithPoints {
  return content.type === 'points';
}

export function InterviewGuide(): JSX.Element {
  const navigationTabs = [
    {
      label: '기술 면접',
      path: '/interview-guide#technical',
      icon: <Code />
    },
    {
      label: '인성 면접',
      path: '/interview-guide#behavioral',
      icon: <Person />
    },
    {
      label: '코딩 테스트',
      path: '/interview-guide#coding-test',
      icon: <DataObject />
    }
  ];

  const breadcrumbs = [
    { label: '홈', path: '/' },
    { label: '취업 정보', path: '/employment-info' },
    { label: '면접 준비' }
  ];

  const behavioralTopics: BehavioralTopic[] = [
    {
      title: '리더십 & 팀워크',
      icon: <Group />,
      questions: [
        {
          en: "Tell me about a time when you had to lead a challenging project.",
          kr: "어려운 프로젝트를 이끌어야 했던 경험에 대해 말씀해주세요.",
          example: `"In my previous role at [Company], I led a team of 5 developers to migrate our legacy system to a microservices architecture. 

Situation: Our monolithic system was becoming difficult to maintain and scale.
Task: I was assigned to lead the migration project while ensuring zero downtime.
Action:
- Created a detailed migration plan with clear milestones
- Implemented automated testing to ensure stability
- Conducted daily stand-ups to address concerns
- Set up monitoring and rollback procedures
Result: Successfully completed the migration with zero downtime, improved system performance by 40%, and reduced deployment time from hours to minutes."`,
          tips: [
            'STAR 방식으로 구체적 사례 준비',
            '정량적 결과 포함 (팀 규모, 성과 수치)',
            '직면한 도전과 해결 방법 강조',
            '배운 점 명확히 설명'
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
          subtitle: 'String Manipulation',
          examples: [
            {
              title: "Reverse Words in a String",
              problem: `Given a string s, reverse the order of words.
Example:
Input: "the sky is blue"
Output: "blue is sky the"`,
              solution: `
function reverseWords(s: string): string {
  return s.trim().split(/\\s+/).reverse().join(' ');
}`,
              explanation: "1. 문자열을 공백으로 분리\n2. 단어 순서 뒤집기\n3. 다시 공백으로 연결",
              tips: [
                '입력 문자열 전처리 (trim)',
                '정규식으로 연속된 공백 처리',
                '빈 문자열 처리',
                '시간 복잡도 O(n)'
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
        {/* 인성 면접 섹션 */}
        <Box id="behavioral">
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

        {/* 코딩 테스트 섹션 */}
        <Box id="coding-test">
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
              면접 준비는 단순 암기가 아닌 깊이 있는 이해와 실제 경험을 바탕으로 해야 합니다.
              제시된 내용을 참고하되, 자신만의 경험과 생각을 정리하여 준비하세요.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </PageLayout>
  );
}
