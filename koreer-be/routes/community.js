const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

/* GET community listing. */
router.post('/post', postController.createPost);
router.get('/post/:id', postController.getPostById);

module.exports = router;