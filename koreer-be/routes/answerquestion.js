const express = require('express');
const router = express.Router();
const answerQuestionController = require('../controllers/answerQuestionController');
var authMiddleware = require('../src/middlewares/authMiddleware');

router.post('/answer', authMiddleware, answerQuestionController.postAnswer);
router.get('/answer/:id', authMiddleware, answerQuestionController.getAnswersByPostId);


module.exports = router;