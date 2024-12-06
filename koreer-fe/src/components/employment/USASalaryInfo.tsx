import React from 'react';
import { PageLayout } from '../shared/PageLayout';
import { StatCard } from '../shared/cards/StatCard';
import { InfoCard } from '../shared/cards/InfoCard';
import { ComparisonChart, SalaryTrendChart } from '../shared/charts/ComparisonChart';
import { usaSalaryData, usaCityInfo, lifeInfoUSA } from '../../data/employmentData';
import { NavigationLink } from '../../types/employment';
import { motion } from 'framer-motion';
import style from '../../assets/scss/sub/salaryInfo.module.scss';

export function USASalaryInfo() {
    const navigationLinks: NavigationLink[] = [
        { path: '/visa-info/usa', label: '비자 정보' },
        { path: '/salary-info/usa', label: '연봉 정보' },
        { path: '/interview-guide', label: '면접 가이드' },
        { path: '/employment-info', label: '채용 정보' }
    ];

    const salaryTrendData = [
        { year: '2020', salary: 120000 },
        { year: '2021', salary: 135000 },
        { year: '2022', salary: 155000 },
        { year: '2023', salary: 180000 },
        { year: '2024', salary: 200000 }
    ];

    const cityComparisonData = usaCityInfo.map(city => ({
        label: city.city,
        value: city.costs[0].split(': ')[1],
        percentage: parseInt(city.costs[0].split('$')[1].split('/')[0].replace(',', '')),
        color: city.city === 'San Francisco' ? '#0072b3' : 
               city.city === 'New York' ? '#f5ba13' : '#4CAF50'
    }));

    return (
        <PageLayout
            title="미국 연봉 정보 및 생활 가이드"
            description="실리콘밸리 및 주요 도시 연봉 정보와 현지 생활 비용 안내"
            navigationLinks={navigationLinks}
        >
            <div className={style.salaryOverview}>
                <motion.div 
                    className={style.trendSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <SalaryTrendChart 
                        data={salaryTrendData}
                        className={style.trendChart}
                    />
                </motion.div>

                <motion.div 
                    className={style.comparisonSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <ComparisonChart
                        title="주요 도시별 월세 비교"
                        data={cityComparisonData}
                        className={style.comparisonChart}
                    />
                </motion.div>
            </div>

            <motion.section 
                className={style.salarySection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <h2>직무별 연봉 정보</h2>
                <div className={style.salaryGrid}>
                    {usaSalaryData.map((data, index) => (
                        <StatCard
                            key={index}
                            title={data.position}
                            mainStat={{
                                label: "Total Compensation",
                                value: data.totalComp
                            }}
                            subStats={[
                                { label: "Base Salary", value: data.base },
                                { label: "Bonus", value: data.bonus },
                                { label: "Equity", value: data.equity || "N/A" }
                            ]}
                            details={[
                                {
                                    label: "Level",
                                    items: [data.level]
                                }
                            ]}
                            tags={data.companies}
                            variant={index === 2 ? 'highlight' : 'primary'}
                        />
                    ))}
                </div>
            </motion.section>

            <motion.section 
                className={style.cityComparison}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <h3>주요 도시별 생활비 비교</h3>
                <div className={style.comparisonGrid}>
                    {usaCityInfo.map((city, index) => (
                        <motion.div 
                            key={index}
                            className={style.cityCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <h4>{city.city}</h4>
                            <ul className={style.costList}>
                                {city.costs.map((cost, idx) => {
                                    const [item, value] = cost.split(': ');
                                    return (
                                        <li key={idx}>
                                            <span>{item}</span>
                                            <span>{value}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className={style.highlights}>
                                {city.highlights.map((highlight, idx) => (
                                    <span key={idx} className={style.highlight}>
                                        {highlight}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <h2>생활 정보</h2>
                <div className={style.infoGrid}>
                    {lifeInfoUSA.map((info, index) => (
                        <InfoCard
                            key={index}
                            title={info.title}
                            description={info.description}
                            icon={info.category === "세금" ? "💰" : 
                                  info.category === "복리후생" ? "🎁" : "🏠"}
                        >
                            <ul className={style.detailsList}>
                                {info.details.map((detail, idx) => (
                                    <li key={idx}>{detail}</li>
                                ))}
                            </ul>
                        </InfoCard>
                    ))}
                </div>
            </motion.section>

            <motion.section 
                className={style.additionalInfo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <InfoCard
                    title="알아두면 좋은 정보"
                    variant="highlight"
                >
                    <ul>
                        <li>연봉 협상 시 Total Compensation(TC)을 기준으로 비교하세요.</li>
                        <li>Equity(주식) 보상은 회사마다 부여 방식과 조건이 다릅니다.</li>
                        <li>도시별로 생활비 차이가 크므로, Cost of Living 계산기를 활용하세요.</li>
                        <li>세금은 거주 지역과 소득에 따라 큰 차이가 있습니다.</li>
                    </ul>
                </InfoCard>
            </motion.section>
        </PageLayout>
    );
}
