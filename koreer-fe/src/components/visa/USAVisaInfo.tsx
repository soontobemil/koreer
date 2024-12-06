import React from 'react';
import style from '../../assets/scss/sub/visaInfo.module.scss';
import { motion } from 'framer-motion';

interface VisaType {
    name: string;
    description: string;
    requirements: string[];
    duration: string;
    processingTime: string;
    cost: string;
}

export function USAVisaInfo() {
    const visaTypes: VisaType[] = [
        {
            name: 'H-1B 비자',
            description: '전문직 취업 비자로, 학사 학위 이상 또는 동등한 경력이 필요한 직종에 적용됩니다.',
            requirements: [
                '관련 분야 학사 학위 이상 또는 동등한 경력',
                '고용주의 스폰서십',
                'LCA (Labor Condition Application) 승인',
                '전문직종에 해당하는 포지션',
            ],
            duration: '최초 3년, 최대 6년까지 연장 가능',
            processingTime: '일반 처리 2-6개월, 프리미엄 처리 15일',
            cost: '$460 (기본 신청비) + 추가 비용'
        },
        {
            name: 'L-1 비자',
            description: '기업 내 전근자 비자로, 해외 지사/자회사에서 미국 법인으로 전근하는 경우에 해당됩니다.',
            requirements: [
                '해외 법인에서 1년 이상 근무',
                '관리자급 또는 전문지식 보유자',
                '미국 법인과의 관계 증명',
                '실제 사업 운영 증명'
            ],
            duration: '최초 3년, L-1A는 최대 7년, L-1B는 최대 5년까지 연장 가능',
            processingTime: '일반 처리 3-4개월, 프리미엄 처리 15일',
            cost: '$460 (기본 신청비) + 추가 비용'
        },
        {
            name: 'E-3 비자',
            description: '호주 국적자를 위한 전문직 취업 비자입니다.',
            requirements: [
                '호주 시민권자',
                '학사 학위 이상 또는 동등한 경력',
                '전문직종 취업 오퍼',
                'LCA 승인'
            ],
            duration: '2년, 무제한 갱신 가능',
            processingTime: '2-4주',
            cost: '$205 (비자 신청비)'
        }
    ];

    return (
        <div className={style.visaInfoContainer}>
            <motion.div 
                className={style.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>미국 취업 비자 정보</h1>
                <p>미국 취업을 위한 주요 비자 종류와 요구사항을 알아보세요</p>
            </motion.div>

            <div className={style.visaTypesContainer}>
                {visaTypes.map((visa, index) => (
                    <motion.div 
                        key={visa.name}
                        className={style.visaCard}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <h2>{visa.name}</h2>
                        <p className={style.description}>{visa.description}</p>
                        
                        <div className={style.infoSection}>
                            <h3>주요 요구사항</h3>
                            <ul>
                                {visa.requirements.map((req, idx) => (
                                    <li key={idx}>{req}</li>
                                ))}
                            </ul>
                        </div>

                        <div className={style.detailsGrid}>
                            <div className={style.detail}>
                                <span className={style.label}>체류 기간</span>
                                <span className={style.value}>{visa.duration}</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>처리 기간</span>
                                <span className={style.value}>{visa.processingTime}</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>비용</span>
                                <span className={style.value}>{visa.cost}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                className={style.additionalInfo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <h2>추가 정보</h2>
                <ul>
                    <li>비자 신청 전 반드시 고용 계약이 확정되어야 합니다.</li>
                    <li>비자 승인 후 Social Security Number (SSN) 신청이 가능합니다.</li>
                    <li>배우자와 자녀를 위한 부양가족 비자도 신청 가능합니다.</li>
                    <li>일부 비자는 영주권 신청이 가능합니다.</li>
                </ul>
            </motion.div>
        </div>
    );
}
