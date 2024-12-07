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

export function CanadaVisaInfo() {
    const visaTypes: VisaType[] = [
        {
            name: 'LMIA 기반 취업 비자',
            description: 'Labour Market Impact Assessment를 통해 캐나다 내 적합한 인력이 없음을 증명하고 발급되는 취업 비자입니다.',
            requirements: [
                '고용주의 LMIA 승인',
                '유효한 취업 제안',
                '필요한 자격요건 충족 (학력, 경력 등)',
                '충분한 정착 자금 증명',
                '건강 검진 통과'
            ],
            duration: '일반적으로 1-3년, 고용 계약에 따라 다름',
            processingTime: '약 2-4개월',
            cost: 'LMIA $1,000 + 취업 비자 신청비 $155'
        },
        {
            name: 'IEC 워킹홀리데이',
            description: '만 18-35세 사이의 젊은 인재들이 캐나다에서 일하며 여행할 수 있는 프로그램입니다.',
            requirements: [
                '만 18-35세 사이',
                '유효한 여권',
                '최소 $2,500의 정착 자금',
                '귀국 항공권 또는 구매 가능한 자금',
                '보험 가입'
            ],
            duration: '최대 1년',
            processingTime: '8-12주',
            cost: '신청비 $150 + 취업 허가비 $100'
        },
        {
            name: 'PGWP (Post-Graduation Work Permit)',
            description: '캐나다 교육기관 졸업 후 받을 수 있는 오픈 워크퍼밋입니다.',
            requirements: [
                'DLI 인증 교육기관 졸업',
                '풀타임 학업 이수',
                '유효한 학생비자로 학업 완료',
                '졸업 후 180일 이내 신청'
            ],
            duration: '프로그램 길이에 따라 최대 3년',
            processingTime: '약 3개월',
            cost: '취업 허가비 $255'
        },
        {
            name: 'Express Entry',
            description: '기술 이민을 위한 빠른 이민 시스템으로, CRS 점수에 따라 영주권 초청을 받을 수 있습니다.',
            requirements: [
                '언어 능력 증명 (IELTS/CELPIP)',
                '학력 인증 (ECA)',
                '직무 경력 증명',
                'NOC 직군 해당',
                'CRS 점수 경쟁력'
            ],
            duration: '영주권 (무기한)',
            processingTime: '6개월 이내',
            cost: '신청비 $1,325 + 추가 비용'
        }
    ];

    const additionalPrograms = [
        {
            title: 'Global Talent Stream',
            description: '기술 분야 전문가를 위한 빠른 취업 비자 프로그램으로, 2주 이내 처리가 가능합니다.',
            benefits: [
                '빠른 비자 처리',
                'LMIA 면제 가능',
                '배우자 오픈 워크퍼밋',
                '자녀 학업 비자'
            ]
        },
        {
            title: 'Provincial Nominee Program (PNP)',
            description: '각 주별로 운영되는 이민 프로그램으로, 해당 주의 노동시장 수요에 따라 선발됩니다.',
            benefits: [
                '주별 맞춤형 이민 기회',
                'Express Entry 가산점',
                '지역 특화 일자리 연계',
                '정착 지원 서비스'
            ]
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
                <h1>캐나다 취업 비자 정보</h1>
                <p>캐나다 취업을 위한 다양한 비자 옵션과 이민 프로그램을 알아보세요</p>
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
                className={style.additionalPrograms}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <h2>추가 프로그램</h2>
                <div className={style.programsGrid}>
                    {additionalPrograms.map((program, index) => (
                        <motion.div 
                            key={program.title}
                            className={style.programCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                        >
                            <h3>{program.title}</h3>
                            <p>{program.description}</p>
                            <div className={style.benefits}>
                                <h4>주요 혜택</h4>
                                <ul>
                                    {program.benefits.map((benefit, idx) => (
                                        <li key={idx}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div 
                className={style.additionalInfo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
            >
                <h2>알아두면 좋은 정보</h2>
                <ul>
                    <li>대부분의 취업 비자는 배우자 오픈 워크퍼밋과 자녀 학업비자가 함께 발급됩니다.</li>
                    <li>취업 비자로 일정 기간 근무 후 영주권 신청이 가능합니다.</li>
                    <li>언어 능력 증명은 대부분의 비자/이민 프로그램에서 필수입니다.</li>
                    <li>의료보험(Provincial Health Care) 가입이 가능합니다.</li>
                </ul>
            </motion.div>
        </div>
    );
}
