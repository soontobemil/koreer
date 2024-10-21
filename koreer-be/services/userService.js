// Add Business logics here
const db = require('../models');

async function createUser(userData) {
  try {
    const user = await db.User.create(userData);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating user');
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
