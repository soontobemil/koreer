// Get request data from routes
const postService = require('../services/postService');

async function createPost(req, res) {
  try {
    // start data processing logic
    const data = req.body;
    const post = await postService.createPost(data);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error); // error log
    res.status(400).json({ message: '게시글 등록 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function getPostById(req, res) {
  try {
    const post = await postService.getPostById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: '존재하지 않는 게시글입니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '게시글을 찾는 중 에러가 발생하였습니다. ' + error.message });
  }
}

module.exports = {
  createPost,
  getPostById
};
