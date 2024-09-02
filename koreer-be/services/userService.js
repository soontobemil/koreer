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

module.exports = {
  createUser,
  getUserByEmail,
  userDuplCheck
};
