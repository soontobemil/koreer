import React from 'react';
import style from '../../assets/scss/sub/employmentInfo.module.scss';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface InterviewTopic {
    title: string;
    description: string;
    icon: string;
    examples: string[];
    tips: string[];
}

export function InterviewGuide() {
    const location = useLocation();

    const navigationLinks = [
        { path: '/visa-info/usa', label: '비자 정보' },
        { path: '/salary-info/usa', label: '연봉 정보' },
        { path: '/interview-guide', label: '면접 가이드' },
        { path: '/employment-info', label: '채용 정보' }
    ];

    const technicalTopics: InterviewTopic[] = [
        {
            title: "자료구조와 알고리즘",
            description: "기술적 지식과 문제 해결 능력을 평가하는 면접",
            icon: "💻",
            examples: [
                "시간복잡도와 공간복잡도 분석",
                "배열과 링크드 리스트의 차이",
                "트리와 그래프 순회 방법",
                "해시테이블 충돌 해결 방법"
            ],
            tips: [
                "Big-O 표기법 이해하기",
                "주요 알고리즘 패턴 학습",
                "실제 코드로 구현해보기",
                "최적화 방법 고려하기"
            ]
        },
        {
            title: "시스템 디자인",
            description: "확장 가능한 시스템 설계 능력 평가",
            icon: "🏗️",
            examples: [
                "URL 단축 서비스 설계",
                "채팅 시스템 구현",
                "분산 캐시 시스템",
                "피드 시스템 설계"
            ],
            tips: [
                "요구사항 명확히 하기",
                "확장성 고려하기",
                "데이터 모델 설계",
                "트레이드오프 설명하기"
            ]
        },
        {
            title: "프로그래밍 언어",
            description: "언어 특성과 심화 개념 이해도 평가",
            icon: "🔧",
            examples: [
                "메모리 관리 방식",
                "동시성 처리 방법",
                "객체지향 프로그래밍",
                "함수형 프로그래밍"
            ],
            tips: [
                "언어별 특징 비교하기",
                "실제 사용 경험 준비",
                "최신 버전 특징 학습",
                "성능 최적화 방법"
            ]
        }
    ];

    const behavioralTopics: InterviewTopic[] = [
        {
            title: "팀워크와 협업",
            description: "팀 내 역할과 기여도 평가",
            icon: "🤝",
            examples: [
                "팀 프로젝트 경험",
                "갈등 해결 사례",
                "리더십 경험",
                "의사소통 방식"
            ],
            tips: [
                "STAR 방법론 활용",
                "구체적 사례 준비",
                "긍정적 결과 강조",
                "배운 점 설명하기"
            ]
        },
        {
            title: "문제 해결 능력",
            description: "도전적 상황 대처 능력 평가",
            icon: "🎯",
            examples: [
                "기술적 문제 해결",
                "프로젝트 위기 관리",
                "고객 요구사항 충족",
                "데드라인 준수"
            ],
            tips: [
                "체계적 접근 방법",
                "결과 중심 답변",
                "개선점 도출하기",
                "교훈 공유하기"
            ]
        }
    ];

    return (
        <div className={style.interviewGuideContainer}>
            <nav className={style.pageNavigation}>
                <ul>
                    {navigationLinks.map((link) => (
                        <li key={link.path}>
                            <Link 
                                to={link.path}
                                className={location.pathname === link.path ? style.active : ''}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <motion.div 
                className={style.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>면접 준비 가이드</h1>
                <p>기술 면접부터 인성 면접까지, 성공적인 면접을 위한 완벽 가이드</p>
            </motion.div>

            <motion.section 
                className={style.technicalSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h2>기술 면접 가이드</h2>
                <div className={style.topicGrid}>
                    {technicalTopics.map((topic, index) => (
                        <motion.div 
                            key={index}
                            className={style.topicCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={style.topicHeader}>
                                <span className={style.topicIcon}>{topic.icon}</span>
                                <h3>{topic.title}</h3>
                            </div>
                            <p>{topic.description}</p>
                            
                            <div className={style.examplesSection}>
                                <h4>주요 예시</h4>
                                <ul>
                                    {topic.examples.map((example, idx) => (
                                        <li key={idx}>{example}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={style.tipsSection}>
                                <h4>면접 팁</h4>
                                <ul>
                                    {topic.tips.map((tip, idx) => (
                                        <li key={idx}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section 
                className={style.behavioralSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <h2>인성 면접 가이드</h2>
                <div className={style.topicGrid}>
                    {behavioralTopics.map((topic, index) => (
                        <motion.div 
                            key={index}
                            className={style.topicCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                        >
                            <div className={style.topicHeader}>
                                <span className={style.topicIcon}>{topic.icon}</span>
                                <h3>{topic.title}</h3>
                            </div>
                            <p>{topic.description}</p>
                            
                            <div className={style.examplesSection}>
                                <h4>주요 예시</h4>
                                <ul>
                                    {topic.examples.map((example, idx) => (
                                        <li key={idx}>{example}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={style.tipsSection}>
                                <h4>면접 팁</h4>
                                <ul>
                                    {topic.tips.map((tip, idx) => (
                                        <li key={idx}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section 
                className={style.additionalResources}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <h2>추천 학습 자료</h2>
                <div className={style.resourcesGrid}>
                    <div className={style.resourceCard}>
                        <h3>온라인 학습 플랫폼</h3>
                        <ul>
                            <li>LeetCode - 알고리즘 문제 풀이</li>
                            <li>System Design Primer - 시스템 설계</li>
                            <li>Pramp - 실전 면접 연습</li>
                        </ul>
                    </div>
                    <div className={style.resourceCard}>
                        <h3>추천 도서</h3>
                        <ul>
                            <li>Cracking the Coding Interview</li>
                            <li>Clean Code</li>
                            <li>Designing Data-Intensive Applications</li>
                        </ul>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
