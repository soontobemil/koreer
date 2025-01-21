import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import styles from './membership.module.scss';
import {Business, Check, Person, Star, Language, School, Group, TrendingUp, 
  WorkOutline, Rocket, Diamond } from '@mui/icons-material';
import {ComponentHelmet} from "../../features/common/ComponentHelmet";

interface PricingPlan {
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  features: {
    category: string;
    items: (string | { text: string; highlight: boolean })[];
  }[];
  icon: JSX.Element;
  description: string;
  color: string;
  priceDescription?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: '기본 멤버십',
    price: '무료',
    period: '체험판',
    description: '해외 취업의 첫 걸음을 시작하세요',
    icon: <WorkOutline sx={{ fontSize: 40 }} />,
    color: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
    features: [
      {
        category: '채용 정보',
        items: [
          '기본 채용 정보 제공',
          '기업 정보 열람 (제한적)',
          '주간 채용 뉴스레터',
        ]
      },
      {
        category: '커뮤니티',
        items: [
          '기본 커뮤니티 접근',
          '취업 정보 공유',
          '기본 Q&A 참여',
        ]
      },
      {
        category: '기본 도구',
        items: [
          '기본 이력서 템플릿',
          '기본 비자 정보',
          '취업 준비 가이드',
        ]
      }
    ],
  },
  {
    name: '프리미엄 멤버십',
    price: '₩20,000',
    originalPrice: '₩60,000',
    period: '월',
    description: '영어 스터디와 실전 준비로 북미 취업을 준비하세요',
    icon: <Rocket sx={{ fontSize: 40 }} />,
    color: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
    features: [
      {
        category: '스터디 그룹',
        items: [
          { text: '격주 3시간 영어 그룹 스터디', highlight: true },
          '기술/행동 인터뷰 준비',
          '실전 모의 면접과 피드백',
        ]
      },
      {
        category: '세미나 & 커뮤니티',
        items: [
          '세미나 우선 참가권',
          '북미 취업 실무 세미나',
          '커뮤니티 프리미엄 배지',
        ]
      },
      {
        category: '취업 준비 도구',
        items: [
          '직업 준비 체크리스트',
          '인터뷰 예상 질문 자료',
          '이력서 작성 가이드',
        ]
      },
      {
        category: '예정된 기능',
        items: [
          'AI 기반 스터디 매칭',
        ]
      }
    ],
  },
  {
    name: '코리어 멤버십',
    price: 'Enterprise',
    priceDescription: '맞춤형 서비스 상담이 필요한 멤버십입니다',
    period: '',
    description: '맞춤형 서비스로 북미 취업의 꿈을 실현하세요',
    icon: <Diamond sx={{ fontSize: 40 }} />,
    color: 'linear-gradient(135deg, #0d47a1 0%, #072a60 100%)',
    features: [
      {
        category: '맞춤형 취업 지원',
        items: [
          '완전 맞춤형 북미 취업 지원',
          '개별 채용 맞춤 서비스',
          '기업별 인터뷰 패턴 분석',
        ]
      },
      {
        category: '전문가 지원',
        items: [
          { text: '1:1 컨설팅 (월 2회)', highlight: true },
          { text: '북미 현직 전문가와 1:1 세션', highlight: true },
          { text: '실전 모의 면접 (월 1회)', highlight: true },
        ]
      },
      {
        category: '프리미엄 자료',
        items: [
          'VIP 세미나 우선 초청',
          '풀 액세스 커리큘럼',
          '기술/행동 인터뷰 자료',
        ]
      },
      {
        category: '커리어 최적화',
        items: [
          '시스템 디자인 강의',
          'LinkedIn/포트폴리오 최적화',
          '실시간 취업 트렌드 업데이트',
        ]
      },
      {
        category: '예정된 기능',
        items: [
          'AI 기반 맞춤형 채용 추천',
          'AI 채용 트렌드 분석 보고서',
        ]
      }
    ],
  },
];

const commonBenefits = [
  {
    icon: <Language sx={{ fontSize: 32 }} />,
    title: '영어 실력 향상',
    description: '실전 영어 스터디와 모의 면접으로 실력을 키우세요',
  },
  {
    icon: <School sx={{ fontSize: 32 }} />,
    title: '전문가 멘토링',
    description: '현직자들의 실질적인 조언과 피드백을 받으세요',
  },
  {
    icon: <Group sx={{ fontSize: 32 }} />,
    title: '커뮤니티',
    description: '같은 목표를 가진 동료들과 함께 성장하세요',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 32 }} />,
    title: '커리어 성장',
    description: '체계적인 커리큘럼으로 실력을 쌓아가세요',
  },
];

const faqData = [
  {
    question: '멤버십은 언제든지 해지할 수 있나요?',
    answer: '프리미엄 멤버십은 월 단위로 언제든지 해지 가능합니다. 코리어 멤버십은 6개월 약정으로 진행됩니다.',
  },
  {
    question: '영어 스터디는 어떻게 진행되나요?',
    answer: '화상 회의 플랫폼을 통해 격주로 3시간씩 진행되며, 현직자 멘토의 지도 하에 실전 인터뷰 준비를 합니다.',
  },
  {
    question: '1:1 컨설팅은 어떤 방식으로 진행되나요?',
    answer: '코리어 멤버십의 1:1 컨설팅은 화상 미팅으로 진행되며, 경력 개발, 이력서 첨삭, 인터뷰 준비 등 필요한 부분에 대해 맞춤형 조언을 제공합니다.',
  },
  {
    question: 'AI 기반 서비스는 어떤 것들이 있나요?',
    answer: '스터디 매칭, 채용 추천, 트렌드 분석 등이 제공되며, 지속적으로 새로운 AI 기능을 추가할 예정입니다.',
  },
];

const renderFeaturesList = (features: PricingPlan['features']) => {
  return features.map((feature) => (
    <React.Fragment key={feature.category}>
      <li data-category>
        {feature.category}
      </li>
      {feature.items.map((item) => (
        <li 
          key={typeof item === 'string' ? item : item.text} 
          data-parent
          className={typeof item === 'object' && item.highlight ? styles.highlighted : ''}
        >
          {typeof item === 'string' ? item : item.text}
        </li>
      ))}
    </React.Fragment>
  ));
};

export const MembershipPage: React.FC = () => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const planVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className={styles.membershipContainer}>
      <motion.div 
        className={styles.heroSection}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Koreer 멤버십</h1>
        <p>해외 취업의 시작, Koreer와 함께하세요</p>
        <div className={styles.gradientLine} />
      </motion.div>

      <motion.div 
        className={styles.commonBenefits}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2>멤버십 공통 혜택</h2>
        <div className={styles.benefitsGrid}>
          {commonBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className={styles.benefitCard}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                y: -5,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              <motion.div 
                className={styles.benefitIcon}
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {benefit.icon}
              </motion.div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className={styles.plansContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2>멤버십 플랜</h2>
        <div className={styles.plansGrid}>
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={styles.planCard}
              variants={itemVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredPlan(plan.name)}
              onHoverEnd={() => setHoveredPlan(null)}
              style={{
                '--plan-color': plan.color,
                '--plan-rgb': plan.color.match(/\((.*?)\)/)?.[1].split(',').map(Number).join(', '),
              } as React.CSSProperties}
            >
              <div className={styles.planHeader}>
                <motion.div 
                  className={styles.planIcon}
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                    transition: { duration: 0.5 }
                  }}
                >
                  {plan.icon}
                </motion.div>
                <motion.h2
                  animate={hoveredPlan === plan.name ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {plan.name}
                </motion.h2>
              </div>
              <p className={styles.planDescription}>{plan.description}</p>
              <div className={styles.pricing}>
                <div className={styles.priceWrapper}>
                  <motion.span className={styles.price}>
                    {plan.price}
                  </motion.span>
                  {plan.originalPrice && (
                    <span className={styles.originalPrice}>
                      {plan.originalPrice}
                    </span>
                  )}
                  {plan.period && <span className={styles.period}>/ {plan.period}</span>}
                </div>
                {plan.priceDescription && (
                  <span className={styles.priceDescription}>{plan.priceDescription}</span>
                )}
              </div>
              <ul className={styles.features}>
                {renderFeaturesList(plan.features)}
              </ul>
              <motion.button 
                className={styles.subscribeButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (plan.price === 'Enterprise') {
                    window.open('https://docs.google.com/forms/u/0/d/1s8KW2xbS1wNg1ywRMaOBBDo6tMbMjGm-zQSwGyr-1Jc/viewform?edit_requested=true', '_blank');
                  } else {
                    window.open('https://docs.google.com/forms/u/0/d/1s8KW2xbS1wNg1ywRMaOBBDo6tMbMjGm-zQSwGyr-1Jc/viewform?edit_requested=true', '_blank');
                  }
                }}
              >
                {plan.price === 'Enterprise' ? '문의하기' : '시작하기'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className={styles.faq}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2>자주 묻는 질문</h2>
        <div className={styles.faqList}>
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className={`${styles.faqItem} ${selectedFaq === index ? styles.active : ''}`}
              variants={itemVariants}
              onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
            >
              <div className={styles.faqQuestion}>
                <h3>{faq.question}</h3>
                <motion.span
                  animate={{ rotate: selectedFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </div>
              <AnimatePresence>
                {selectedFaq === index && (
                  <motion.div
                    className={styles.faqAnswer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <ComponentHelmet title={"Koreer - 멤버십"} />
    </div>
  );
};

export default MembershipPage; 