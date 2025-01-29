const express = require('express');
const router = express.Router();
//const postController = require('../../controllers/admin/postController');
const adminUserController = require('../../controllers/admin/adminUserController');
var adminAuthMiddleware = require('../../src/middlewares/adminAuthMiddleware');

// Users
router.use(adminAuthMiddleware);
router.get('/users', adminUserController.getUsers);
router.get('/users/:id', adminUserController.getUserByCondition);
router.post('/users/:id/modify', adminUserController.updateUser);
//router.delete('/users/:id/delete', postController.deletePost);

// Commnunities
// router.get('/posts', postController.getPosts);
// router.get('/posts/:userId', commentController.getCommentById);
// router.post('/posts/:userId/delete', commentController.deleteComment);
// router.get('/comments', postController.getPosts);
// router.get('/comments/:userId', commentController.getComments);
// router.post('/comments/:postId/delete', commentController.deleteComment);

module.exports = router;