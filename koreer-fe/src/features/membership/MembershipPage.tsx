import React from 'react';
import { motion } from 'framer-motion';
import styles from './membership.module.scss';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: '기본 멤버십',
    price: '무료',
    period: '평생',
    features: [
      '기본 채용 정보 열람',
      '커뮤니티 접근',
      '기본 비자 정보',
      '기업 정보 열람 (제한적)',
    ],
  },
  {
    name: '프리미엄 멤버십',
    price: '₩29,900',
    period: '월',
    features: [
      '모든 채용 정보 열람',
      'VIP 커뮤니티 접근',
      '상세 비자 가이드',
      '전체 기업 정보 열람',
      '1:1 커리어 상담',
      '이력서 첨삭',
      '합격자 인터뷰 자료',
    ],
    isPopular: true,
  },
  {
    name: '기업 멤버십',
    price: '문의',
    period: '연간',
    features: [
      '인재 풀 접근',
      '기업 페이지 관리',
      '채용 공고 무제한',
      '지원자 관리 시스템',
      '채용 분석 리포트',
      '기업 브랜딩 지원',
    ],
  },
];

export const MembershipPage: React.FC = () => {
  return (
    <div className={styles.membershipContainer}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <h1>Koreer 멤버십</h1>
        <p>해외 취업의 시작, Koreer와 함께하세요</p>
      </motion.div>

      <div className={styles.plansContainer}>
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className={`${styles.planCard} ${plan.isPopular ? styles.popular : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {plan.isPopular && (
              <div className={styles.popularBadge}>인기</div>
            )}
            <h2>{plan.name}</h2>
            <div className={styles.pricing}>
              <span className={styles.price}>{plan.price}</span>
              <span className={styles.period}>/ {plan.period}</span>
            </div>
            <ul className={styles.features}>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button 
              className={`${styles.subscribeButton} ${plan.isPopular ? styles.popularButton : ''}`}
            >
              {plan.price === '문의' ? '문의하기' : '시작하기'}
            </button>
          </motion.div>
        ))}
      </div>

      <div className={styles.benefits}>
        <h2>멤버십 혜택</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <h3>맞춤형 채용 정보</h3>
            <p>AI가 분석한 맞춤형 채용 정보를 받아보세요</p>
          </div>
          <div className={styles.benefitCard}>
            <h3>전문가 상담</h3>
            <p>경험 많은 전문가와 1:1 상담을 진행하세요</p>
          </div>
          <div className={styles.benefitCard}>
            <h3>비자 가이드</h3>
            <p>국가별 비자 발급 프로세스를 상세히 안내해드립니다</p>
          </div>
          <div className={styles.benefitCard}>
            <h3>커뮤니티</h3>
            <p>이미 해외에서 일하고 있는 선배들과 소통하세요</p>
          </div>
        </div>
      </div>

      <div className={styles.faq}>
        <h2>자주 묻는 질문</h2>
        {/* FAQ 섹션은 별도 컴포넌트로 분리 예정 */}
      </div>
    </div>
  );
};

export default MembershipPage; 