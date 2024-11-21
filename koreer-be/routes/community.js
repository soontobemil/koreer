const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

/* GET community listing. */
router.post('/post', postController.createPost);
router.get('/post/:id', postController.getPostById);
router.post('/post/:id/modify', postController.updatePost);
router.post('/post/:id/delete', postController.deletePost);

module.exports = router;