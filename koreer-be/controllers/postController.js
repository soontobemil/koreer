// Get request data from routes
const PostService = require('../services/PostService');

async function createPost(req, res) {
  try {
    // start data processing logic
    const data = req.body;
    const post = await PostService.createPost(data);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error); // error log
    res.status(400).json({ message: '게시글 등록 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function getPostById(req, res) {
  try {
    const post = await PostService.getPostById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: '존재하지 않는 게시글입니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '게시글을 찾는 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function updatePost(req, res) {
  try {
    // start data processing logic
    const data = req.body;
    const id = req.params.id;
    if(!id) {
      throw new Error('게시글 아이디가 존재하지 않습니다.');
    }
    const post = await PostService.updatePost(id,data);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error updating post:', error); // error log
    res.status(400).json({ message: '게시글 수정 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function deletePost(req, res) {
  try {
    // start data processing logic
    const id = req.params.id;
    const post = await PostService.deletePost(id);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error deleting post:', error); // error log
    res.status(400).json({ message: '게시글 삭제 중 에러가 발생하였습니다. ' + error.message });
  }
}

module.exports = {
  createPost,
  getPostById,
  updatePost,
  deletePost
};
