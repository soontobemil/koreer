import React from 'react';
import style from '../../assets/scss/sub/employmentInfo.module.scss';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface SalaryData {
    position: string;
    level: string;
    totalComp: string;
    base: string;
    bonus: string;
    benefits: string[];
    companies: string[];
}

interface CityInfo {
    city: string;
    costs: string[];
    highlights: string[];
}

export function CanadaSalaryInfo() {
    const location = useLocation();

    const navigationLinks = [
        { path: '/visa-info/canada', label: '비자 정보' },
        { path: '/salary-info/canada', label: '연봉 정보' },
        { path: '/interview-guide', label: '면접 가이드' },
        { path: '/employment-info', label: '채용 정보' }
    ];

    const salaryData: SalaryData[] = [
        {
            position: "Software Engineer",
            level: "Entry Level (0-2 years)",
            totalComp: "CAD 75,000 - 95,000",
            base: "CAD 70,000 - 85,000",
            bonus: "CAD 5,000 - 10,000",
            benefits: [
                "의료보험 (MSP)",
                "치과보험",
                "연금",
                "휴가 3주"
            ],
            companies: ["Shopify", "Amazon", "Microsoft", "SAP"]
        },
        {
            position: "Software Engineer",
            level: "Mid Level (3-5 years)",
            totalComp: "CAD 100,000 - 140,000",
            base: "CAD 90,000 - 120,000",
            bonus: "CAD 10,000 - 20,000",
            benefits: [
                "의료보험 (MSP)",
                "치과보험",
                "연금",
                "휴가 4주",
                "재택근무 옵션"
            ],
            companies: ["Shopify", "Amazon", "Microsoft", "Hootsuite"]
        },
        {
            position: "Software Engineer",
            level: "Senior Level (6+ years)",
            totalComp: "CAD 150,000 - 200,000+",
            base: "CAD 130,000 - 170,000",
            bonus: "CAD 20,000 - 30,000",
            benefits: [
                "의료보험 (MSP)",
                "치과보험",
                "연금",
                "휴가 5주",
                "주식 옵션"
            ],
            companies: ["Amazon", "Microsoft", "Shopify", "Google"]
        }
    ];

    const cityInfo: CityInfo[] = [
        {
            city: "밴쿠버",
            costs: [
                "1베드룸 아파트: CAD 2,000-2,800/월",
                "교통비: CAD 100-150/월",
                "식비: CAD 400-600/월",
                "통신비: CAD 60-100/월"
            ],
            highlights: [
                "아름다운 자연환경",
                "온화한 기후",
                "높은 삶의 질",
                "다문화 도시"
            ]
        },
        {
            city: "토론토",
            costs: [
                "1베드룸 아파트: CAD 2,200-3,000/월",
                "교통비: CAD 150-200/월",
                "식비: CAD 400-600/월",
                "통신비: CAD 60-100/월"
            ],
            highlights: [
                "캐나다 최대 도시",
                "다양한 취업 기회",
                "문화 중심지",
                "금융 산업 중심"
            ]
        },
        {
            city: "몬트리올",
            costs: [
                "1베드룸 아파트: CAD 1,500-2,200/월",
                "교통비: CAD 90-120/월",
                "식비: CAD 350-550/월",
                "통신비: CAD 60-100/월"
            ],
            highlights: [
                "저렴한 생활비",
                "유럽풍 문화",
                "예술과 음악의 도시",
                "이중언어(영어/프랑스어) 환경"
            ]
        }
    ];

    return (
        <div className={style.salaryInfoContainer}>
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
                <h1>캐나다 연봉 정보 및 도시별 가이드</h1>
                <p>주요 도시 연봉 정보와 현지 생활 비용 안내</p>
            </motion.div>

            <motion.section 
                className={style.salarySection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h2>직무별 연봉 정보</h2>
                <div className={style.salaryGrid}>
                    {salaryData.map((data: SalaryData, index: number) => (
                        <motion.div 
                            key={index}
                            className={style.salaryCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={style.salaryHeader}>
                                <h3>{data.position}</h3>
                                <span className={style.level}>{data.level}</span>
                            </div>
                            <div className={style.salaryDetails}>
                                <div className={style.totalComp}>
                                    <span className={style.label}>Total Compensation</span>
                                    <strong className={style.value}>{data.totalComp}</strong>
                                </div>
                                <div className={style.statsGrid}>
                                    <div className={style.stat}>
                                        <span className={style.label}>Base Salary</span>
                                        <span className={style.value}>{data.base}</span>
                                    </div>
                                    <div className={style.stat}>
                                        <span className={style.label}>Bonus</span>
                                        <span className={style.value}>{data.bonus}</span>
                                    </div>
                                </div>
                                <div className={style.benefits}>
                                    <span className={style.label}>Benefits</span>
                                    <ul>
                                        {data.benefits.map((benefit: string, idx: number) => (
                                            <li key={idx}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={style.companies}>
                                    <span className={style.label}>주요 기업</span>
                                    <div className={style.companyList}>
                                        {data.companies.map((company: string, idx: number) => (
                                            <span key={idx} className={style.companyTag}>
                                                {company}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section 
                className={style.citySection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <h2>주요 도시별 정보</h2>
                <div className={style.cityGrid}>
                    {cityInfo.map((city: CityInfo, index: number) => (
                        <motion.div 
                            key={index}
                            className={style.cityCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                        >
                            <h3>{city.city}</h3>
                            <div className={style.costsSection}>
                                <h4>생활비</h4>
                                <ul>
                                    {city.costs.map((cost: string, idx: number) => (
                                        <li key={idx}>{cost}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={style.highlightsSection}>
                                <h4>특징</h4>
                                <ul>
                                    {city.highlights.map((highlight: string, idx: number) => (
                                        <li key={idx}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section 
                className={style.additionalInfo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <h2>알아두면 좋은 정보</h2>
                <ul>
                    <li>캐나다는 주마다 최저임금이 다르며, 정기적으로 인상됩니다.</li>
                    <li>대부분의 회사가 의료보험(MSP)을 제공하며, 가족도 혜택을 받을 수 있습니다.</li>
                    <li>연금은 CPP(Canada Pension Plan)와 회사 연금으로 구성됩니다.</li>
                    <li>세금은 연방세와 주세로 구분되며, 주마다 세율이 다릅니다.</li>
                </ul>
            </motion.section>
        </div>
    );
}
