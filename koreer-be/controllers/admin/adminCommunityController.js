// Get request data from routes
const AdminCommunityService = require('../../services/admin/AdminCommunityService');
const jwt = require("jsonwebtoken");

async function getPostById(req, res) {
  try {
    const post = await AdminCommunityService.getPostById(req.params.id,req.user.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: '존재하지 않는 게시글입니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '게시글을 찾는 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function getPosts(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query; // 쿼리 파라미터에서 page와 limit 가져오기

    const posts = await AdminCommunityService.getPosts(Number(page), Number(limit), req);

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error in getPostsHandler:', error);
    res.status(500).json({ message: 'Error fetching posts' });
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
    const post = await AdminCommunityService.updatePost(id,data);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error updating post:', error); // error log
    res.status(400).json({ message: '게시글 수정 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function deletePost(req, res) {
  try {
    // start data processing logic
    const id = req.params.postId;
    const post = await AdminCommunityService.deletePost(id);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error deleting post:', error); // error log
    res.status(400).json({ message: '게시글 삭제 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function deleteComment(req, res) {
  try {
    // start data processing logic
    const id = req.params.id;
    const comment = await AdminCommunityService.deleteComment(id);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error deleting comment:', error); // error log
    res.status(400).json({ message: '댓글 삭제 중 에러가 발생하였습니다. ' + error.message });
  }
}

module.exports = {
  getPostById,
  getPosts,
  updatePost,
  deletePost,
  deleteComment
};
