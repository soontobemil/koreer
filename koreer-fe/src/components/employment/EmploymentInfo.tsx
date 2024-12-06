import React from 'react';
import style from '../../assets/scss/sub/employmentInfo.module.scss';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface InfoCard {
    title: string;
    description: string;
    icon: string;
    path: string;
    stats?: {
        label: string;
        value: string;
    }[];
}

export function EmploymentInfo() {
    const navigate = useNavigate();

    const infoCards: InfoCard[] = [
        {
            title: "미국 취업 정보",
            description: "미국 취업에 필요한 비자, 연봉, 기업 정보를 확인하세요",
            icon: "🇺🇸",
            path: "/visa-info/usa",
            stats: [
                { label: "평균 연봉", value: "$120K+" },
                { label: "비자 처리기간", value: "2-3개월" },
                { label: "취업 성공률", value: "85%" }
            ]
        },
        {
            title: "캐나다 취업 정보",
            description: "캐나다 워크퍼밋, 연봉, 기업 정보를 확인하세요",
            icon: "🇨🇦",
            path: "/visa-info/canada",
            stats: [
                { label: "평균 연봉", value: "C$90K+" },
                { label: "비자 처리기간", value: "1-2개월" },
                { label: "취업 성공률", value: "90%" }
            ]
        },
        {
            title: "면접 준비 가이드",
            description: "기술 면접부터 인성 면접까지 완벽 준비",
            icon: "💼",
            path: "/interview-guide",
            stats: [
                { label: "합격률", value: "75%" },
                { label: "준비기간", value: "2-3개월" },
                { label: "만족도", value: "95%" }
            ]
        }
    ];

    const quickLinks = [
        { title: "최신 채용 정보", icon: "📢", path: "/employment-info#latest" },
        { title: "연봉 정보", icon: "💰", path: "/salary-info/usa" },
        { title: "비자 가이드", icon: "📋", path: "/visa-info/usa" },
        { title: "인터뷰 팁", icon: "💡", path: "/interview-guide" }
    ];

    const latestNews = [
        {
            title: "미국 H-1B 비자 신청 시작",
            date: "2024.03",
            tag: "비자"
        },
        {
            title: "캐나다 Express Entry 점수 완화",
            date: "2024.02",
            tag: "이민"
        },
        {
            title: "실리콘밸리 채용 트렌드",
            date: "2024.02",
            tag: "채용"
        }
    ];

    return (
        <div className={style.employmentDashboard}>
            <motion.div 
                className={style.dashboardHeader}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>해외 취업 정보</h1>
                <p>국가별 취업 정보와 준비 가이드를 확인하세요</p>
            </motion.div>

            <div className={style.quickLinksBar}>
                {quickLinks.map((link, index) => (
                    <motion.button
                        key={index}
                        className={style.quickLink}
                        onClick={() => navigate(link.path)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className={style.quickLinkIcon}>{link.icon}</span>
                        {link.title}
                    </motion.button>
                ))}
            </div>

            <div className={style.mainContent}>
                <div className={style.infoCardsSection}>
                    {infoCards.map((card, index) => (
                        <motion.div
                            key={index}
                            className={style.infoCard}
                            onClick={() => navigate(card.path)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className={style.cardHeader}>
                                <span className={style.cardIcon}>{card.icon}</span>
                                <h2>{card.title}</h2>
                            </div>
                            <p>{card.description}</p>
                            {card.stats && (
                                <div className={style.statsGrid}>
                                    {card.stats.map((stat, idx) => (
                                        <div key={idx} className={style.statItem}>
                                            <span className={style.statValue}>{stat.value}</span>
                                            <span className={style.statLabel}>{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className={style.cardAction}>
                                자세히 보기 →
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className={style.sideContent}>
                    <motion.div 
                        className={style.newsSection}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3>최신 소식</h3>
                        <div className={style.newsList}>
                            {latestNews.map((news, index) => (
                                <div key={index} className={style.newsItem}>
                                    <span className={style.newsTag}>{news.tag}</span>
                                    <h4>{news.title}</h4>
                                    <span className={style.newsDate}>{news.date}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        className={style.helpSection}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <h3>도움이 필요하신가요?</h3>
                        <p>1:1 상담을 통해 맞춤형 취업 전략을 제공해드립니다.</p>
                        <button className={style.consultButton}>
                            상담 신청하기
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
