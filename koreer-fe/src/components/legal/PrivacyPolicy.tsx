import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { ComponentHelmet } from "../../features/common/ComponentHelmet";
import styles from './Legal.module.scss';

export const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxWidth="lg" className={styles.legalContainer}>
      <Paper elevation={0} className={styles.legalPaper}>
        <Typography variant="h4" gutterBottom className={styles.title}>
          개인정보처리방침
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          시행일자: 2024년 1월 1일
        </Typography>

        <Box className={styles.section}>
          <Typography variant="h6" gutterBottom>
            제1조 (개인정보의 처리 목적)
          </Typography>
          <Typography paragraph>
            Koreer(이하 '회사')는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </Typography>
          <Typography component="div">
            1. 회원 가입 및 관리<br />
            - 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 만14세 미만 아동의 개인정보 처리 시 법정대리인의 동의여부 확인, 각종 고지·통지, 고충처리 목적으로 개인정보를 처리합니다.<br /><br />
            2. 서비스 제공<br />
            - 해외 취업 정보 제공, 취업 컨설팅, 이력서 작성 지원, 구직 활동 지원 등의 서비스 제공을 목적으로 개인정보를 처리합니다.
          </Typography>
        </Box>

        <Box className={styles.section}>
          <Typography variant="h6" gutterBottom>
            제2조 (개인정보의 처리 및 보유기간)
          </Typography>
          <Typography paragraph>
            1. 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.<br /><br />
            2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:<br />
            - 회원 가입 및 관리: 회원 탈퇴 시까지<br />
            - 재화 또는 서비스 제공: 서비스 공급완료 및 요금결제·정산 완료시까지
          </Typography>
        </Box>

        <Box className={styles.section}>
          <Typography variant="h6" gutterBottom>
            제3조 (개인정보의 제3자 제공)
          </Typography>
          <Typography paragraph>
            1. 회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.<br /><br />
            2. 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다:<br />
            - 제공받는 자: [제공받는 자의 법인명 또는 명칭]<br />
            - 제공목적: 채용 지원 시 해당 기업에 지원자 정보 제공<br />
            - 제공항목: 성명, 학력, 경력, 자격증, 이력서, 자기소개서<br />
            - 보유기간: 지원자의 개별 동의 기간까지
          </Typography>
        </Box>

        <Box className={styles.section}>
          <Typography variant="h6" gutterBottom>
            제4조 (정보주체의 권리·의무 및 행사방법)
          </Typography>
          <Typography paragraph>
            정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:<br />
            1. 개인정보 열람요구<br />
            2. 오류 등이 있을 경우 정정 요구<br />
            3. 삭제요구<br />
            4. 처리정지 요구
          </Typography>
        </Box>

        <Box className={styles.section}>
          <Typography variant="h6" gutterBottom>
            제5조 (처리하는 개인정보 항목)
          </Typography>
          <Typography paragraph>
            회사는 다음의 개인정보 항목을 처리하고 있습니다:<br /><br />
            1. 필수항목<br />
            - 이메일 주소, 비밀번호, 이름<br /><br />
            2. 선택항목<br />
            - 전화번호, 주소, 학력정보, 경력정보, 자격증 정보
          </Typography>
        </Box>

        <Box className={styles.section}>
          <Typography variant="h6" gutterBottom>
            제6조 (개인정보의 파기)
          </Typography>
          <Typography paragraph>
            1. 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.<br /><br />
            2. 파기절차<br />
            - 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.<br /><br />
            3. 파기방법<br />
            - 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.<br />
            - 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
          </Typography>
        </Box>

        <Box className={styles.section}>
          <Typography variant="h6" gutterBottom>
            제7조 (개인정보의 안전성 확보조치)
          </Typography>
          <Typography paragraph>
            회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:<br />
            1. 관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등<br />
            2. 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치<br />
            3. 물리적 조치: 전산실, 자료보관실 등의 접근통제
          </Typography>
        </Box>

        <Box className={styles.section}>
          <Typography variant="h6" gutterBottom>
            제8조 (개인정보 보호책임자)
          </Typography>
          <Typography paragraph>
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다:<br /><br />
            ▶ 개인정보 보호책임자<br />
            - 성명: [성명]<br />
            - 직책: [직책]<br />
            - 연락처: [전화번호], [이메일]
          </Typography>
        </Box>

        <Box className={styles.section}>
          <Typography variant="h6" gutterBottom>
            제9조 (개인정보 처리방침 변경)
          </Typography>
          <Typography paragraph>
            이 개인정보 처리방침은 2024년 1월 1일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </Typography>
        </Box>
      </Paper>
      <ComponentHelmet title={"Koreer - 개인정보처리방침"} />
    </Container>
  );
};

export default PrivacyPolicy; 