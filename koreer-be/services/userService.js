// Add Business logics here
const db = require('../models');

async function createUser(userData) {
  try {
    const duplUser = getUserByEmail(userData.user_email);
    if (duplUser) {
      throw new Error('Duplicate User Error');
    }
    // insert user
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

module.exports = {
  createUser,
  getUserByEmail,
};
