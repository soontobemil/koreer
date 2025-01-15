// Add Business logics here
const db = require('../models');

async function createUser(userData) {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      // 1. User 생성
      const user = await db.User.create(userData, { transaction: t });

      // 2. UserInfo 생성
      await db.UserInfo.create({
        user_id: user.id,
        employment_status: 'student',    // ENUM: 'employed' 또는 'student'만 가능
        birth_date: '2000-01-01',       // 실제 날짜 형식으로 변경
        location: '미정',               // 의미있는 기본값으로 변경
        desired_country: '미정',        // 의미있는 기본값으로 변경
        introduction: '안녕하세요.',     // 의미있는 기본값으로 변경
        skills: [],                     // JSON 타입
        interests: [],                  // JSON 타입
        years_of_experience: null,      // 선택적 필드
        salary_range: null,             // 선택적 필드
        work_style: null,               // 선택적 필드
        github_url: null,               // 선택적 필드
        portfolio_url: null             // 선택적 필드
      }, { transaction: t });

      return user;
    });

    return result;
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    // select user
    const user = await db.User.findOne({
            where: {
                user_email: email,
                is_active: 'Y'
            } });
    return user;
  } catch (error) {
    throw new Error('Error fetching user');
  }
}

async function userDuplCheck(email) {
  try {
    const duplUser = await getUserByEmail(email);
    if (duplUser) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error('Error Duplicate User');
  }
}

async function updateEmailVerifyStatus(email) {
  try {
    const result = await db.User.update(
      { is_email_verified: 'Y' },
      { where: { user_email: email,is_active: 'Y',is_email_verified: 'N' } } // 복수 조건
    );
  } catch (error) {
    throw new Error('Error while Updating Email Verifying Status');
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  userDuplCheck,
  updateEmailVerifyStatus
};
