const express = require('express');
const router = express.Router();
//const postController = require('../../controllers/admin/postController');
const adminUserController = require('../../controllers/admin/adminUserController');
const adminCommCodeController = require('../../controllers/admin/adminCommCodeController');
var adminAuthMiddleware = require('../../src/middlewares/adminAuthMiddleware');

// Users
router.use(adminAuthMiddleware);
router.get('/users', adminUserController.getUsers);
router.get('/users/:id', adminUserController.getUserByCondition);
router.post('/users/:id/modify', adminUserController.updateUser);

// Codes
router.get('/codes', adminCommCodeController.getCodes);
router.get('/codes/:groupCode', adminCommCodeController.getCodeByGroupCode);
router.post('/codes', adminCommCodeController.createCode);
router.post('/codes/:id/modify', adminCommCodeController.updateCode);
router.post('/codes/:id/delete', adminCommCodeController.deleteCode);

// Commnunities
// router.get('/posts', postController.getPosts);
// router.get('/posts/:userId', commentController.getCommentById);
// router.post('/posts/:userId/delete', commentController.deleteComment);
// router.get('/comments', postController.getPosts);
// router.get('/comments/:userId', commentController.getComments);
// router.post('/comments/:postId/delete', commentController.deleteComment);

module.exports = router;