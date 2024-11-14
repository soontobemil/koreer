// Add Business logics here
const db = require('../models');

async function createPost(postData) {
  try {
    const post = await db.Post.create(postData);
    return post;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating post');
  }
}

async function getPostById(id) {
  try {
    // select post
    const post = await db.Post.findOne({ 
            where: { 
                id: id
            } });
    return post;
  } catch (error) {
    throw new Error('Error fetching post');
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
  createPost,
  getPostById,
  updateEmailVerifyStatus
};
