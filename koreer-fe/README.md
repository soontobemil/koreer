# Koreer - 해외 취업 정보 플랫폼

## 소개
Koreer는 해외 취업을 희망하는 개발자들을 위한 종합 정보 플랫폼입니다. 비자 정보, 연봉 데이터, 면접 가이드 등 해외 취업에 필요한 모든 정보를 제공합니다.

## 최근 업데이트 (2024-01-17)
### 디자인 시스템 개선
- 통일된 디자인 시스템 구축
  - 중앙화된 변수 관리 (_variables.scss)
  - 일관된 색상 체계 및 타이포그래피
  - 공통 컴포넌트 스타일 표준화
- 반응형 디자인 강화
  - 모바일 최적화
  - 브레이크포인트 표준화
  - 유동적 그리드 시스템
- 다크 모드 지원 개선
  - 자동 다크 모드 감지
  - 접근성 고려한 색상 대비
  - 일관된 다크 모드 스타일링

### 컴포넌트 구조화
- 공통 컴포넌트 분리
  - InfoCard, StatCard 컴포넌트 추가
  - ComparisonChart 컴포넌트 추가
  - PageLayout 컴포넌트 표준화
- 네비게이션 개선
  - 드롭다운 메뉴 인터랙션 개선
  - 모바일 메뉴 사용성 향상
  - 애니메이션 효과 추가

### 성능 최적화
- CSS 모듈화
  - SCSS 모듈 시스템 도입
  - 스타일 충돌 방지
  - 코드 분할 및 구조화
- 애니메이션 최적화
  - Framer Motion 활용
  - 성능 고려한 애니메이션 구현
  - 부드러운 전환 효과

## 시작하기

### 필수 요구사항
- Node.js 18.10.1 이상
- Yarn 또는 npm

### 설치 방법

1. Node.js 설치
```bash
# nvm 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Node.js 18.10.1 설치
nvm install 18.10.1
```

2. 프로젝트 클론 및 설치
```bash
# 프로젝트 클론
git clone https://github.com/your-username/koreer.git
cd koreer/koreer-fe

# 의존성 설치 (Yarn 사용 권장)
yarn install
# 또는 npm install
```

3. 필수 라이브러리 설치
```bash
# UI 라이브러리
yarn add @mui/material @emotion/react @emotion/styled

# 유틸리티
yarn add @types/lodash --dev

# 상태관리 및 API
yarn add axios redux react-redux @reduxjs/toolkit

# 인증
yarn add react-cookie jwt-decode

# 빌드
yarn add @craco/craco

```

4. 개발 서버 실행
```bash
yarn start
# 또는 npm start
```

## 프로젝트 구조
```
src/
├── api/          # API 통신
├── assets/       # 정적 파일
│   ├── img/      # 이미지
│   └── scss/     # 스타일
│       ├── common/   # 공통 스타일
│       ├── shared/   # 공유 컴포넌트 스타일
│       └── sub/      # 서브 페이지 스타일
├── components/   # React 컴포넌트
│   ├── common/   # 공통 컴포넌트
│   ├── shared/   # 공유 컴포넌트
│   └── [feature]/# 기능별 컴포넌트
├── data/         # 정적 데이터
├── slice/        # Redux 슬라이스
├── types/        # TypeScript 타입
└── util/         # 유틸리티
```

## 스타일 가이드
### 컴포넌트 구조
- 기능별 디렉토리 구조
- 재사용 가능한 컴포넌트는 shared 디렉토리에 배치
- 페이지 레이아웃 일관성 유지

### CSS 규칙
- SCSS 모듈 사용으로 스타일 캡슐화
- 변수 중앙화로 일관된 스타일 유지
- 반응형 디자인을 위한 미디어 쿼리 활용
- 다크 모드 지원을 위한 테마 변수 사용

### TypeScript
- 인터페이스와 타입 정의 철저
- Props 타입 명시
- 엄격한 타입 체크 적용

## 라이선스
MIT License

## 연락처
- Email: your-email@example.com
- Website: https://koreer.com
