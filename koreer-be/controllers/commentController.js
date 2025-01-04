// Get request data from routes
const CommentService = require('../services/CommentService');

async function createComment(req, res) {
  try {
    // start data processing logic
    const post = await CommentService.createComment(req);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error); // error log
    res.status(400).json({ message: '게시글 등록 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function getCommentById(req, res) {
  try {
    const comment = await CommentService.getCommentById(req.params.id);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: '존재하지 않는 댓글입니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '댓글을 찾는 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function getComments(req, res) {
  try {
    if(!req.user) {
      req.user = {user_email:"iyeahs71@gmail.com"};
    }

    const currentUserEmail = req.user.user_email; // 현재 로그인한 유저의 이메일 (예: 미들웨어에서 추가된 사용자 정보)

    const comments = await CommentService.getComments(currentUserEmail,req.params.postId);

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error in getComments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
}

async function updateComment(req, res) {
  try {
    // start data processing logic
    const data = req.body;
    const id = req.params.id;
    if(!id) {
      throw new Error('댓글 아이디가 존재하지 않습니다.');
    }
    const comment = await CommentService.updateComment(id,data);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error updating comment:', error); // error log
    res.status(400).json({ message: '댓글 수정 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function deleteComment(req, res) {
  try {
    // start data processing logic
    const id = req.params.id;
    const comment = await CommentService.deleteComment(id);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error deleting comment:', error); // error log
    res.status(400).json({ message: '댓글 삭제 중 에러가 발생하였습니다. ' + error.message });
  }
}

module.exports = {
  createComment,
  getCommentById,
  getComments,
  updateComment,
  deleteComment
};
