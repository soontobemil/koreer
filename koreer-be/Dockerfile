# Node.js를 기반으로 한 Docker 이미지 빌드
FROM node:18

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 파일을 복사하고 설치
# COPY package*.json ./
# RUN npm install --production

# 소스 코드 복사
COPY . .

# 앱이 동작할 포트
# EXPOSE 3000

# 앱 실행 명령어
CMD ["npm", "start"]