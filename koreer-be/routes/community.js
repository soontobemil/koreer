const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
var authMiddleware = require('../src/middlewares/authMiddleware');

/* GET community listing. */
// Posts
router.post('/post', authMiddleware, postController.createPost);
router.get('/post/:id', postController.getPostById);
router.post('/post/:id/modify', authMiddleware, postController.updatePost);
router.delete('/post/:id/delete', authMiddleware, postController.deletePost);
// GET /posts?page=1&limit=10
router.get('/posts', postController.getPosts);

// Comments
router.post('/comment', commentController.createComment);
router.get('/comment/:id', commentController.getCommentById);
router.post('/comment/:id/modify', commentController.updateComment);
router.post('/comment/:id/delete', commentController.deleteComment);
router.get('/comments/:postId', commentController.getComments);

module.exports = router;