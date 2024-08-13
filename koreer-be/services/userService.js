// Add Business logics here
const db = require('../models');

async function createUser(userData) {
  try {
    // insert user
    const user = await db.User.create(userData);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating user');
  }
}

async function getUserByEmail(userEmail) {
  try {
    // select user
    const user = await db.User.findOne({ 
            where: { 
                user_email: userEmail,
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
